"""
D.R.O.N.E. Scraper Fleet — Sprint 2
Targets: ASEAN Secretariat portals, national gazettes, regional news APIs

Usage:
  pip install scrapy playwright beautifulsoup4 celery redis
  playwright install
  celery -A tasks worker --loglevel=info
"""

# TODO (Sprint 2):
# - scrapy.Spider subclasses for each target jurisdiction
# - Playwright middleware for JS-rendered pages
# - Redis + Celery task queue for daily cron ingestion
# - SHA-256 dedup before Supabase insert
# - Encoding sanitization (UTF-8 normalization)

TARGETS = {
    "asean_secretariat": "https://asean.org/our-work/digital-economy/",
    "kominfo_id": "https://kominfo.go.id",
    "imda_sg": "https://imda.gov.sg",
    "etda_th": "https://etda.or.th",
    "dict_ph": "https://dict.gov.ph",
}
