import { Suspense } from 'react';
import ProductsClient from './ProductsClient';

export const metadata = {
  title: 'Precision Industrial Hardware & Controllers | Neural Industrial Automation',
  description: 'Explore precision door interlocking systems, cleanroom controllers, and differential pressure indicators engineered for pharmaceutical compliance.',
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ProductsClient />
    </Suspense>
  );
}
