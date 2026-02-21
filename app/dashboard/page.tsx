'use client';

import { useEffect, useMemo, useState } from 'react';
import { useProjectStore } from '../../store/projectStore';
import { initializeEnhancedProjects } from '../../lib/mock-data';
import { useTranslation } from '../../lib/useTranslation';
import Header from '../../components/dashboard/Header';
import FilterTabs from '../../components/dashboard/FilterTabs';
import ProjectCard from '../../components/dashboard/ProjectCard';
import CreateProjectModal from '../../components/dashboard/CreateProjectModal';
import FAB from '../../components/common/FAB';

export default function DashboardPage() {
  const { enhancedProjects, filter, setEnhancedProjects } = useProjectStore();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize mock data on first load
  useEffect(() => {
    if (enhancedProjects.length === 0) {
      initializeEnhancedProjects(setEnhancedProjects);
    }
  }, [enhancedProjects.length, setEnhancedProjects]);

  // Filter projects based on selected tab using the selector
  const filteredProjects = useMemo(() => {
    switch (filter) {
      case 'drafts':
        return enhancedProjects.filter((p) => p.script.scenes.length === 0);
      case 'rendering':
        return enhancedProjects.filter((p) =>
          p.script.scenes.length > 0 &&
          !p.script.scenes.every(scene => scene.selected_take_id)
        );
      case 'completed':
        return enhancedProjects.filter((p) =>
          p.script.scenes.length > 0 &&
          p.script.scenes.every(scene => scene.selected_take_id)
        );
      default:
        return enhancedProjects;
    }
  }, [enhancedProjects, filter]);

  return (
    <div className="w-full h-full min-h-screen bg-black text-white">
      <Header />

      <main className="w-full h-full pt-32 pb-12 px-12">
        <div className="flex items-end justify-between mb-16 max-w-[1920px] mx-auto">
          <div>
            <h2 className="text-5xl font-light text-white tracking-tight mb-2">{t('dashboard.title')}</h2>
            <p className="text-white/40 font-light text-lg">{t('dashboard.subtitle')}</p>
          </div>
          <FilterTabs />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16 max-w-[1920px] mx-auto pb-24">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center mb-4">
              <svg className="w-10 h-10 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
            </div>
            <h3 className="text-xl text-white mb-2">{t('empty.title')}</h3>
            <p className="text-white/40 mb-6">{t('empty.description')}</p>
          </div>
        )}
      </main>

      <FAB onClick={() => setIsModalOpen(true)} />
      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 0px;
          background: transparent;
        }
      `}</style>
    </div>
  );
}
