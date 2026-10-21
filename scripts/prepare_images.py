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

def photo(name, dest, size):
    im = Image.open(f'{src}/{name}').convert('RGB')
    tw, th = size; s = max(tw / im.width, th / im.height)
    im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    l, t = (im.width - tw) // 2, (im.height - th) // 2
    im.crop((l, t, l + tw, t + th)).save(f'{out}/{dest}', quality=80, optimize=True, progressive=True)

Image.open(f'{src}/8.jpg').convert('RGB').resize((1200, 900), Image.LANCZOS).save(f'{out}/banner.jpg', quality=78, optimize=True, progressive=True)
photo('7.jpg', 'bedsheets.jpg', (400, 300))
photo('9.jpg', 'duvet-covers.jpg', (400, 300))
photo('10.jpg', 'bath-towels.jpg', (400, 300))
# Pillowcases: close-up of the right-hand pillows in the gold-runner bed photo.
Image.open(f'{src}/7.jpg').convert('RGB').crop((740, 200, 1130, 492)).resize((400, 300), Image.LANCZOS).save(f'{out}/pillowcases.jpg', quality=80, optimize=True, progressive=True)
