'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../store/languageStore';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');
  const [isMounted, setIsMounted] = useState(false);

  // Only read from localStorage after mount to avoid hydration mismatch
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('language-storage');
        if (stored) {
          const parsed = JSON.parse(stored);
          setLanguageState(parsed.state?.language || 'en');
        }
      } catch (e) {
        console.error('Failed to read language from storage:', e);
      }
      setIsMounted(true);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Update Zustand store for persistence
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem('language-storage');
        if (stored) {
          const parsed = JSON.parse(stored);
          parsed.state.language = lang;
          localStorage.setItem('language-storage', JSON.stringify(parsed));
        }
      } catch (e) {
        console.error('Failed to update language storage:', e);
      }
    }
  };

  // Use default language before mount to avoid SSR mismatch
  const displayLanguage = isMounted ? language : 'en';

  const value = React.useMemo(() => ({ language: displayLanguage, setLanguage }), [displayLanguage, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguageContext() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguageContext must be used within a LanguageProvider');
  }
  return context;
}
