# Usage: python3 scripts/xlsx_to_json.py Website_Delhi_1.xlsx app/price-list.json (then fix "Twin Xl" -> "Twin XL"). Unreadable or clearly wrong prices become "On request".
import json, re, sys, openpyxl
rows = [r for r in openpyxl.load_workbook(sys.argv[1], data_only=True).active.iter_rows(values_only=True) if any(c is not None for c in r)]
clean = lambda v: re.sub(r'\s+', ' ', str(v)).strip() if v is not None else ''
fixed = []  # cells replaced, reported to the user

def price(v, row_label):
    if isinstance(v, (int, float)): return f'{v:.2f}'
    fixed.append(f'{row_label}: {v!r}'); return 'On request'

def prices(r, label, is_set):
    out = [price(v, label) for v in r[7:11]]
    if is_set and all(p != 'On request' and float(p) < 10 for p in out[:2]):  # a sheet set at the pillowcase price is a copy error
        fixed.append(f'{label}: {r[7]!r} (set priced like a pillowcase)'); out = ['On request'] * 4
    return out

tc = ['300 TC plain percale', '300 TC satin stripe 1 cm', '400 TC plain percale', '400 TC satin stripe 1 cm']
sections, cur = [], None
for r in rows[2:]:
    if all(c is None for c in r[1:]):
        title = clean(r[0]); cur = None
        if title.lower().startswith('bath'):
            cur = {'title': 'Bath Linen', 'columns': ['Item', 'Colour', 'Size (cm)', 'MOQ', 'SKU', 'Price (USD)'], 'rows': []}
        elif 'comforter' in title.lower():
            cur = {'title': 'Duvets / Comforters', 'note': 'Super soft premium quality: 120 GSM outer peach finish fabric with 250 GSM virgin microfibre filling, feather-like fill.',
                   'columns': ['Fits', 'Size', 'Size (in)', 'MOQ', 'SKU', 'Price (USD)'], 'rows': []}
        else:
            duvet = 'duvet' in title.lower(); stripe = 'stripe' in title.lower()
            cur = {'title': f"{'Duvet Covers' if duvet else 'Bed Sheets & Pillowcases'}: {'1 cm stripe' if stripe else 'plain percale'}",
                   'note': f"100% cotton{', 1 cm stripe' if stripe else ', plain percale'}.",
                   'columns': (['Fits', 'Size', 'Cover (in)'] if duvet else ['Item', 'Size', 'Size (in)']) + ['Pillowcase (in)', 'MOQ', 'SKU'] + [f'{t} (USD)' for t in tc], 'rows': []}
        sections.append(cur); continue
    if cur is None:  # first block has no title row of its own
        cur = {'title': 'Bed Sheets & Pillowcases: 1 cm stripe', 'note': '100% cotton, 1 cm stripe.',
               'columns': ['Item', 'Size', 'Size (in)', 'Pillowcase (in)', 'MOQ', 'SKU'] + [f'{t} (USD)' for t in tc], 'rows': []}
        sections.append(cur)
    desc, kind, size, s1, s2, moq, sku = (clean(c) for c in r[:7])
    if 'Towel' not in desc: kind, size = kind.title(), size.title()
    if cur['title'] == 'Bath Linen':
        name, gsm = re.match(r'(\w+ towels?).*?(\d+ G\w+)', desc, re.I).groups()
        cur['rows'].append([f"{name.capitalize()[:-1] if name.endswith('s') else name}, {gsm.replace('GRM', 'g')}", kind, s1, moq, sku, price(r[7], sku)])
    elif cur['title'] == 'Duvets / Comforters':
        cur['rows'].append([kind, size, s1, moq, sku, price(r[7], sku)])
    elif cur['title'].startswith('Duvet Covers'):
        n = re.search(r'with (\d) Pillow', desc).group(1)
        cur['rows'].append([f'{kind} (+{n} pillowcase{"s" if n != "1" else ""})', size, s1, s2, moq, sku, *prices(r, f'{sku} {size}', True)])
    else:
        n = re.search(r'with (\d) Pillow', desc)
        item = kind.capitalize().replace('Pillow case', 'Pillowcase') + (f' (+{n.group(1)} pillowcase{"s" if n.group(1) != "1" else ""})' if n else '')
        pillow = kind == 'Pillow Case'
        cur['rows'].append([item, size, s1, '' if pillow else s2, moq, sku, *prices(r, f'{sku} {size}', not pillow)])

json.dump(sections, open(sys.argv[2], 'w'), indent=1)
print(len(sections), 'sections,', sum(len(s['rows']) for s in sections), 'rows')
print('\n'.join(fixed))
