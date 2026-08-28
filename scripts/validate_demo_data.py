#!/usr/bin/env python3
import csv
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
path = ROOT / 'data' / 'verified_public_products.csv'
rows = list(csv.DictReader(path.open(encoding='utf-8')))
assert rows, 'No products found'
models = [r['model'] for r in rows]
assert len(models) == len(set(models)), 'Duplicate model rows found'
for r in rows:
    assert r['source_url'].startswith('http'), f"Missing source URL: {r['model']}"
    assert r['verification_status'] in {'verified_public','partial_public','illustrative_demo'}
print(f'OK: {len(rows)} product rows validated')
