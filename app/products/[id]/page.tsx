import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === params.id);
  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
