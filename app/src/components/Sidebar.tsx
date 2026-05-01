import { CATEGORIES } from '@/data/products';

interface SidebarProps {
  selected: string;
  onSelect: (cat: string) => void;
  priceRange: [number, number];
  onPriceRange: (range: [number, number]) => void;
  onlyInStock: boolean;
  onToggleStock: () => void;
}

const PRICE_PRESETS: { label: string; range: [number, number] }[] = [
  { label: 'Under $25', range: [0, 25] },
  { label: '$25 – $50', range: [25, 50] },
  { label: '$50 – $100', range: [50, 100] },
  { label: 'Over $100', range: [100, 9999] },
];

export default function Sidebar({ selected, onSelect, priceRange, onPriceRange, onlyInStock, onToggleStock }: SidebarProps) {
  return (
    <aside className="w-60 shrink-0 hidden lg:block">
      <div className="bg-white rounded-2xl border border-gray-200 p-5 sticky top-20">
        {/* Categories */}
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Categories</h3>
        <ul className="space-y-0.5">
          {CATEGORIES.map(cat => (
            <li key={cat}>
              <button
                onClick={() => onSelect(cat)}
                className={`w-full text-left px-3 py-2 rounded-xl text-sm transition font-medium ${
                  selected === cat
                    ? 'bg-violet-50 text-violet-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>

        <hr className="my-4 border-gray-100" />

        {/* Price range */}
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Price Range</h3>
        <ul className="space-y-0.5">
          {PRICE_PRESETS.map(({ label, range }) => {
            const active = priceRange[0] === range[0] && priceRange[1] === range[1];
            return (
              <li key={label}>
                <button
                  onClick={() => onPriceRange(active ? [0, 9999] : range)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm transition font-medium flex items-center gap-2 ${
                    active ? 'bg-violet-50 text-violet-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <span className={`w-3.5 h-3.5 rounded border flex-shrink-0 flex items-center justify-center ${active ? 'bg-violet-600 border-violet-600' : 'border-gray-300'}`}>
                    {active && <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </span>
                  {label}
                </button>
              </li>
            );
          })}
        </ul>

        <hr className="my-4 border-gray-100" />

        {/* In stock */}
        <button
          onClick={onToggleStock}
          className="flex items-center gap-3 w-full text-left"
        >
          <div className={`w-9 h-5 rounded-full transition-colors relative ${onlyInStock ? 'bg-violet-600' : 'bg-gray-200'}`}>
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${onlyInStock ? 'translate-x-4' : 'translate-x-0.5'}`} />
          </div>
          <span className="text-sm text-gray-700 font-medium">In stock only</span>
        </button>
      </div>
    </aside>
  );
}
