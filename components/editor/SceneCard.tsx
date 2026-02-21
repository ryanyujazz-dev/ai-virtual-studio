'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProjectStore } from '../../store/projectStore';
import { useTranslation } from '../../lib/useTranslation';
import { formatDuration } from '../../lib/utils';
import { Trash2, GripVertical } from 'lucide-react';

interface SceneCardProps {
  scene: {
    id: string;
    order: number;
    voiceover: string;
    visual_prompt: string;
    duration: number;
  };
  onDelete: (sceneId: string) => void;
}

export function SceneCard({ scene, onDelete }: SceneCardProps) {
  const { t } = useTranslation();
  const { updateScene, enhancedProjects } = useProjectStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempVoiceover, setTempVoiceover] = useState(scene.voiceover);
  const [tempVisualPrompt, setTempVisualPrompt] = useState(scene.visual_prompt);

  const handleSave = () => {
    // Get current project from store to pass projectId
    const currentProject = enhancedProjects[0];
    if (currentProject) {
      updateScene(currentProject.id, scene.id, {
        voiceover: tempVoiceover,
        visual_prompt: tempVisualPrompt,
      });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempVoiceover(scene.voiceover);
    setTempVisualPrompt(scene.visual_prompt);
    setIsEditing(false);
  };

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/8 transition-all duration-200"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Drag Handle */}
      <div className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100 cursor-grab">
        <GripVertical className="w-5 h-5 text-white" />
      </div>

      {/* Scene Number */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-white/60">
          {t('scene')} {scene.order}
        </span>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="text-white/40 hover:text-white transition-colors text-sm"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleSave}
                className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition-colors text-sm"
              >
                {t('common.save')}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="text-white/40 hover:text-white transition-colors text-sm"
              >
                {t('common.edit')}
              </button>
              <button
                onClick={() => onDelete(scene.id)}
                className="text-white/40 hover:text-red-400 transition-colors text-sm"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="text-sm text-white/60 mb-1 block">
              {t('scene.voiceover')}
            </label>
            <textarea
              value={tempVoiceover}
              onChange={(e) => setTempVoiceover(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent resize-none"
              rows={3}
              placeholder={t('scene.voiceoverPlaceholder')}
            />
            <div className="text-xs text-white/40 mt-1">
              {t('scene.duration')}: {formatDuration(tempVoiceover)}
            </div>
          </div>
          <div>
            <label className="text-sm text-white/60 mb-1 block">
              {t('scene.visualPrompt')}
            </label>
            <textarea
              value={tempVisualPrompt}
              onChange={(e) => setTempVisualPrompt(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent resize-none"
              rows={2}
              placeholder={t('scene.visualPromptPlaceholder')}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <div>
            <p className="text-white/80 leading-relaxed">{scene.voiceover}</p>
          </div>
          <div>
            <p className="text-sm text-white/50">
              {t('scene.visualPrompt')}: <span className="text-white/60">{scene.visual_prompt}</span>
            </p>
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <span className="text-xs text-white/40">
              {t('scene.duration')}: {formatDuration(scene.voiceover)}
            </span>
            <span className="text-xs text-white/40">
              {Math.round(scene.duration)}s
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
}