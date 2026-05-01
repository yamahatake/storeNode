import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/Sidebar';
import ProductCard from '@/components/ProductCard';
import CartSidebar from '@/components/CartSidebar';
import ChatWidget from '@/components/ChatWidget';
import { CATEGORIES } from '@/data/products';
import { fetchProducts } from '@/api/products';

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
];

export default function StorePage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999]);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sort, setSort] = useState('featured');

  const { data: allProducts = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const filtered = useMemo(() => {
    let items = allProducts;
    if (category !== 'All') items = items.filter(p => p.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      items = items.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    }
    items = items.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (onlyInStock) items = items.filter(p => p.inStock);

    return [...items].sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'reviews') return b.reviews - a.reviews;
      return 0;
    });
  }, [allProducts, search, category, priceRange, onlyInStock, sort]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar search={search} onSearch={setSearch} />

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

      {/* Mobile category bar */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-2 overflow-x-auto flex gap-2">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition ${
              category === cat ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <Sidebar
            selected={category}
            onSelect={setCategory}
            priceRange={priceRange}
            onPriceRange={setPriceRange}
            onlyInStock={onlyInStock}
            onToggleStock={() => setOnlyInStock(v => !v)}
          />

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between gap-4 mb-6">
              <p className="text-sm text-gray-500">
                <span className="font-semibold text-gray-900">{filtered.length}</span> products
                {category !== 'All' && <> in <span className="font-semibold text-violet-600">{category}</span></>}
                {search && <> matching "<span className="font-semibold">{search}</span>"</>}
              </p>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-500 hidden sm:block">Sort:</label>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  title="Sort products"
                  aria-label="Sort products"
                  className="text-sm border border-gray-200 rounded-xl px-3 py-1.5 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                >
                  {SORT_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products grid */}
            {isLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-pulse">
                    <div className="aspect-square bg-gray-200" />
                    <div className="p-4 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-1/3" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-3 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filtered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map(p => (
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
                <button
                  type="button"
                  onClick={() => { setSearch(''); setCategory('All'); setPriceRange([0, 9999]); setOnlyInStock(false); }}
                  className="text-sm text-violet-600 hover:text-violet-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <CartSidebar />
      <ChatWidget />
    </div>
  );
}
