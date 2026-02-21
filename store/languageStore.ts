import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';

export type Language = 'en' | 'zh';

interface LanguageStore {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: 'zh',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'language-storage',
    }
  )
);

// Selector for language only with shallow comparison
export const useLanguage = () => useLanguageStore((state) => state.language);

// Translation type definitions
export type TranslationKey =
  // Header
  | 'app.name'
  | 'nav.projects'
  | 'nav.templates'
  | 'nav.assets'
  | 'nav.settings'
  // Dashboard
  | 'dashboard.title'
  | 'dashboard.subtitle'
  | 'filter.all'
  | 'filter.drafts'
  | 'filter.rendering'
  | 'filter.completed'
  | 'projectcard.duration'
  | 'projectcard.format'
  | 'empty.title'
  | 'empty.description'
  // Create Modal
  | 'modal.createTitle'
  | 'modal.projectName'
  | 'modal.projectNamePlaceholder'
  | 'modal.aspectRatio'
  | 'modal.createButton'
  | 'modal.disabledButton'
  // Settings
  | 'settings.title'
  | 'settings.back'
  | 'settings.description'
  | 'settings.language'
  | 'settings.languageEnglish'
  | 'settings.languageChinese'
  // Time
  | 'time.justNow'
  | 'time.minutesAgo'
  | 'time.hoursAgo'
  | 'time.yesterday'
  | 'time.daysAgo'
  // Status
  | 'status.draft'
  | 'status.rendering'
  | 'status.completed'
  // Editor
  | 'editor.project'
  | 'script.title'
  | 'script.description'
  | 'scene.title'
  | 'scene.description'
  | 'final.title'
  | 'final.description'
  // Script Editor
  | 'script.addScene'
  | 'script.emptyTitle'
  | 'script.emptyDescription'
  | 'script.nextStep'
  // Scene Editor
  | 'scene'
  | 'scene.voiceover'
  | 'scene.voiceoverPlaceholder'
  | 'scene.visualPrompt'
  | 'scene.visualPromptPlaceholder'
  | 'scene.duration'
  // AI Planning
  | 'ai.planning'
  | 'ai.templates'
  | 'ai.keywords'
  | 'ai.keywordsPlaceholder'
  | 'ai.generate'
  | 'ai.generating'
  // Common
  | 'common.edit'
  | 'common.save'
  | 'common.cancel';

export type Translations = Record<TranslationKey, string>;
