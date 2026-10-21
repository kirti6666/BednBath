# BednBath — hotel linen storefront (frontend)

Next.js (App Router) frontend: fixed-width page with a left buyer-tools sidebar, inspired by welcointernational.com but with its own header, sidebar and footer; colours are the Cobalt & Porcelain palette
(Porcelain `#FAFAF7`, Ice Blue `#E6ECF5`, Cobalt `#2A4FA3`, Silver Grey `#A9B2BF`, Ink `#141E33`).

```
npm install
npm run dev       # http://localhost:3000
npm run build     # static export to out/
npm run preview   # build, then write preview*.html (plain HTML/CSS of the main pages)
npm test          # cart and unit-conversion checks
```

- `app/site.js` — brand, menus, sidebar links, products and product photos in one place.
- `public/images/` — logo, banner and product photos (made web-ready by `scripts/prepare_images.py`).
- `app/components/` — Header (utility bar with search and cart, logo + menu, banner, selling points), MainNav, Banner, Sidebar (grouped buyer links + quote box), Footer (link columns, cards accepted), Cart, AddToCart, CartLink, ParStock.
- `app/page.js` — home (Sign In box). `app/company-profile/page.js` — company overview. `app/price-list/page.js` — price tables from `app/price-list.json`. `app/products/page.js` — product gallery. `app/[slug]/page.js` — placeholder for every other link.
- Layout is a fixed 1260px page on every device, like the reference: the viewport meta makes phones and tablets zoom it out to fit.

- Shopping cart: price-list prices add items (`app/components/AddToCart.js`), `app/components/Cart.js` shows them; cart logic and storage in `app/cart.js`.

Forms post to the Node.js backend, still to be built: `/api/auth/login` (sign in), `/api/enquiries` (enquiry form), `/api/orders` (cart order request). Remove `output: 'export'` in
`next.config.mjs` once pages need server rendering.
