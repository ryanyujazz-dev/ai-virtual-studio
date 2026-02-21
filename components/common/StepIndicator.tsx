'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  completed: boolean;
  title: string;
}

export function StepIndicator({ completed, title }: StepIndicatorProps) {
  return (
    <motion.div
      className="flex items-center space-x-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.1 }}
    >
      <div
        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
          completed
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent shadow-lg shadow-purple-500/30'
            : 'border-white/30 bg-transparent'
        }`}
      >
        {completed && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Check className="w-5 h-5 text-white" />
          </motion.div>
        )}
      </div>
      <span
        className={`text-sm font-medium transition-colors duration-300 ${
          completed
            ? 'text-purple-400'
            : 'text-white/50'
        }`}
      >
        {title}
      </span>
    </motion.div>
  );
}