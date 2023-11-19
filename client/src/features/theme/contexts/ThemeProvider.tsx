import { useEffect, useState } from 'react';

import { ThemeService } from '../utils/services';
import { ThemeContext } from './ThemeContext';

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const defaultTheme = ThemeService.get();
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    ThemeService.initialize();
  }, []);

  const toggleTheme = () => {
    const newTheme = ThemeService.toggle();
    setTheme(newTheme);
  };

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
