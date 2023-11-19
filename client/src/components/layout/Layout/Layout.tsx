import { Outlet } from 'react-router-dom';

export const Layout = () => (
  <main className="flex h-screen items-center justify-center">
    <Outlet />
  </main>
);
