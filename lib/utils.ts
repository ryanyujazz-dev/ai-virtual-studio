import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRelativeTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return 'Just now';
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

// Calculate duration based on text length
export const calculateDuration = (text: string, language: 'zh' | 'en' = 'zh'): number => {
  if (language === 'zh') {
    // Chinese: ~0.33s per character
    return Math.ceil(text.length * 0.33);
  } else {
    // English: ~0.12s per character
    return Math.ceil(text.length * 0.12);
  }
};

// Format seconds to MM:SS format
export const formatDuration = (text: string, language: 'zh' | 'en' = 'zh'): string => {
  const seconds = calculateDuration(text, language);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

// Generate random ID
export const generateId = () => {
  return `_${Math.random().toString(36).substr(2, 9)}`;
};
