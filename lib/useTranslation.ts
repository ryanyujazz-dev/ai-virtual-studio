import { useLanguageContext } from '../components/LanguageProviderWrapper';
import { getTranslation, Translations } from './translations';
import { useMemo } from 'react';
import type { TranslationKey } from '../store/languageStore';

export { useLanguageContext };

export function useTranslation() {
  const { language, setLanguage } = useLanguageContext();

  const t = (key: TranslationKey): string => {
    const translations = getTranslation(language);
    return translations[key] || key;
  };

  // Memoize t function to prevent unnecessary re-renders
  const translationHelper = useMemo(() => ({ t, language, setLanguage }), [t, language, setLanguage]);

  return translationHelper;
}

// Helper for conditional translations
export function useTranslations<K extends keyof Translations>(keys: K[]): Record<K, string> {
  const { t } = useTranslation();
  return keys.reduce((acc, key) => {
    acc[key] = t(key);
    return acc;
  }, {} as Record<K, string>);
}
