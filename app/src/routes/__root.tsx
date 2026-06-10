import { useState } from 'react';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import type { RouterContext } from '@/types';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import CartSidebar from '@/components/CartSidebar';
import ChatWidget from '@/components/ChatWidget';
import Navbar from '@/components/layout/Navbar';

const Root = () => {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar search={search} onSearch={setSearch} />
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} />
      <CartSidebar />
      <ChatWidget />
    </div>
  )
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    )
  },
})
export default Root