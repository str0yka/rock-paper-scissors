import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Layout } from '~/components';
import { HomePage, GamePage } from '~/pages';
import { DYNAMIC, ROUTE } from '~/utils/constants';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: ROUTE.HOME,
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTE.ROOM(DYNAMIC.ROOM), element: <GamePage /> },
    ],
  },
]);

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
