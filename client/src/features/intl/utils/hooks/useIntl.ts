import { useContext } from 'react';

import { IntlContext } from '../../contexts/IntlContext';

export const useIntl = () => {
  const intl = useContext(IntlContext);

  const t = (path: string, values?: Record<string, string | number>) => {
    let message = intl.messages[path];
    if (!message) return path;
    if (!values) return message;

    for (const key in values) {
      message = message.replace(`{${key}}`, String(values[key]));
    }

    return message;
  };

  return { locale: intl.locale, setLocale: intl.setLocale, t };
};
