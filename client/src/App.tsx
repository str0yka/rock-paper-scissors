import { useCallback, useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Layout } from '~/components';
import { HomePage, GamePage } from '~/pages';
import { DYNAMIC, LOCALE_LOCAL_STORAGE_KEY, ROUTE } from '~/utils/constants';
import { ThemeProvider } from '~/features/theme';
import { IntlProvider } from '~/features/intl';
import { getLocale, getMessages } from '~/utils/helpers';
import { Spinner } from './components/common';
import { ThemeService } from './utils/services';

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

export const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState<Theme>(ThemeService.get());
  const [locale, setLocale] = useState(getLocale());
  const [messages, setMessages] = useState<Record<string, string>>({});

  useEffect(() => {
    localStorage.setItem(LOCALE_LOCAL_STORAGE_KEY, locale);

    (async () => {
      const localeMessages = await getMessages(locale);
      setMessages(localeMessages);
      setIsLoading(false);
    })();
  }, [locale]);

  const changeTheme = useCallback(
    (newTheme: Theme | ((theme: Theme) => Theme)) => {
      document.documentElement.classList.remove(theme);
      setTheme(newTheme);
    },
    [theme],
  );

  useEffect(() => {
    ThemeService.set(theme);
  }, [theme]);

  if (isLoading) {
    return (
      <main className="flex h-screen items-center justify-center">
        <Spinner />
      </main>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        theme={theme}
        setTheme={changeTheme}
      >
        <IntlProvider
          locale={locale}
          setLocale={setLocale}
          messages={messages}
        >
          <RouterProvider router={router} />
        </IntlProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
