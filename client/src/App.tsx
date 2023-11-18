import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/:roomId', element: <GamePage /> },
]);

export const App = () => <RouterProvider router={router} />;
