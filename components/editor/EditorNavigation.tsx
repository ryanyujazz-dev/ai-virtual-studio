'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useProjectStore } from '../../store/projectStore';
import { useTranslation } from '../../lib/useTranslation';
import { Check, Circle } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  description: string;
  completed: boolean;
}

export function EditorNavigation() {
  const { enhancedProjects } = useProjectStore();
  const { t } = useTranslation();

  // Get current project (assuming it's the first one for now)
  const currentProject = enhancedProjects[0];

  const steps: Step[] = [
    {
      id: 1,
      name: t('script.title'),
      description: t('script.description'),
      completed: currentProject?.script.scenes.length > 0,
    },
    {
      id: 2,
      name: t('scene.title'),
      description: t('scene.description'),
      completed: currentProject?.scenes.some(scene => scene.takes.length > 0),
    },
    {
      id: 3,
      name: t('final.title'),
      description: t('final.description'),
      completed: currentProject?.scenes.every(scene => scene.selected_take_id),
    },
  ];

  return (
    <nav className="w-full bg-black/50 backdrop-blur-sm border-b border-white/10 px-8 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-white/60">
            <span>{t('editor.project')}</span>
            <span>/</span>
            <span className="text-white">{currentProject?.name || 'New Project'}</span>
          </div>

          {/* Step Navigation */}
          <div className="flex items-center space-x-8">
            {steps.map((step, index) => (
              <React.Fragment key={step.id}>
                <div className="flex items-center space-x-4">
                  {/* Step Circle */}
                  <motion.div
                    className={`relative ${
                      index < steps.length - 1 ? 'w-8' : 'w-6'
                    } h-8 flex items-center justify-center`}
                    initial={false}
                  >
                    {step.completed ? (
                      <motion.div
                        className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      >
                        <Check className="w-3 h-3 text-white" />
                      </motion.div>
                    ) : (
                      <motion.div
                        className="w-6 h-6 border-2 border-white/30 rounded-full"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      >
                        <Circle className="w-3 h-3 text-white/30" />
                      </motion.div>
                    )}

                    {/* Connecting Line */}
                    {index < steps.length - 1 && (
                      <motion.div
                        className="absolute right-0 top-4 w-8 h-0.5 bg-white/20"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                      />
                    )}
                  </motion.div>

                  {/* Step Info */}
                  <div className="flex flex-col">
                    <motion.span
                      className={`font-medium ${
                        step.completed ? 'text-green-400' : 'text-white/80'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {step.name}
                    </motion.span>
                    <motion.span
                      className="text-xs text-white/40"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.1 }}
                    >
                      {step.description}
                    </motion.span>
                  </div>
                </div>

                {/* Spacer */}
                {index < steps.length - 1 && (
                  <div className="w-8" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}