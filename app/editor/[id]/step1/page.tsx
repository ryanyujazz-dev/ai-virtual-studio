'use client';

import React, { useEffect } from 'react';
import { useProjectStore } from '../../../../store/projectStore';
import { AIPlanningSidebar } from '../../../../components/editor/AIPlanningSidebar';
import { ScriptEditor } from '../../../../components/editor/ScriptEditor';
import { useTranslation } from '../../../../lib/useTranslation';

export default function ScriptRoomPage() {
  const { t } = useTranslation();
  const { enhancedProjects, createEnhancedProject } = useProjectStore();

  // Create a new project if none exists
  useEffect(() => {
    if (enhancedProjects.length === 0) {
      createEnhancedProject('新项目', '16:9');
    }
  }, [enhancedProjects, createEnhancedProject]);

  return (
    <div className="flex h-full">
      {/* AI Planning Sidebar */}
      <AIPlanningSidebar />

      {/* Script Editor */}
      <ScriptEditor />
    </div>
  );
}