import { LOCALES } from '~/utils/constants';

export const isLocaleAccepted = (locale: unknown): locale is Locale => {
  return !!LOCALES.find((LOCALE) => LOCALE === locale);
};
