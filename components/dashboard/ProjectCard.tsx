'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useTranslation } from '../../lib/useTranslation';
import { useRouter } from 'next/navigation';
import { Project } from '../../store/types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const router = useRouter();
  const { t, language } = useTranslation();

  const handleClick = () => {
    // Navigate to editor page
    router.push(`/editor/${project.id}`);
  };

  const isVertical = project.ratio === '9:16';

  // Calculate status based on scenes and takes
  const sceneCount = project.script.scenes.length;
  const hasSelectedTakes = project.script.scenes.every(scene => scene.selected_take_id);

  // Calculate total duration from scenes
  const totalDuration = project.script.scenes.reduce((total, scene) => total + scene.duration, 0);
  const formatDuration = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getThumbnailUrl = (): string => {
    // Use the first take of the first scene if available
    if (project.scenes.length > 0 && project.scenes[0].takes.length > 0) {
      return project.scenes[0].takes[0].url;
    }
    // Fallback to a default placeholder
    return '/mock/default-thumbnail.svg';
  };

  const getStatusText = () => {
    if (sceneCount === 0) return t('status.draft');
    if (hasSelectedTakes) return t('status.completed');
    return t('status.rendering');
  };

  const formatTime = (isoDate: string): string => {
    const date = new Date(isoDate);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return t('time.justNow');
    if (diffMinutes < 60) return `${diffMinutes}${t('time.minutesAgo')}`;
    if (diffHours < 24) return `${diffHours}${t('time.hoursAgo')}`;
    if (diffDays === 1) return t('time.yesterday');
    if (diffDays < 7) return `${diffDays}${t('time.daysAgo')}`;
    return date.toLocaleDateString(language === 'zh' ? 'zh-CN' : 'en-US');
  };

  return (
    <motion.div
      className="project-card group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={handleClick}
    >
      <div className="aspect-[4/3] bg-zinc-900 mb-5 overflow-hidden relative rounded-sm">
        {!hasSelectedTakes && sceneCount > 0 ? (
          <>
            {/* Rendering state */}
            <div className="w-full h-full bg-gradient-to-br from-zinc-900/30 to-zinc-800/30 flex items-center justify-center">
              <div className="w-16 h-16 border-[2px] border-white/20 border-t-white rounded-full animate-spin mb-3" />
              <span className="text-xs font-mono text-white/80 uppercase tracking-widest">
                {t('status.rendering')} 0%
              </span>
            </div>
          </>
        ) : (
          <>
            {/* Normal state */}
            <motion.img
              alt="Thumbnail"
              className="project-card-image w-full h-full object-cover"
              src={getThumbnailUrl()}
              whileHover={{ scale: 1.03, opacity: 0.9 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
            <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Play className="text-white text-[28px]" />
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-normal text-white group-hover:underline decoration-1 underline-offset-4 decoration-white/30 mb-1">
            {project.name}
          </h3>
          <p className="text-white/40 text-xs font-light">
            {formatDuration(totalDuration)} • {getStatusText()}
            {project.ratio !== '16:9' && ` • ${project.ratio}`}
          </p>
        </div>
        <span className="text-white/30 text-xs font-light mt-1.5">
          {formatTime(project.updated_at)}
        </span>
      </div>

      <style jsx>{`
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      `}</style>
    </motion.div>
  );
}
