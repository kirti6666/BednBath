import { notFound } from 'next/navigation';
import { allPages } from '../data';
import ProductGrid from '../components/ProductGrid';

const pages = Object.fromEntries(allPages.map((p) => [p.href.slice(1), p.label]).concat([['sign-up', 'Sign Up']]));

export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(pages).map((slug) => ({ slug }));

export default async function Page({ params }) {
  const { slug } = await params;
  if (!pages[slug]) notFound();
  return (
    <section>
      <h2 className="section-title">{pages[slug]}</h2>
      {slug === 'products' ? <ProductGrid /> : <p className="muted">Content coming soon.</p>}
    </section>
  );
}
