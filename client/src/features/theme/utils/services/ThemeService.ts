import { THEME, THEME_DEFAULT, THEME_LOCAL_STORAGE_KEY } from '../constants';

export class ThemeService {
  static isValid(theme?: unknown): theme is Theme {
    let valid = false;
    if (theme === THEME.DARK) valid = true;
    if (theme === THEME.LIGHT) valid = true;
    return valid;
  }

  static get() {
    const theme = localStorage.getItem(THEME_LOCAL_STORAGE_KEY);

    const validTheme = this.isValid(theme) ? theme : THEME_DEFAULT;

    return validTheme;
  }

  static save(theme: Theme) {
    const validTheme = this.isValid(theme) ? theme : THEME_DEFAULT;

    localStorage.setItem(THEME_LOCAL_STORAGE_KEY, validTheme);

    return validTheme;
  }

  static toggle() {
    const theme = this.get();

    const newTheme = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;

    this.save(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);

    return newTheme;
  }

  static initialize() {
    const theme = this.get();

    document.documentElement.classList.add(theme);
  }
}
