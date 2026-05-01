import { RouterProvider } from '@tanstack/react-router';
import { useAppSelector } from '@/store/hooks';
import { selectUser } from '@/store/Reducers/authReducer';
import { router } from '@/router';

export default function App() {
  const user = useAppSelector(selectUser);
  return <RouterProvider router={router} context={{ user }} />;
}
