# Usage: python3 scripts/prepare_images.py <folder with 6.jpg logo, 7-10.jpg, 26-27.jpg, 31-32.webp and 39-44.jpg photos> public/images
# Logo on black -> transparent PNG for a light header (white -> ink, red kept); photos resized/cropped for the web.
import sys
import numpy as np
from PIL import Image
src, out = sys.argv[1], sys.argv[2]

a = np.asarray(Image.open(f'{src}/6.jpg').convert('RGB')).astype(float)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
bg = 32  # above the JPEG noise in the black background
red = (r - np.maximum(g, b)) > 40
crimson = np.array([170, 21, 51]); ink = np.array([20, 30, 51])
alpha = np.where(red, (r - bg) / (crimson[0] - bg), (a.mean(-1) - bg) / (235 - bg)).clip(0, 1)
rgb = np.where(red[..., None], crimson, ink)
img = Image.fromarray(np.dstack([rgb, alpha * 255]).astype(np.uint8), 'RGBA')
img = img.crop(Image.fromarray((alpha > 0.08).astype(np.uint8) * 255).getbbox())
img.thumbnail((720, 720)); img.save(f'{out}/logo.png', optimize=True)
print('logo', img.size)

Image.open(f'{src}/8.jpg').convert('RGB').resize((1200, 900), Image.LANCZOS).save(f'{out}/banner.jpg', quality=78, optimize=True, progressive=True)

# Product gallery images, all 900x675 (4:3). box = (left, top, right, bottom) crop in the original, None = whole photo.
def gallery(name, dest, box=None):
    im = Image.open(f'{src}/{name}').convert('RGB')
    if box: im = im.crop(box)
    s = max(900 / im.width, 675 / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    l, t = (im.width - 900) // 2, (im.height - 675) // 2
    im.crop((l, t, l + 900, t + 675)).save(f'{out}/{dest}.jpg', quality=80, optimize=True, progressive=True)

# For pictures that must be seen whole (collages, colour tiles): fitted into 900x675 over a blurred, zoomed copy of itself.
# Small tiles are enlarged at most 2.2x so they don't go soft.
def fitted(name, dest, box=None, solid=False):
    from PIL import ImageFilter
    im = Image.open(f'{src}/{name}').convert('RGB')
    if box: im = im.crop(box)
    s = max(900 / im.width, 675 / im.height)
    bg = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    l, t = (bg.width - 900) // 2, (bg.height - 675) // 2
    bg = bg.crop((l, t, l + 900, t + 675)).filter(ImageFilter.GaussianBlur(24))
    if solid:  # plain studio backdrop: fill with the photo's own edge colour instead
        e = np.concatenate([np.asarray(im)[:, :6].reshape(-1, 3), np.asarray(im)[:, -6:].reshape(-1, 3)])
        bg = Image.new('RGB', (900, 675), tuple(int(v) for v in np.median(e, 0)))
    s = min(900 / im.width, 675 / im.height, 2.2)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    bg.paste(im, ((900 - im.width) // 2, (675 - im.height) // 2))
    bg.save(f'{out}/{dest}.jpg', quality=80, optimize=True, progressive=True)

gallery('7.jpg', 'bed-gold')                                  # bed with gold runner, striped sheets
gallery('8.jpg', 'room-navy')                                 # hotel room, navy runner
gallery('9.jpg', 'bed-patterned')                             # bed with patterned runner
gallery('7.jpg', 'pillows-gold', (300, 170, 1130, 792))       # both pillow pairs, gold-runner bed
gallery('9.jpg', 'pillows-patterned', (360, 140, 1180, 755))  # pillows, patterned-runner bed
gallery('8.jpg', 'pillows-navy', (640, 400, 1180, 805))       # pillows and cushions, navy room
gallery('10.jpg', 'towels', (0, 330, 1200, 1230))             # towel stack
gallery('10.jpg', 'towels-detail', (0, 120, 800, 720))        # close-up of the dobby borders
# Comforter colours from the "Premium Comforter Collection" image (31.webp), cropped below each colour label.
gallery('31.webp', 'comforter-red', (0, 168, 506, 548))
gallery('31.webp', 'comforter-pink', (513, 168, 1018, 547))
gallery('31.webp', 'comforter-grey', (1023, 168, 1536, 553))
gallery('31.webp', 'comforter-black', (140, 662, 623, 1024))
gallery('31.webp', 'comforter-white', (910, 662, 1393, 1024))
gallery('26.jpg', 'comforter-grey-folded')                      # grey comforter, folded
gallery('27.jpg', 'comforter-grey-bed')                         # grey comforter on a bed
gallery('32.webp', 'bed-navy-ll')                             # striped sheets, navy runner, Luxurious Life logo
# Banquet linen. 39: chair sash styles and colours, 40: table cloth colours, 41: white table cloth, 42: pillows,
# 43: chair cover views and colours, 44: white chair cover at a laid table.
gallery('44.jpg', 'chair-cover-table')
fitted('43.jpg', 'chair-cover-views', (820, 0, 1402, 466))
for c, (l, r) in {'white': (12, 228), 'black': (240, 462), 'red': (475, 697), 'royal-blue': (710, 930),  # colour tiles along the bottom
                  'gold': (943, 1164), 'maroon': (1176, 1392)}.items():
    fitted('43.jpg', f'chair-cover-{c}', (l + 3, 846, r - 3, 1076), solid=True)
gallery('41.jpg', 'table-cloth-white')
for c, box in {'golden': (12, 22, 381, 455), 'red': (388, 22, 760, 455), 'white-round': (767, 22, 1133, 455), 'maroon': (1140, 22, 1515, 455),
               'pink': (12, 520, 498, 988), 'silver': (507, 520, 1007, 988), 'blue': (1015, 520, 1512, 988)}.items():
    fitted('40.jpg', f'table-cloth-{c}', box)
fitted('39.jpg', 'chair-sash-all')
# Each sash style: its colour tiles (with their labels) rearranged three to a row, so they show larger than in the sheet.
def tiles(name, dest, xs, top, bottom):
    im = Image.open(f'{src}/{name}').convert('RGB')
    cells = [im.crop((l, top, r, bottom)) for l, r in xs]
    w, h = max(c.width for c in cells), bottom - top
    rows = [cells[i:i + 3] for i in range(0, len(cells), 3)]
    sheet = Image.new('RGB', (3 * w + 40, len(rows) * h + 30), 'white')
    for y, row in enumerate(rows):
        x0 = (sheet.width - sum(c.width + 20 for c in row) + 20) // 2  # centre a short last row
        for c in row:
            sheet.paste(c, (x0, 15 + y * h)); x0 += c.width + 20
    s = min(900 / sheet.width, 675 / sheet.height)
    sheet = sheet.resize((round(sheet.width * s), round(sheet.height * s)), Image.LANCZOS)
    page = Image.new('RGB', (900, 675), 'white')
    page.paste(sheet, ((900 - sheet.width) // 2, (675 - sheet.height) // 2))
    page.save(f'{out}/{dest}.jpg', quality=80, optimize=True, progressive=True)
five = [(13, 273), (288, 549), (564, 826), (840, 1101), (1115, 1377)]
tiles('39.jpg', 'chair-sash-bow', five, 57, 388)
tiles('39.jpg', 'chair-sash-cap', five, 455, 722)
tiles('39.jpg', 'chair-sash-ribbon', [(10, 222), (234, 446), (460, 675), (688, 903), (916, 1133), (1146, 1378)], 797, 1052)
gallery('42.jpg', 'pillows-white')
