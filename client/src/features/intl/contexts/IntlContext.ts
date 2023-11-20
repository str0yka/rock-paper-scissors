import { createContext } from 'react';

import { LOCALE_DEFAULT } from '~/utils/constants';

export interface IntlState {
  locale: Locale;
  setLocale: (locale: Locale | ((locale: Locale) => Locale)) => void;
  messages: Record<string, string>;
}

export const IntlContext = createContext<IntlState>({
  locale: LOCALE_DEFAULT,
  setLocale: () => {},
  messages: {},
});
