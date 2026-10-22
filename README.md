# BednBath — hotel linen storefront (frontend)

Next.js (App Router) frontend: fixed-width page with a left buyer-tools sidebar, inspired by welcointernational.com but with its own header, sidebar and footer; colours are the Cobalt & Porcelain palette
(Porcelain `#FAFAF7`, Ice Blue `#E6ECF5`, Cobalt `#2A4FA3`, Silver Grey `#A9B2BF`, Ink `#141E33`).

```
npm install
npm run dev       # http://localhost:3000
npm run build     # static export to out/
npm run preview   # build, then write preview*.html (plain HTML/CSS of the main pages)
npm test          # cart, bulk-discount and unit-conversion checks
```

- `app/site.js` — brand, menus, sidebar links, products and product photos in one place.
- `public/images/` — logo, banner and product photos (made web-ready by `scripts/prepare_images.py`).
- `app/components/` — Header (utility bar with search and cart, logo + menu, banner, selling points), MainNav, Banner, Sidebar + SideLinks (grouped buyer links with icons and current-page highlight, quote box), RangeGrid (range product grid and range switcher), Footer (link columns, cards accepted), Cart, AddToCart, CartLink, ParStock.
- `app/page.js` — home (intro, ranges, how ordering works, why buyers choose us, quote call to action). `app/sign-in/page.js` — trade sign in. `app/company-profile/page.js` — company overview. `app/price-list/page.js` — price tables from `app/price-list.json`. `app/products/page.js` — all products; `/products/bed-linen` etc. — one range (rendered by `app/products/[slug]/page.js`). `app/[slug]/page.js` — placeholder for every other link.
- Layout is a fixed page (drawn at 1260px, shown at 1000px) on every device, like the reference: the viewport meta makes phones and tablets zoom it out to fit, a small script in `app/layout.js` shows it 1000px wide on desktop (the reference's size) and zooms it to fit narrower windows, and `text-size-adjust` stops phones enlarging text.

- Product pages: `app/products/[slug]/page.js` (one per product), photos via `app/components/Gallery.js`, options and buying via `app/components/ProductBuy.js`; options and prices come from `app/price-list.json` through `app/catalog.js`.
- Ordering is prepaid: Add to cart / Buy now -> `app/checkout` (contact + international address, postcode optional where countries have none) -> payment gateway -> `app/order-confirmation`. Bulk discount (3% at MOQ, 4% at 5x MOQ) and cart storage live in `app/cart.js`.

Forms post to the Node.js backend, still to be built: `/api/auth/login` (sign in), `/api/enquiries` (enquiry form), `/api/checkout` (creates the order from the posted contact, address and cart lines, adds shipping, starts the payment gateway and returns `{ paymentUrl }`; the gateway should return the buyer to `/order-confirmation?order=<id>&source=<cart|buy-now>`). The backend must recompute prices and discounts itself: never trust totals sent by the browser. Remove `output: 'export'` in
`next.config.mjs` once pages need server rendering.
