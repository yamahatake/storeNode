import { RouterProvider } from '@tanstack/react-router';
import { useAppSelector } from '@/store/hooks';
import { selectCurrentUser } from '@/store/Reducers/authReducer';
import { router } from '@/routes';
import './App.css';

export default function App() {
  const user = useAppSelector(selectCurrentUser);
  return <RouterProvider router={router} context={{ user }} />;
}
