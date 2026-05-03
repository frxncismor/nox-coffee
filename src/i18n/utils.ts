import type { Locale, Translations } from './ui';
import { translations } from './ui';

export function useTranslations(locale: Locale): Translations {
  return translations[locale];
}

export function isLocale(value: string | undefined): value is Locale {
  return value === 'es' || value === 'en';
}
