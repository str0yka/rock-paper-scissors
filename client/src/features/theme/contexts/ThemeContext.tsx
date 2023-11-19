import { createContext } from 'react';

import { THEME_DEFAULT } from '../utils/constants';

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeState>({
  theme: THEME_DEFAULT,
  toggleTheme: () => {},
});
