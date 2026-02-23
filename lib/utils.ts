import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Language } from '../store/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Calculate duration based on text length
export const calculateDuration = (text: string, lang: Language = 'zh'): number => {
  if (lang === 'zh') {
    // Chinese: ~0.33s per character
    return Math.ceil(text.length * 0.33);
  } else {
    // English: ~0.12s per character
    return Math.ceil(text.length * 0.12);
  }
};

// Format text to duration string (MM:SS) based on voiceover length
export const formatDuration = (text: string, lang: Language = 'zh'): string => {
  const seconds = calculateDuration(text, lang);
  return formatSecondsToDuration(seconds);
};

// Format seconds to MM:SS format
export const formatSecondsToDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Format relative time with i18n support
export const formatRelativeTime = (
  isoDate: string,
  language: Language = 'zh',
  translations?: {
    justNow: string;
    minutesAgo: string;
    hoursAgo: string;
    yesterday: string;
    daysAgo: string;
  }
): string => {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  // Use translations if provided, otherwise use fallback
  const t = translations || {
    justNow: language === 'zh' ? '刚刚' : 'Just now',
    minutesAgo: language === 'zh' ? '分钟前' : 'm ago',
    hoursAgo: language === 'zh' ? '小时前' : 'h ago',
    yesterday: language === 'zh' ? '昨天' : 'Yesterday',
    daysAgo: language === 'zh' ? '天前' : 'd ago',
  };

  if (diffMinutes < 1) return t.justNow;
  if (diffMinutes < 60) return `${diffMinutes}${t.minutesAgo}`;
  if (diffHours < 24) return `${diffHours}${t.hoursAgo}`;
  if (diffDays === 1) return t.yesterday;
  if (diffDays < 7) return `${diffDays}${t.daysAgo}`;
  return date.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US');
};

// Generate random ID (deprecated - use uuid instead)
export const generateId = () => {
  return `_${Math.random().toString(36).substr(2, 9)}`;
};
