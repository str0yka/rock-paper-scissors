import { LOCALE_DEFAULT } from '~/utils/constants';

export const getMessages = async (locale: Locale) => {
  try {
    const messages = await import(`../../../static/intl/${locale}.json`);
    return messages.default as Record<string, string>;
  } catch {
    const defaultMessages = await import(`../../../static/intl/${LOCALE_DEFAULT}.json`);
    return defaultMessages.default as Record<string, string>;
  }
};
