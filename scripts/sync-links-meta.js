/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Automated OpenGraph Meta Syncer for Curated Links
 * 
 * Fetches real OpenGraph metadata (og:image, og:title, og:description) for URLs
 * using dual-pass headers (Realistic Browser Headers + Facebook Crawler Fallback).
 * 
 * Usage:
 *   node scripts/sync-links-meta.js
 */

const fs = require("fs");
const path = require("path");
const https = require("https");
const http = require("http");

const DATA_FILE = path.join(__dirname, "../src/lib/linksData.ts");

const BROWSER_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9,id;q=0.8",
  "Sec-Ch-Ua": '"Chromium";v="124", "Google Chrome";v="124"',
  "Sec-Ch-Ua-Mobile": "?0",
  "Sec-Ch-Ua-Platform": '"macOS"',
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "none",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
};

const FB_HEADERS = {
  "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
  Accept: "*/*",
};

function fetchHtml(url, headers = BROWSER_HEADERS, maxRedirects = 4) {
  return new Promise((resolve) => {
    if (maxRedirects < 0) {
      return resolve(null);
    }

    try {
      const client = url.startsWith("https") ? https : http;
      const req = client.get(url, { headers, timeout: 8000 }, (res) => {
        // Handle 3xx Redirects
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          let redirectUrl = res.headers.location;
          if (!redirectUrl.startsWith("http")) {
            try {
              const u = new URL(url);
              redirectUrl = new URL(redirectUrl, u.origin).toString();
            } catch (e) {
              return resolve(null);
            }
          }
          return resolve(fetchHtml(redirectUrl, headers, maxRedirects - 1));
        }

        if (res.statusCode !== 200) {
          return resolve(null);
        }

        let html = "";
        res.on("data", (chunk) => {
          html += chunk.toString();
          // Read up to 250KB of header content
          if (html.length > 250000) {
            res.destroy();
          }
        });

        res.on("end", () => resolve(html));
        res.on("close", () => resolve(html));
      });

      req.on("error", () => resolve(null));
      req.on("timeout", () => {
        req.destroy();
        resolve(null);
      });
    } catch (e) {
      resolve(null);
    }
  });
}

function extractMeta(html, targetUrl) {
  if (!html) return null;

  // Unescape HTML entities in URLs (e.g. &amp; -> &)
  const cleanUrl = (raw) => {
    if (!raw) return null;
    let u = raw.replace(/&amp;/g, "&").replace(/&#038;/g, "&").trim();
    if (u.startsWith("//")) {
      u = "https:" + u;
    } else if (u.startsWith("/")) {
      try {
        const parsed = new URL(targetUrl);
        u = parsed.origin + u;
      } catch (e) {}
    }
    return u;
  };

  const ogImageMatch =
    html.match(/<meta\s+(?:property|name)=["'](?:og:image|twitter:image|twitter:image:src)["']\s+content=["']([^"']+)["']/i) ||
    html.match(/<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["'](?:og:image|twitter:image|twitter:image:src)["']/i);

  const ogTitleMatch =
    html.match(/<meta\s+(?:property|name)=["'](?:og:title|twitter:title)["']\s+content=["']([^"']+)["']/i) ||
    html.match(/<title[^>]*>([^<]+)<\/title>/i);

  const ogDescMatch =
    html.match(/<meta\s+(?:property|name)=["'](?:og:description|description)["']\s+content=["']([^"']+)["']/i) ||
    html.match(/<meta\s+content=["']([^"']+)["']\s+(?:property|name)=["'](?:og:description|description)["']/i);

  let ogImage = ogImageMatch ? cleanUrl(ogImageMatch[1]) : null;

  // Heuristic Fallback (like Facebook): If no og:image tag, find first prominent content <img> in HTML
  if (!ogImage) {
    const imgRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/gi;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(html)) !== null) {
      const src = imgMatch[1];
      const isNoise =
        src.includes("logo") ||
        src.includes("icon") ||
        src.includes("avatar") ||
        src.includes("tracking") ||
        src.includes("pixel") ||
        src.endsWith(".svg") ||
        src.endsWith(".gif");

      if (!isNoise && (src.includes(".jpg") || src.includes(".png") || src.includes(".webp") || src.includes(".jpeg"))) {
        ogImage = cleanUrl(src);
        break;
      }
    }
  }

  return {
    ogImage,
    title: ogTitleMatch ? ogTitleMatch[1].trim() : null,
    description: ogDescMatch ? ogDescMatch[1].trim() : null,
  };
}

async function getUrlMeta(url) {
  // If direct PDF, don't scrape HTML
  if (url.toLowerCase().endsWith(".pdf")) {
    return { ogImage: null };
  }

  // Pass 1: Realistic Chrome Browser Headers
  let html = await fetchHtml(url, BROWSER_HEADERS);
  let meta = extractMeta(html, url);

  // Pass 2: Facebook External Hit Crawler Fallback
  if (!meta || !meta.ogImage) {
    let fbHtml = await fetchHtml(url, FB_HEADERS);
    let fbMeta = extractMeta(fbHtml, url);
    if (fbMeta && fbMeta.ogImage) {
      meta = fbMeta;
    }
  }

  return meta || { ogImage: null };
}

async function syncAll() {
  console.log("🔄 Reading curated links from src/lib/linksData.ts...");
  
  if (!fs.existsSync(DATA_FILE)) {
    console.error("❌ Error: linksData.ts not found!");
    process.exit(1);
  }

  const content = fs.readFileSync(DATA_FILE, "utf8");

  // Parse items via regex to preserve formatting
  const itemBlockRegex = /\{[\s\S]*?id:\s*"([^"]+)"[\s\S]*?url:\s*"([^"]+)"[\s\S]*?\}/g;
  let matches;
  const itemsToProcess = [];

  while ((matches = itemBlockRegex.exec(content)) !== null) {
    const rawBlock = matches[0];
    const id = matches[1];
    const url = matches[2];
    itemsToProcess.push({ id, url, rawBlock });
  }

  console.log(`📡 Discovered ${itemsToProcess.length} curated link items. Syncing OpenGraph assets in parallel...`);

  let updatedContent = content;
  let updatedCount = 0;

  for (const item of itemsToProcess) {
    const meta = await getUrlMeta(item.url);
    if (meta && meta.ogImage) {
      console.log(`✅ [${item.id}] Found og:image: ${meta.ogImage}`);

      // Check if item already has ogImage
      if (item.rawBlock.includes("ogImage:")) {
        const newBlock = item.rawBlock.replace(
          /ogImage:\s*"[^"]*"/,
          `ogImage: "${meta.ogImage}"`
        );
        updatedContent = updatedContent.replace(item.rawBlock, newBlock);
      } else {
        const newBlock = item.rawBlock.replace(
          /\n(\s*)\},?$/,
          `\n$1  ogImage: "${meta.ogImage}",\n$1}`
        );
        updatedContent = updatedContent.replace(item.rawBlock, newBlock);
      }
      updatedCount++;
    } else {
      console.log(`ℹ️  [${item.id}] No og:image (PDF or text source)`);
    }
  }

  fs.writeFileSync(DATA_FILE, updatedContent, "utf8");
  console.log(`\n🎉 Successfully synced ${updatedCount} OpenGraph assets in src/lib/linksData.ts!`);
}

syncAll();
