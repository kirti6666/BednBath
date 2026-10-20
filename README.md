# BednBath — hotel linen storefront (frontend)

Next.js (App Router) frontend. Layout follows welcointernational.com; colours use the Cobalt & Porcelain palette.

```
npm install
npm run dev      # http://localhost:3000
npm run build    # static export to out/
```

- `app/data.js` — all menus, sidebar links and product names in one place.
- `app/components/` — Header (top links, logo, ISO badge, nav + search, banner, product ticker), Sidebar, Footer, ProductGrid.
- `app/[slug]/page.js` — placeholder pages for every nav/sidebar link.
- `preview.html` — single-file HTML/CSS snapshot of the home page.

The sign-in form posts to `/api/auth/login`, to be served by the Node.js backend. Remove `output: 'export'` in `next.config.mjs` when the backend is connected.
