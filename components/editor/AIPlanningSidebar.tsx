'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjectStore } from '../../store/projectStore';
import { useTranslation } from '../../lib/useTranslation';
import { generateScript, getTemplates } from '../../lib/mock-ai';
import type { AIGenerationRequest } from '../../store/types';
import { Sparkles, Loader2, Lightbulb } from 'lucide-react';

interface AITemplate {
  id: string;
  name: string;
  description: string;
  category: string;
}

export function AIPlanningSidebar() {
  const { t } = useTranslation();
  const { enhancedProjects, createEnhancedProject, updateScript } = useProjectStore();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const currentProject = enhancedProjects[0];
  const templates = getTemplates();

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    setKeywords('');
  };

  const handleGenerate = async () => {
    if (!currentProject) {
      // Create new project if none exists
      const newProject = createEnhancedProject('New Project', '16:9');

      // Set up generation request
      const request: AIGenerationRequest = {
        template: selectedTemplate || undefined,
        keywords: keywords.trim() || undefined,
      };

      await performGeneration(request, newProject.id);
    } else {
      const request: AIGenerationRequest = {
        template: selectedTemplate || undefined,
        keywords: keywords.trim() || undefined,
      };

      await performGeneration(request, currentProject.id);
    }
  };

  const performGeneration = async (request: AIGenerationRequest, projectId: string) => {
    setIsGenerating(true);
    setError(null);
    setProgress(0);

    try {
      // Simulate progress jumps
      const progressIntervals = [
        setTimeout(() => setProgress(10), 200),
        setTimeout(() => setProgress(45), 600),
        setTimeout(() => setProgress(100), 1200),
      ];

      const result = await generateScript(request);

      // Clear intervals
      progressIntervals.forEach(clearTimeout);

      if (result.success) {
        updateScript(projectId, result.script);

        // Reset states
        setTimeout(() => {
          setIsGenerating(false);
          setProgress(0);
        }, 500);
      } else {
        setError(result.message);
        setIsGenerating(false);
      }
    } catch (err) {
      setError('生成失败，请重试');
      setIsGenerating(false);
    }
  };

  const generateSkeleton = () => (
    <div className="space-y-4">
      {/* Skeleton template cards */}
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white/5 rounded-lg p-4 animate-pulse">
          <div className="h-4 bg-white/20 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-white/10 rounded w-full"></div>
        </div>
      ))}
    </div>
  );

  return (
    <aside className="w-80 bg-black/50 backdrop-blur-sm border-r border-white/10 p-6 h-full overflow-y-auto">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Sparkles className="w-6 h-6 text-purple-400" />
          <h2 className="text-xl font-semibold text-white">{t('ai.planning')}</h2>
        </div>

        {/* Templates Section */}
        <div>
          <h3 className="text-sm font-medium text-white/60 mb-3">
            {t('ai.templates')}
          </h3>

          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {generateSkeleton()}
              </motion.div>
            ) : (
              <motion.div
                key="templates"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {templates.map((template) => (
                  <motion.div
                    key={template.id}
                    className={`bg-white/5 rounded-lg p-4 cursor-pointer transition-all hover:bg-white/10 ${
                      selectedTemplate === template.id ? 'ring-2 ring-purple-400/50' : ''
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-white">{template.name}</h4>
                        <p className="text-sm text-white/60 mt-1">{template.description}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {template.keywords.slice(0, 3).map((keyword) => (
                            <span
                              key={keyword}
                              className="text-xs bg-purple-400/20 text-purple-400 px-2 py-1 rounded-full"
                            >
                              {keyword}
                            </span>
                          ))}
                          {template.keywords.length > 3 && (
                            <span className="text-xs text-white/40">
                              +{template.keywords.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Keywords Input */}
        <div>
          <h3 className="text-sm font-medium text-white/60 mb-3">
            {t('ai.keywords')}
          </h3>
          <textarea
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder={t('ai.keywordsPlaceholder')}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent resize-none"
            rows={3}
            disabled={isGenerating}
          />
        </div>

        {/* Generate Button */}
        <motion.button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{t('ai.generating')}</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>{t('ai.generate')}</span>
            </>
          )}
        </motion.button>

        {/* Progress Bar */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="bg-gradient-to-r from-purple-400 to-pink-400 h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <div className="text-center text-sm text-white/60">
                {progress}% {t('ai.generating')}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-red-500/10 border border-red-500/30 rounded-lg p-3"
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}