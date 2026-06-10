import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { getProducts } from '@/api/products';
import type { Product } from '@/types';
import { createFileRoute, redirect } from '@tanstack/react-router'

const Home = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(products => {
      setAllProducts(products);
    }).catch(err => {
      console.error('Failed to fetch products:', err);
    });
  }, []);

  return (
    <>
      {/* Hero Banner */}
      <div className="bg-linear-to-r from-violet-600 to-indigo-600 text-white py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-violet-200 text-sm font-medium mb-1">Limited time offer</p>
            <h1 className="text-2xl sm:text-3xl font-bold">Up to 40% off — Sale ends Friday</h1>
            <p className="text-violet-200 mt-1 text-sm">Free shipping on all orders over $35</p>
          </div>
          <button type="button" className="shrink-0 bg-white text-violet-700 font-bold px-6 py-3 rounded-xl hover:bg-violet-50 transition text-sm">
            Shop the Sale
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">{allProducts.length}</span> products
              </p>
            </div>

            {/* Products grid */}
            {allProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                {allProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <p className="text-gray-700 font-semibold">No products found</p>
                <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

export const Route = createFileRoute('/')({
  beforeLoad: ({ context }) => {
    if (!context.user) {
      throw redirect({ to: '/login' });
    }
  },
  component: Home,
})