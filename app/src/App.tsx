import { createRouter, RouterProvider } from '@tanstack/react-router';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentUser } from '@/store/Reducers/authReducer';
import { routeTree } from './routeTree.gen'
import './App.css';

// Set up a Router instance
const router = createRouter({
  routeTree,
  context: { user: null },
  defaultPreload: 'intent',
  defaultStaleTime: 5000,
  scrollRestoration: true,
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const user = useAppSelector(selectCurrentUser);
  return <RouterProvider router={router} context={{ user }} />;
}
