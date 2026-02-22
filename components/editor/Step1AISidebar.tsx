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
    <aside className="w-80 bg-zinc-900 border-r border-zinc-800 h-full overflow-y-auto">
      <div className="space-y-8 p-6">
        {/* Header */}
        <motion.div
          className="flex items-center space-x-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <Sparkles className="w-6 h-6 text-zinc-300" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">AI 策划侧边栏</h2>
        </motion.div>

        {/* Template Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-sm font-semibold text-zinc-400 mb-3">预设模板</h3>
          <div className="flex space-x-8 text-sm font-light">
            {templates.map((template) => (
              <button
                key={template}
                onClick={() => handleTemplateSelect(template)}
                className={`hover:text-zinc-100 transition-colors pb-1 ${
                  selectedTemplate === template ? 'text-white border-b border-zinc-300' : 'text-zinc-500'
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
          <h3 className="text-sm font-semibold text-zinc-400 mb-3">关键词输入</h3>
          <textarea
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="输入关键词，用逗号分隔"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent resize-none transition-all duration-200 hover:bg-zinc-750"
            rows={3}
          />
        </motion.div>

        {/* Generate Button */}
        <motion.button
          onClick={handleGenerate}
          className="w-full bg-white text-black font-semibold py-3 px-8 rounded-lg hover:bg-zinc-100 transition-all duration-300 flex items-center justify-center space-x-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Sparkles className="w-5 h-5" />
          <span>生成剧本</span>
        </motion.button>
      </div>
    </aside>
  );
}