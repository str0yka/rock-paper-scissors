import { LOCALE_DEFAULT, LOCALE_LOCAL_STORAGE_KEY } from '~/utils/constants';
import { isLocaleAccepted } from './checkIsLocaleAccepted';

export const getLocale = () => {
  const browserLocale = navigator.language;
  const localStorageLocale = localStorage.getItem(LOCALE_LOCAL_STORAGE_KEY);

  if (isLocaleAccepted(localStorageLocale)) return localStorageLocale;
  if (isLocaleAccepted(browserLocale)) return browserLocale;
  return LOCALE_DEFAULT;
};
