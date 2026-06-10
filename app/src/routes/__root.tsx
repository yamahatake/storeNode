import { useState } from 'react';
import { createRootRouteWithContext, Link, Outlet, useMatches } from '@tanstack/react-router';
import type { RouterContext } from '@/types';
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import CartSidebar from '@/components/CartSidebar';
import ChatWidget from '@/components/ChatWidget';
import Navbar from '@/components/layout/Navbar';

const Root = () => {
  const matches = useMatches();
  const context = matches[matches.length - 1].context;
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {context.user && (
        <>
          <Navbar search={search} onSearch={setSearch} />
          <CartSidebar />
          <ChatWidget />
        </>
      )}
      <Outlet />
      {/* <TanStackRouterDevtools position="bottom-right" initialIsOpen={false} /> */}
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