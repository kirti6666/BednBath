import { RangeGrid, RangeTabs } from '../components/RangeGrid';
import { categories } from '../site';

export const metadata = { title: 'Products' };

export default function Products() {
  return (
    <>
      <RangeTabs current={null} />
      {categories.map((c) => <RangeGrid key={c.name} range={c} />)}
    </>
  );
}
