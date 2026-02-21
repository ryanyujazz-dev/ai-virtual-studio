'use client';

import { useTranslation } from '../../lib/useTranslation';
import Header from '../../components/dashboard/Header';
import { motion } from 'framer-motion';
import { Film, Clock, Star } from 'lucide-react';

// Mock template data
const mockTemplates = [
  {
    id: '1',
    name: 'Suspense Thriller',
    description: 'Create tension and mystery with dramatic pacing',
    category: 'suspense' as const,
    duration: '2-3 min',
    scenes: 5,
  },
  {
    id: '2',
    name: 'Urban Wander',
    description: 'Explore cityscapes with smooth transitions',
    category: 'wander' as const,
    duration: '1-2 min',
    scenes: 3,
  },
  {
    id: '3',
    name: 'Science Explainer',
    description: 'Break down complex concepts with visual metaphors',
    category: 'science' as const,
    duration: '3-4 min',
    scenes: 6,
  },
  {
    id: '4',
    name: 'Product Showcase',
    description: 'Highlight features with dynamic camera movements',
    category: 'wander' as const,
    duration: '1-2 min',
    scenes: 4,
  },
];

export default function TemplatesPage() {
  const { t } = useTranslation();

  return (
    <div className="w-full h-full min-h-screen bg-zinc-950 text-white">
      <Header />

      <main className="max-w-6xl mx-auto pt-32 pb-12 px-12">
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-4xl font-light text-white tracking-tight mb-2">
            AI Templates
          </h1>
          <p className="text-white/40 font-light text-lg">
            Choose a template to kickstart your video creation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden hover:border-zinc-700 transition-colors cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center">
                    <Film className="w-6 h-6 text-white/70" />
                  </div>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-zinc-800 text-white/60">
                    {template.category}
                  </span>
                </div>

                <h3 className="text-xl font-medium text-white mb-2">
                  {template.name}
                </h3>
                <p className="text-white/50 text-sm mb-6">
                  {template.description}
                </p>

                <div className="flex items-center justify-between text-sm text-white/40">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{template.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Film className="w-4 h-4" />
                      <span>{template.scenes} scenes</span>
                    </div>
                  </div>
                  <button className="text-white hover:text-white/80 transition-colors">
                    <Star className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="px-6 py-4 bg-zinc-950/50 border-t border-zinc-800">
                <button className="w-full bg-white text-black font-medium py-2.5 rounded-lg hover:bg-gray-200 transition-colors">
                  Use Template
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 pt-8 border-t border-zinc-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <h2 className="text-xl font-medium text-white mb-4">How to use templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5">
              <div className="text-2xl font-light text-white/30 mb-2">1</div>
              <h3 className="font-medium text-white mb-2">Select a template</h3>
              <p className="text-white/50 text-sm">
                Choose from our curated collection of AI‑powered video templates.
              </p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5">
              <div className="text-2xl font-light text-white/30 mb-2">2</div>
              <h3 className="font-medium text-white mb-2">Customize with AI</h3>
              <p className="text-white/50 text-sm">
                Adjust the script, scenes, and visual style using AI suggestions.
              </p>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5">
              <div className="text-2xl font-light text-white/30 mb-2">3</div>
              <h3 className="font-medium text-white mb-2">Generate & export</h3>
              <p className="text-white/50 text-sm">
                Render your video and export in multiple formats and resolutions.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}