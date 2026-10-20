# BednBath — hotel linen storefront (frontend)

Next.js (App Router) frontend. Layout follows welcointernational.com; colours are the Cobalt & Porcelain palette
(Porcelain `#FAFAF7`, Ice Blue `#E6ECF5`, Cobalt `#2A4FA3`, Silver Grey `#A9B2BF`, Ink `#141E33`).

```
npm install
npm run dev       # http://localhost:3000
npm run build     # static export to out/
npm run preview   # build, then write preview.html (single-file HTML/CSS of the home page)
```

- `app/site.js` — brand, menus, sidebar links and products in one place.
- `app/components/` — Header (top links, logo, badge, nav + search, banner, product ticker), MainNav, Banner, Sidebar, Footer.
- `app/page.js` — home (Sign In box). `app/products/page.js` — product grid. `app/[slug]/page.js` — placeholder for every other link.
- Layout is a fixed 1260px page on every device, like the reference: the viewport meta makes phones and tablets zoom it out to fit.

The sign-in form posts to `/api/auth/login`, to be served by the Node.js backend. Remove `output: 'export'` in
`next.config.mjs` once pages need server rendering.
