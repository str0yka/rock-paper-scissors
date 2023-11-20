import { ThemeContext } from './ThemeContext';
import type { ThemeState } from './ThemeContext';

interface ThemeProviderProps extends ThemeState {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ theme, setTheme, children }) => {
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};
