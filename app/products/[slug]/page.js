import Link from 'next/link';
import Gallery from '../../components/Gallery';
import ProductBuy from '../../components/ProductBuy';
import { RangeGrid, RangeTabs } from '../../components/RangeGrid';
import { allProducts, variantsFor } from '../../catalog';
import { categories, photos, rangeDetails, specPage, productHref, rangeHref, slug } from '../../site';

export const dynamicParams = false;
// /products/<slug> is either a range page (bed-linen, bath-linen, banquet-linen) or a product page.
export const generateStaticParams = () => [...categories.map((c) => ({ slug: slug(c.name) })), ...allProducts.map((p) => ({ slug: p.slug }))];

const find = async (params) => {
  const { slug: s } = await params;
  return { range: categories.find((c) => slug(c.name) === s), product: allProducts.find((p) => p.slug === s) };
};

export async function generateMetadata({ params }) {
  const { range, product } = await find(params);
  return { title: (range ?? product).name };
}

export default async function ProductPage({ params }) {
  const { range, product } = await find(params);
  if (range) {
    return (
      <>
        <RangeTabs current={range.name} />
        <RangeGrid range={range} heading="h1" />
      </>
    );
  }
  const variants = variantsFor(product.name);
  const others = allProducts.filter((p) => p.range === product.range && p.slug !== product.slug);

  return (
    <article className="pdp">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/products">Products</Link> / <Link href={rangeHref(product.range)}>{product.range}</Link> / <span>{product.name}</span>
      </nav>

      <div className="pdp-top">
        <Gallery name={product.name} images={photos[product.name]} />
        <div>
          <p className="eyebrow">{product.range}</p>
          <h1>{product.name}</h1>
          {variants.length ? (
            <ProductBuy variants={variants} />
          ) : (
            <div className="pdp-request">
              <p><strong>Price on request.</strong> Tell us the sizes, colours and quantities you need and we reply with a quotation.</p>
              <Link href="/enquiry-form" className="btn">Request a quote</Link>
            </div>
          )}
          <ul className="pdp-promise">
            <li>Ships worldwide from India: UAE, USA, UK and more</li>
            <li>Prices in USD · prepaid orders, paid securely at checkout</li>
            <li>Bulk discount: 3% at the minimum order quantity, 4% at 5×</li>
          </ul>
        </div>
      </div>

      <div className="pdp-info">
        <section>
          <h2>Product details</h2>
          <ul className="ticks single">{rangeDetails[product.range].map((d) => <li key={d}>{d}</li>)}</ul>
          {product.range === 'Bed Linen' && <p><Link href={specPage}>Full 400 TC technical specification</Link> · <Link href="/size-guide">Size guide</Link></p>}
        </section>
        <section>
          <h2>More {product.range.toLowerCase()}</h2>
          <ul className="pdp-more">{others.map((p) => <li key={p.slug}><Link href={productHref(p.name)}>{p.name}</Link></li>)}</ul>
        </section>
      </div>
    </article>
  );
}
