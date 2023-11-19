import { Outlet } from 'react-router-dom';

import { IconButton } from '~/components/common';
import { IconMoon, IconSun } from '~/components/common/icons';
import { THEME, useTheme } from '~/features/theme';

export const Layout = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="flex h-screen items-center justify-center dark:bg-neutral-900">
      <div className="absolute right-4 top-4">
        <IconButton onClick={toggleTheme}>
          {theme === THEME.LIGHT && <IconSun className="h-5 w-5" />}
          {theme === THEME.DARK && <IconMoon className="h-5 w-5" />}
        </IconButton>
      </div>
      <Outlet />
    </main>
  );
};
