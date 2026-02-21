'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../store/languageStore';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProviderWrapper({
  children,
  initialLanguage = 'zh'
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [isClient, setIsClient] = useState(false);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Update localStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('language-storage');
        if (stored) {
          const parsed = JSON.parse(stored);
          parsed.state.language = lang;
          localStorage.setItem('language-storage', JSON.stringify(parsed));
        }
        // Also set cookie for server-side detection on next request
        document.cookie = `preferred-language=${lang}; path=/; max-age=${60 * 60 * 24 * 365}`; // 1 year
      } catch (e) {
        console.error('Failed to update language storage:', e);
      }
    }
  };

  // Mark as client and load saved language
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('language-storage');
        if (stored) {
          const parsed = JSON.parse(stored);
          const savedLanguage = parsed.state?.language as Language;
          // Only update if saved language differs from initial language
          // This handles the case where user changed language in another tab
          if (savedLanguage && savedLanguage !== initialLanguage) {
            setLanguageState(savedLanguage);
            // Also update cookie for consistency
            document.cookie = `preferred-language=${savedLanguage}; path=/; max-age=${60 * 60 * 24 * 365}`;
          }
        }
      } catch (e) {
        console.error('Failed to read language from storage:', e);
      }
    }
  }, [initialLanguage]);

  // Sync with Zustand store when language changes
  useEffect(() => {
    if (isClient) {
      try {
        const { setLanguage: zustandSetLanguage } = require('../store/languageStore').useLanguageStore.getState();
        zustandSetLanguage(language);
      } catch (e) {
        console.error('Failed to sync with Zustand:', e);
      }
    }
  }, [language, isClient]);

  // Update HTML lang attribute when language changes
  useEffect(() => {
    if (isClient && typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language, isClient]);

  const value = React.useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
}
