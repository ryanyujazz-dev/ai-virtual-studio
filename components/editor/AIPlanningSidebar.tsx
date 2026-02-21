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
    <div className="space-y-3">
      {/* Skeleton template cards */}
      {[1, 2, 3].map(i => (
        <motion.div
          key={i}
          className="bg-gradient-to-br from-white/5 to-white/3 border border-white/10 rounded-2xl p-5 animate-pulse"
        >
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex-shrink-0" />
            <div className="flex-1">
              <div className="h-5 bg-white/20 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-white/10 rounded w-full"></div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                <div className="h-6 w-16 bg-white/10 rounded-full"></div>
                <div className="h-6 w-20 bg-white/10 rounded-full"></div>
                <div className="h-6 w-16 bg-white/10 rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <aside className="w-80 bg-gradient-to-b from-purple-900/20 to-black/50 backdrop-blur-xl border-r border-white/10 h-full overflow-y-auto relative">
      {/* Gradient background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 -z-10" />

      <div className="space-y-8 p-6">
        {/* Header */}
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-20" />
            <Sparkles className="w-6 h-6 text-purple-400 relative z-10" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{t('ai.planning')}</h2>
        </motion.div>

        {/* Templates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-sm font-semibold text-white/50 mb-4 flex items-center">
            <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-2" />
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
                    className={`bg-gradient-to-br from-white/5 to-white/3 border border-white/10 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:from-white/8 hover:to-white/5 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/20 ${
                      selectedTemplate === template.id
                        ? 'bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/30 shadow-lg shadow-purple-500/20'
                        : ''
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl blur-lg opacity-0" />
                        <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 w-10 h-10 rounded-xl flex items-center justify-center">
                          <Lightbulb className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white mb-1">{template.name}</h4>
                        <p className="text-sm text-white/60 leading-relaxed">{template.description}</p>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {template.keywords.slice(0, 3).map((keyword) => (
                            <span
                              key={keyword}
                              className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full"
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
        </motion.div>

        {/* Keywords Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-white/50 mb-3 flex items-center">
            <div className="w-1 h-4 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-2" />
            {t('ai.keywords')}
          </h3>
          <textarea
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder={t('ai.keywordsPlaceholder')}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent resize-none transition-all duration-200 hover:bg-white/6"
            rows={3}
            disabled={isGenerating}
          />
        </motion.div>

        {/* Generate Button */}
        <motion.button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Pulsing effect */}
          {isGenerating && (
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          {/* Shine effect */}
          <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />

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
              className="space-y-4 mt-4"
            >
              <div className="relative">
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full rounded-full shadow-lg shadow-purple-500/30"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />
                </div>
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-full border border-white/20 opacity-50" />
              </div>
              <div className="text-center">
                <motion.p
                  className="text-sm text-purple-300 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {progress}% {t('ai.generating')}
                </motion.p>
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
              className="bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30 rounded-xl p-4 mt-4 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}