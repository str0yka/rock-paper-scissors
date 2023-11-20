import { THEME, THEMES, THEME_DEFAULT, THEME_LOCAL_STORAGE_KEY } from '../constants';

export class ThemeService {
  static isValid(theme?: unknown): theme is Theme {
    return !!THEMES.find((THEME) => THEME === theme);
  }

  static get() {
    const theme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);

    return this.isValid(theme) ? theme : THEME_DEFAULT;
  }

  static getAnother(theme: Theme) {
    return theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
  }

  static set(theme: Theme) {
    const validTheme = this.isValid(theme) ? theme : THEME_DEFAULT;

    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, validTheme);
    document.documentElement.classList.add(validTheme);
  }
}
