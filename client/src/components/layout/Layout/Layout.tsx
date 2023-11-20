import { Outlet } from 'react-router-dom';

import { IconButton } from '~/components/common';
import { IconMoon, IconSun, IconTranslate } from '~/components/common/icons';
import { useIntl } from '~/features/intl';
import { useTheme } from '~/features/theme';
import { LOCALE, THEME } from '~/utils/constants';
import { ThemeService } from '~/utils/services';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const intl = useIntl();
  const { theme, setTheme } = useTheme();

  return (
    <main className="flex h-screen items-center justify-center dark:bg-neutral-900">
      <div className="absolute right-4 top-4 flex gap-2">
        <IconButton onClick={() => setTheme((theme) => ThemeService.getAnother(theme))}>
          {theme === THEME.LIGHT && <IconSun className="h-5 w-5" />}
          {theme === THEME.DARK && <IconMoon className="h-5 w-5" />}
        </IconButton>
        <IconButton
          onClick={() => intl.setLocale((locale) => (locale === LOCALE.EN ? LOCALE.RU : LOCALE.EN))}
        >
          <div className="flex gap-1">
            <span className="text-sm font-semibold">{intl.locale}</span>
            <IconTranslate className="h-5 w-5" />
          </div>
        </IconButton>
      </div>
      {children || <Outlet />}
    </main>
  );
};
