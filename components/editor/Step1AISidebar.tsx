'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

type TemplateType = '悬疑解说' | '空间漫游' | '科技宣传';

export function Step1AISidebar() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('悬疑解说');
  const [keywords, setKeywords] = useState('');

  const templates: TemplateType[] = ['悬疑解说', '空间漫游', '科技宣传'];

  const handleTemplateSelect = (template: TemplateType) => {
    setSelectedTemplate(template);
  };

  const handleGenerate = () => {
    // Skeleton implementation - will be connected to AI generation later
    console.log('Generate script with:', { selectedTemplate, keywords });
  };

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
          <h2 className="text-xl font-bold text-white tracking-tight">AI 策划侧边栏</h2>
        </motion.div>

        {/* Template Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-sm font-semibold text-white/50 mb-3">预设模板</h3>
          <div className="flex space-x-8 text-sm font-light">
            {templates.map((template) => (
              <button
                key={template}
                onClick={() => handleTemplateSelect(template)}
                className={`hover:text-white transition-colors pb-1 ${
                  selectedTemplate === template ? 'text-white border-b border-white' : 'text-white/40'
                }`}
              >
                {template}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Keywords Input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-sm font-semibold text-white/50 mb-3">关键词输入</h3>
          <textarea
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="输入关键词，用逗号分隔"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400/50 focus:border-transparent resize-none transition-all duration-200 hover:bg-white/6"
            rows={3}
          />
        </motion.div>

        {/* Generate Button */}
        <motion.button
          onClick={handleGenerate}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-8 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity" />
          <Sparkles className="w-5 h-5" />
          <span>生成剧本</span>
        </motion.button>
      </div>
    </aside>
  );
}