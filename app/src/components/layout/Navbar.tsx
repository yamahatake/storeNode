import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectUser, logout } from '@/store/Reducers/authReducer';
import { selectCartCount } from '@/store/Reducers/cartReducer';
import { setIsCartOpen, setIsChatOpen } from '@/store/Reducers/uiReducer';

interface NavbarProps {
  search: string;
  onSearch: (val: string) => void;
}

export default function Navbar({ search, onSearch }: NavbarProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const cartCount = useAppSelector(selectCartCount);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">ShopVerse</span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={e => onSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition text-gray-900"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Chat */}
            <button
              onClick={() => dispatch(setIsChatOpen(true))}
              className="p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition"
              title="Support chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 3H3a2 2 0 00-2 2v14a2 2 0 002 2h5l4 4 4-4h5a2 2 0 002-2V5a2 2 0 00-2-2z" />
              </svg>
            </button>

            {/* Cart */}
            <button
              onClick={() => dispatch(setIsCartOpen(true))}
              className="relative p-2 text-gray-500 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition"
              title="Shopping cart"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-violet-600 text-white text-xs font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center min-w-[18px] px-1 leading-none py-0.5">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {/* User */}
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(v => !v)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-50 transition"
              >
                <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                  <span className="text-violet-700 font-semibold text-sm">
                    {user?.name.charAt(0)}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden md:block">{user?.name}</span>
                <svg className="w-4 h-4 text-gray-400 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  {['My Orders', 'Wishlist', 'Account Settings'].map(item => (
                    <button key={item} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition">
                      {item}
                    </button>
                  ))}
                  <div className="border-t border-gray-100 mt-1">
                    <button
                      onClick={() => { setUserMenuOpen(false); dispatch(logout()); navigate({ to: '/login' }); }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Click outside to close menu */}
      {userMenuOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setUserMenuOpen(false)} />
      )}
    </nav>
  );
}
