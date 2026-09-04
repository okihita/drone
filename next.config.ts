import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "engagemedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.engagemedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
    minimumCacheTTL: 3600, // 1h — balances freshness with cache efficiency
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https: blob:",
              "font-src 'self'",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Legacy DEFA redirects
      { source: "/defa", destination: "/trade/defa", permanent: true },
      { source: "/defa/chapters", destination: "/trade/defa", permanent: true },
      { source: "/defa/data-governance", destination: "/governance/data-flows", permanent: true },
      { source: "/defa/ai-ethics", destination: "/governance/ai-ethics", permanent: true },
      { source: "/defa/payments-cyber", destination: "/trade/payments-cyber", permanent: true },
      { source: "/defa/civil-society", destination: "/accountability/civil-society", permanent: true },
      // Legacy D2D redirects
      { source: "/d2d", destination: "/accountability/benchmark", permanent: true },
      { source: "/d2d/benchmark", destination: "/accountability/benchmark", permanent: true },
      { source: "/d2d/tech-sovereignty", destination: "/governance/tech-sovereignty", permanent: true },
      { source: "/d2d/encryption", destination: "/governance/encryption", permanent: true },
      { source: "/d2d/consumer-protection", destination: "/accountability/consumer-protection", permanent: true },
      { source: "/d2d/negotiations", destination: "/trade/negotiations", permanent: true },
      { source: "/d2d/ip-monitor", destination: "/trade/ip-monitor", permanent: true },
      // Legacy Intake / Dossier redirects
      { source: "/intake", destination: "/leaks", permanent: true },
      { source: "/submit-dossier", destination: "/leaks", permanent: true },
      // Legacy Investigations redirects
      { source: "/investigations", destination: "/accountability/investigations", permanent: true },
      { source: "/investigations/:slug", destination: "/accountability/investigations/:slug", permanent: true },
      { source: "/investigations/id/:id", destination: "/accountability/investigations/id/:id", permanent: true },
    ];
  },
};

export default nextConfig;
