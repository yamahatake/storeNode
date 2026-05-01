import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { addToCart } from '@/store/Reducers/cartReducer';
import type { Product } from '@/types';

const BADGE_STYLES = {
  sale: 'bg-red-500 text-white',
  new: 'bg-emerald-500 text-white',
  hot: 'bg-orange-500 text-white',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= Math.round(rating) ? 'text-amber-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const [added, setAdded] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  function handleAddToCart() {
    if (!product.inStock) return;
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all group">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-md uppercase tracking-wide ${BADGE_STYLES[product.badge]}`}>
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
            <span className="bg-gray-800 text-white text-xs font-semibold px-3 py-1 rounded-full">Out of stock</span>
          </div>
        )}
        <button
          onClick={() => setWishlisted(v => !v)}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg
            className={`w-4 h-4 transition-colors ${wishlisted ? 'text-red-500 fill-red-500' : 'text-gray-400'}`}
            fill={wishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-400 font-medium mb-1">{product.category}</p>
        <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2 line-clamp-2">{product.name}</h3>

        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-gray-500">({product.reviews.toLocaleString()})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="text-xs font-semibold text-red-500">-{discount}%</span>
              </>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || added}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1 ${
              added
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : product.inStock
                ? 'bg-violet-600 hover:bg-violet-700 text-white'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            {added ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Added
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
