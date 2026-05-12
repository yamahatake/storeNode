import { createRouter, createRoute, createRootRouteWithContext, redirect, Outlet } from '@tanstack/react-router';
import type { User } from '@/types';
import LoginPage from '@/views/LoginPage';
import RegisterPage from '@/views/RegisterPage';
import StorePage from '@/views/StorePage';

interface RouterContext {
  user: User | null;
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: ({ context }) => {
    throw redirect({ to: context.user ? '/store' : '/login' });
  },
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  beforeLoad: ({ context }) => {
    if (context.user) throw redirect({ to: '/store' });
  },
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  beforeLoad: ({ context }) => {
    if (context.user) throw redirect({ to: '/store' });
  },
  component: RegisterPage,
});

const storeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/store',
  beforeLoad: ({ context }) => {
    if (!context.user) throw redirect({ to: '/login' });
  },
  component: StorePage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  storeRoute
]);

export const router = createRouter({
  routeTree,
  context: { user: null },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
