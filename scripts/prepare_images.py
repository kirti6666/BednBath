# Usage: python3 scripts/prepare_images.py <folder with 6.jpg logo, 7-10.jpg photos> public/images
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

gallery('7.jpg', 'bed-gold')                                  # bed with gold runner, striped sheets
gallery('8.jpg', 'room-navy')                                 # hotel room, navy runner
gallery('9.jpg', 'bed-patterned')                             # bed with patterned runner
gallery('7.jpg', 'pillows-gold', (300, 170, 1130, 792))       # both pillow pairs, gold-runner bed
gallery('9.jpg', 'pillows-patterned', (360, 140, 1180, 755))  # pillows, patterned-runner bed
gallery('8.jpg', 'pillows-navy', (640, 400, 1180, 805))       # pillows and cushions, navy room
gallery('10.jpg', 'towels', (0, 330, 1200, 1230))             # towel stack
gallery('10.jpg', 'towels-detail', (0, 120, 800, 720))        # close-up of the dobby borders
