'use client';

import React, { useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjectStore } from '../../store/projectStore';
import { useTranslation } from '../../lib/useTranslation';
import { SceneCard } from './SceneCard';
import { Plus, ChevronRight } from 'lucide-react';

export function ScriptEditor() {
  const { t } = useTranslation();
  const { enhancedProjects, addScene, deleteScene } = useProjectStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const currentProjectData = enhancedProjects[0];

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = currentProjectData?.scenes.findIndex(scene => scene.id === active.id);
      const newIndex = currentProjectData?.scenes.findIndex(scene => scene.id === over?.id);

      if (oldIndex !== undefined && newIndex !== undefined && currentProjectData) {
        // Update scenes order
        const scenes = arrayMove(currentProjectData.scenes, oldIndex, newIndex);

        // Update store
        addScene(currentProjectData.id, scenes[newIndex]);
      }
    }
  }, [currentProjectData, addScene]);

  const handleAddScene = () => {
    if (currentProjectData) {
      addScene(currentProjectData.id, {
        order: currentProjectData.scenes.length + 1,
        voiceover: '',
        visual_prompt: '',
        duration: 0,
        takes: [],
      });
    }
  };

  const handleDeleteScene = (sceneId: string) => {
    if (currentProjectData) {
      deleteScene(currentProjectData.id, sceneId);
    }
  };

  return (
    <div className="p-8 overflow-y-auto">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent tracking-tight">
              {t('script.title')}
            </h1>
            <p className="text-white/60 mt-3 text-lg">{t('script.description')}</p>
          </div>
          <motion.button
            onClick={handleAddScene}
            className="flex items-center space-x-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-purple-500/30 hover:scale-105"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            <span>{t('script.addScene')}</span>
          </motion.button>
        </motion.div>

        {/* Scenes List */}
        <div className="space-y-6">
          <AnimatePresence>
            {currentProjectData?.scenes.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-32"
              >
                <div className="relative">
                  {/* Decorative background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-50" />

                  {/* Icon container */}
                  <div className="relative bg-gradient-to-r from-purple-500 to-pink-500 w-32 h-32 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-purple-500/30">
                    <Plus className="w-12 h-12 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">开始创作</h3>
                <p className="text-white/50 max-w-md mx-auto text-lg">
                  点击"添加场景"按钮，开始您的AI视频创作之旅
                </p>
              </motion.div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={currentProjectData?.scenes.map(scene => scene.id) || []}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="grid grid-cols-1 gap-6">
                    {currentProjectData?.scenes.map((scene, index) => (
                      <motion.div
                        key={scene.id}
                        layout
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <SceneCard
                          scene={scene}
                          onDelete={handleDeleteScene}
                        />
                      </motion.div>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </AnimatePresence>
        </div>

        {/* Next Step Button */}
        {currentProjectData?.scenes.length > 0 && (
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <button className="flex items-center space-x-3 bg-white text-black font-semibold px-8 py-4 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 mx-auto">
              <span>{t('script.nextStep')}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}