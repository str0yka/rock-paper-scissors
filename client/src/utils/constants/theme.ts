export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export const THEMES: Theme[] = [THEME.DARK, THEME.LIGHT];

export const THEME_DEFAULT: Theme = THEME.DARK;

export const THEME_LOCAL_STORAGE_KEY = 'theme';
