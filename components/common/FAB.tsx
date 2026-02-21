'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface FABProps {
  onClick: () => void;
}

export default function FAB({ onClick }: FABProps) {
  return (
    <div className="fixed bottom-12 right-12 z-50">
      <motion.button
        onClick={onClick}
        className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center"
        style={{
          boxShadow: '0 10px 40px -10px rgba(255, 255, 255, 0.3)',
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        <motion.span
          initial={{ rotate: 0 }}
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          <Plus className="text-[32px]" />
        </motion.span>
      </motion.button>
    </div>
  );
}
