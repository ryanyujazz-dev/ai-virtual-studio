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
      className="bg-gradient-to-br from-white/5 to-white/3 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:from-white/8 hover:to-white/5 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 relative overflow-hidden"
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Decorative border */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none" />

      {/* Drag Handle */}
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-grab transition-opacity">
        <div className="bg-black/50 backdrop-blur-sm rounded-lg p-2">
          <GripVertical className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Scene Number */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-4 py-2 rounded-full">
            场景 {scene.order}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <>
              <motion.button
                onClick={handleCancel}
                className="text-white/60 hover:text-white transition-colors text-sm px-3 py-1 rounded-lg hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('common.cancel')}
              </motion.button>
              <motion.button
                onClick={handleSave}
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('common.save')}
              </motion.button>
            </>
          ) : (
            <>
              <motion.button
                onClick={() => setIsEditing(true)}
                className="text-white/60 hover:text-white transition-colors text-sm px-3 py-1 rounded-lg hover:bg-white/10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {t('common.edit')}
              </motion.button>
              <motion.button
                onClick={() => onDelete(scene.id)}
                className="text-white/60 hover:text-red-400 hover:bg-red-500/10 transition-colors text-sm p-1 rounded-lg hover:bg-white/10"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Content */}
      {isEditing ? (
        <div className="space-y-6">
          <div>
            <label className="text-sm font-medium text-white/60 mb-2 flex items-center">
              <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-2" />
              {t('scene.voiceover')}
            </label>
            <textarea
              value={tempVoiceover}
              onChange={(e) => setTempVoiceover(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent resize-none transition-all duration-200 hover:bg-white/15"
              rows={3}
              placeholder={t('scene.voiceoverPlaceholder')}
            />
            <div className="text-xs text-white/50 mt-2">
              {t('scene.duration')}: {formatDuration(tempVoiceover)}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-white/60 mb-2 flex items-center">
              <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-2" />
              {t('scene.visualPrompt')}
            </label>
            <textarea
              value={tempVisualPrompt}
              onChange={(e) => setTempVisualPrompt(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent resize-none transition-all duration-200 hover:bg-white/15"
              rows={2}
              placeholder={t('scene.visualPromptPlaceholder')}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-white/80 leading-relaxed text-sm">{scene.voiceover}</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-white/60">{t('scene.visualPrompt')}</h4>
            <p className="text-white/60 text-sm leading-relaxed bg-white/5 rounded-xl p-4">
              {scene.visual_prompt || <span className="text-white/30">暂无视觉描述</span>}
            </p>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full" />
                <span className="text-xs text-white/40">
                  {t('scene.duration')}: {formatDuration(scene.voiceover)}
                </span>
              </div>
              <span className="text-xs text-white/40">
                | {Math.round(scene.duration)}s
              </span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}