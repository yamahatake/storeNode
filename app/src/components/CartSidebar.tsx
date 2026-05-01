import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectCartItems, selectCartTotal, updateQuantity, removeFromCart } from '@/store/Reducers/cartReducer';
import { selectIsCartOpen, setIsCartOpen } from '@/store/Reducers/uiReducer';

export default function CartSidebar() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);
  const isCartOpen = useAppSelector(selectIsCartOpen);
  const cartTotal = useAppSelector(selectCartTotal);

  return (
    <>
      {/* Backdrop */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => dispatch(setIsCartOpen(false))}
        />
      )}

      {/* Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Shopping Cart</h2>
          <button
            onClick={() => dispatch(setIsCartOpen(false))}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="text-gray-500 font-medium">Your cart is empty</p>
              <p className="text-sm text-gray-400">Add some products to get started</p>
              <button
                onClick={() => dispatch(setIsCartOpen(false))}
                className="mt-2 px-4 py-2 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 transition"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="flex gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-1">{item.product.name}</p>
                  <p className="text-sm text-violet-600 font-bold mt-0.5">${item.product.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => dispatch(updateQuantity({ productId: item.product.id, quantity: item.quantity - 1 }))}
                      className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition font-bold text-sm"
                    >
                      −
                    </button>
                    <span className="text-sm font-semibold text-gray-900 w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => dispatch(updateQuantity({ productId: item.product.id, quantity: item.quantity + 1 }))}
                      className="w-6 h-6 rounded-md bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition font-bold text-sm"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(removeFromCart(item.product.id))}
                      className="ml-auto p-1 text-gray-400 hover:text-red-500 transition"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="px-5 py-4 border-t border-gray-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-sm">Subtotal</span>
              <span className="font-bold text-gray-900">${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Shipping</span>
              <span className="text-emerald-600 font-medium">Free</span>
            </div>
            <div className="flex items-center justify-between font-bold text-lg border-t border-gray-100 pt-3">
              <span>Total</span>
              <span className="text-violet-600">${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition text-sm">
              Proceed to Checkout
            </button>
            <button
              onClick={() => dispatch(setIsCartOpen(false))}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
