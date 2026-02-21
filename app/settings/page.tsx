'use client';

import { Language } from '../../store/languageStore';
import { useTranslation } from '../../lib/useTranslation';
import { ChevronRight, ArrowBack } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '../../components/dashboard/Header';

export default function SettingsPage() {
  const { language: currentLanguage, setLanguage, t } = useTranslation();
  const router = useRouter();

  const languages: { value: Language; label: string }[] = [
    { value: 'en', label: t('settings.languageEnglish') },
    { value: 'zh', label: t('settings.languageChinese') },
  ];

  return (
    <div className="w-full h-full min-h-screen bg-black text-white">
      <Header />

      <main className="max-w-2xl mx-auto pt-32 pb-12 px-12">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={() => router.back()}
            className="flex items-center text-white/50 hover:text-white transition-colors group"
          >
            <ArrowBack className="mr-2 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-light">{t('settings.back')}</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <h1 className="text-4xl font-light text-white tracking-tight mb-2">
            {t('settings.title')}
          </h1>
          <p className="text-white/40 font-light text-lg mb-12">{t('settings.description')}</p>
        </motion.div>

        <motion.div
          className="bg-zinc-900 border border-white/10 rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="text-sm font-medium text-white/80">{t('settings.language')}</h2>
          </div>

          {languages.map((lang, index) => (
            <button
              key={lang.value}
              onClick={() => setLanguage(lang.value)}
              className={`w-full px-6 py-4 flex items-center justify-between hover:bg-zinc-800 transition-colors ${
                index !== languages.length - 1 ? 'border-b border-white/5' : ''
              }`}
            >
              <span className="text-white">{lang.label}</span>
              <div className="flex items-center">
                {currentLanguage === lang.value && (
                  <span className="w-2 h-2 rounded-full bg-white mr-2" />
                )}
                <ChevronRight className="text-white/40" />
              </div>
            </button>
          ))}
        </motion.div>
      </main>
    </div>
  );
}
