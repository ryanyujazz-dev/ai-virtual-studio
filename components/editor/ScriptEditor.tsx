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
    <div className="flex-1 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-white tracking-tight">
              {t('script.title')}
            </h1>
            <p className="text-white/40 mt-2">{t('script.description')}</p>
          </div>
          <button
            onClick={handleAddScene}
            className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>{t('script.addScene')}</span>
          </button>
        </div>

        {/* Scenes List */}
        <div className="space-y-4">
          <AnimatePresence>
            {currentProjectData?.scenes.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Plus className="w-8 h-8 text-white/40" />
                </div>
                <h3 className="text-xl text-white/60 mb-2">{t('script.emptyTitle')}</h3>
                <p className="text-white/40">{t('script.emptyDescription')}</p>
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
                  <div className="space-y-4">
                    {currentProjectData?.scenes.map((scene, index) => (
                      <motion.div
                        key={scene.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.05 }}
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
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <button className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded-lg hover:bg-white/90 transition-colors mx-auto">
              <span>{t('script.nextStep')}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}