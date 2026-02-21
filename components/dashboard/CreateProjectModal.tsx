'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useProjectStore } from '../../store/projectStore';
import { useTranslation } from '../../lib/useTranslation';
import { ProjectRatio } from '../../store/types';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ratios: ProjectRatio[] = ['16:9', '9:16', '1:1'];

export default function CreateProjectModal({ isOpen, onClose }: CreateProjectModalProps) {
  const { createEnhancedProject } = useProjectStore();
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [ratio, setRatio] = useState<ProjectRatio>('16:9');

  const handleCreate = () => {
    if (name.trim()) {
      createEnhancedProject(name.trim(), ratio);
      setName('');
      setRatio('16:9');
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <div
              className="bg-zinc-900 border border-white/10 rounded-lg p-8 w-full max-w-md pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-medium text-white">{t('modal.createTitle')}</h2>
                <button
                  onClick={onClose}
                  className="text-white/50 hover:text-white transition-colors"
                >
                  <X />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-white/60 mb-2">{t('modal.projectName')}</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('modal.projectNamePlaceholder')}
                    className="w-full bg-zinc-800 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors"
                    autoFocus
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-2">{t('modal.aspectRatio')}</label>
                  <div className="flex space-x-4">
                    {ratios.map((r) => (
                      <button
                        key={r}
                        onClick={() => setRatio(r)}
                        className={`flex-1 flex flex-col items-center p-4 rounded-lg border transition-all ${
                          ratio === r
                            ? 'bg-white/10 border-white/30'
                            : 'bg-zinc-800 border-white/10 hover:bg-zinc-700'
                        }`}
                      >
                        <div
                          className={`bg-zinc-700 mb-2 transition-all ${
                            ratio === r ? 'bg-white' : ''
                          }`}
                          style={{
                            width: r === '9:16' ? '24px' : r === '1:1' ? '32px' : '48px',
                            height: r === '16:9' ? '27px' : r === '1:1' ? '32px' : '42px',
                            borderRadius: '2px',
                          }}
                        />
                        <span className="text-sm text-white">{r}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleCreate}
                  disabled={!name.trim()}
                  className="w-full bg-white text-black font-medium py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('modal.createButton')}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
