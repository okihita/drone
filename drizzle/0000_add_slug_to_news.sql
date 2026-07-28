ALTER TABLE news_items ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;

-- Generate slugs for existing articles from their titles
UPDATE news_items
SET slug = LOWER(
  REGEXP_REPLACE(
    REGEXP_REPLACE(
      REGEXP_REPLACE(title, '[^a-zA-Z0-9\s-]', '', 'g'),  -- strip special chars
      '\s+', '-', 'g'                                        -- spaces → hyphens
    ),
    '-+', '-', 'g'                                           -- collapse multiple hyphens
  )
)
WHERE slug IS NULL;

-- Trim to reasonable length (max 80 chars) and strip trailing hyphens
UPDATE news_items
SET slug = RTRIM(LEFT(slug, 80), '-')
WHERE slug IS NOT NULL AND LENGTH(slug) > 80;

-- Handle collisions: append "-2", "-3" etc. to duplicate slugs
DO $$
DECLARE
    rec RECORD;
    counter INT;
    base_slug TEXT;
BEGIN
    FOR rec IN
        SELECT id, slug FROM news_items
        WHERE slug IN (
            SELECT slug FROM news_items GROUP BY slug HAVING COUNT(*) > 1
        )
        ORDER BY slug, created_at
    LOOP
        base_slug := rec.slug;
        counter := 1;
        WHILE EXISTS (
            SELECT 1 FROM news_items
            WHERE slug = rec.slug AND id != rec.id
        ) LOOP
            counter := counter + 1;
            UPDATE news_items
            SET slug = RTRIM(LEFT(base_slug || '-' || counter, 80), '-')
            WHERE id = rec.id;
        END LOOP;
    END LOOP;
END;
$$;
