export const LOCALE = {
  RU: 'ru-RU',
  EN: 'en-US',
} as const;

export const LOCALES: Locale[] = [LOCALE.EN, LOCALE.RU];

export const LOCALE_DEFAULT: Locale = LOCALE.EN;

export const LOCALE_LOCAL_STORAGE_KEY = 'locale';
