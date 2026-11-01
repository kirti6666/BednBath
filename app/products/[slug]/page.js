import Link from 'next/link';
import Gallery from '../../components/Gallery';
import { RangeGrid, RangeTabs } from '../../components/RangeGrid';
import { allProducts, variantsFor } from '../../catalog';
import { categories, photos, rangeDetails, specPage, comforterSpecPage, comforterSizes, productHref, rangeHref, slug } from '../../site';

const unique = (xs) => [...new Set(xs.filter(Boolean))];

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
  const options = variants.flatMap((v) => v.options);
  // Comforter sizes follow the comforter specification, which is newer than the price list.
  const sizes = product.name === 'Duvets & Comforters' ? comforterSizes.map(([s]) => s) : unique(variants.map((v) => v.size));
  const facts = [
    ['Fabric', unique(variants.map((v) => v.fabric)).join(', ')],
    ['Style', unique(variants.map((v) => v.style)).join(', ')],
    ['Sizes', sizes.join(', ')],
    // Sheets, covers and pillowcases come in every thread count of the bed sheet specification, priced or not.
    ['Thread count', ['Bedsheets', 'Duvet Covers', 'Pillowcases'].includes(product.name) ? '300 TC, 400 TC, 600 TC' : ''],
    ['Minimum order', !options.length ? '' : unique(options.map((o) => o.moq)).length === 1 ? `${options[0].moq} per size` : 'Depends on size'],
  ].filter(([, v]) => v);
  const spec = product.name === 'Duvets & Comforters' ? comforterSpecPage : product.range === 'Bed Linen' ? specPage : null;
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
          <p className="pdp-price">
            {options.length ? <>From ${Math.min(...options.map((o) => o.price)).toFixed(2)} <small>USD per piece or set</small></> : <small>Price on request</small>}
          </p>
          {facts.length > 0 && (
            <dl className="pdp-facts">{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          )}
          <div className="pdp-actions">
            <Link href="/enquiry-form" className="btn">Request a quote</Link>
            <Link href="/price-list" className="btn ghost">See the price list</Link>
          </div>
          <ul className="pdp-promise">
            <li>Exported worldwide from India</li>
            <li>Custom sizes, colours, labels and private labelling</li>
            <li>Final price, lead time and shipping confirmed on your quotation</li>
          </ul>
        </div>
      </div>

      <div className="pdp-info">
        <section>
          <h2>Product details</h2>
          <ul className="ticks single">{rangeDetails[product.range].map((d) => <li key={d}>{d}</li>)}</ul>
          {spec && <p><Link href={spec}>Full technical specification</Link> · <Link href="/size-guide">Size guide</Link></p>}
        </section>
        <section>
          <h2>More {product.range.toLowerCase()}</h2>
          <ul className="pdp-more">{others.map((p) => <li key={p.slug}><Link href={productHref(p.name)}>{p.name}</Link></li>)}</ul>
        </section>
      </div>
    </article>
  );
}
