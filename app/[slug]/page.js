import { pages } from '../site';

export const dynamicParams = false;
export const generateStaticParams = () => pages.map((p) => ({ slug: p.href.slice(1) }));

export default async function Page({ params }) {
  const { slug } = await params;
  const { label } = pages.find((p) => p.href === `/${slug}`);
  return (
    <section>
      <h1 className="title">{label}</h1>
      <p className="muted">Content coming soon.</p>
    </section>
  );
}
