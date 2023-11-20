import type { IntlState } from './IntlContext';
import { IntlContext } from './IntlContext';

interface IntlProviderProps extends IntlState {
  locale: Locale;
  children: React.ReactNode;
}

export const IntlProvider: React.FC<IntlProviderProps> = ({
  locale,
  setLocale,
  messages,
  children,
}) => (
  <IntlContext.Provider value={{ locale, setLocale, messages }}>{children}</IntlContext.Provider>
);
