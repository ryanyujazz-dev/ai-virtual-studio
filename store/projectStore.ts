import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type {
  Project,
  ProjectRatio,
  ProjectStatus,
  Scene,
  Script,
  MockProject
} from './types';
import type { AITemplate } from './types';
import { calculateDuration } from '../lib/utils';

export type FilterType = 'all' | 'drafts' | 'rendering' | 'completed';

interface ProjectStore {
  // For backward compatibility
  mockProjects: MockProject[];
  filter: FilterType;

  // New enhanced data structure
  enhancedProjects: Project[];

  // Actions
  setMockProjects: (projects: MockProject[]) => void;
  setEnhancedProjects: (projects: Project[]) => void;
  setFilter: (filter: FilterType) => void;
  createMockProject: (name: string, ratio: ProjectRatio) => void;
  copyMockProject: (id: string) => void;
  deleteMockProject: (id: string) => void;

  // Enhanced project actions
  createEnhancedProject: (name: string, ratio: ProjectRatio) => Project;
  updateScript: (projectId: string, script: Script) => void;
  updateScene: (projectId: string, sceneId: string, updates: Partial<Scene>) => void;
  addScene: (projectId: string, scene: Omit<Scene, 'id'>) => void;
  deleteScene: (projectId: string, sceneId: string) => void;
  setSelectedTake: (projectId: string, sceneId: string, takeId: string) => void;
  getEnhancedProject: (id: string) => Project | undefined;
  updateProject: (projectId: string, updates: Partial<Project>) => void;
}

const generateId = () => uuidv4();

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      // Backward compatibility data
      mockProjects: [],
      filter: 'all',

      // Enhanced projects data
      enhancedProjects: [],

      // Backward compatibility actions
      setMockProjects: (projects) => set({ mockProjects: projects }),
      setEnhancedProjects: (projects) => set({ enhancedProjects: projects }),

      setFilter: (filter) => set({ filter }),

      createMockProject: (name, ratio) =>
        set((state) => ({
          mockProjects: [
            {
              id: generateId(),
              name,
              duration: '00:00',
              status: 'draft',
              ratio,
              updatedAt: new Date().toISOString(),
            },
            ...state.mockProjects,
          ],
        })),

      copyMockProject: (id) =>
        set((state) => {
          const project = state.mockProjects.find((p) => p.id === id);
          if (!project) return state;

          const copiedProject: MockProject = {
            ...project,
            id: generateId(),
            name: `${project.name} (Copy)`,
            thumbnail: undefined,
            status: 'draft',
            renderProgress: undefined,
            updatedAt: new Date().toISOString(),
          };

          return {
            mockProjects: [copiedProject, ...state.mockProjects],
          };
        }),

      deleteMockProject: (id) =>
        set((state) => ({
          mockProjects: state.mockProjects.filter((p) => p.id !== id),
        })),

      // Enhanced project actions
      createEnhancedProject: (name, ratio) => {
        const now = new Date().toISOString();
        const newProject: Project = {
          id: generateId(),
          name,
          ratio,
          script: { scenes: [] },
          scenes: [],
          created_at: now,
          updated_at: now,
        };

        set((state) => ({
          enhancedProjects: [newProject, ...state.enhancedProjects],
        }));

        return newProject;
      },

      updateScript: (projectId, script) =>
        set((state) => ({
          enhancedProjects: state.enhancedProjects.map((project) =>
            project.id === projectId
              ? { ...project, script, updated_at: new Date().toISOString() }
              : project
          ),
        })),

      updateScene: (projectId, sceneId, updates) =>
        set((state) => {
          const updatedProjects = state.enhancedProjects.map((project) => {
            if (project.id === projectId) {
              const updatedScenes = project.scenes.map((scene) =>
                scene.id === sceneId
                  ? {
                      ...scene,
                      ...updates,
                      duration: updates.voiceover ? calculateDuration(updates.voiceover) : scene.duration
                    }
                  : scene
              );

              return {
                ...project,
                script: { scenes: updatedScenes },
                scenes: updatedScenes,
                updated_at: new Date().toISOString(),
              };
            }
            return project;
          });

          return { enhancedProjects: updatedProjects };
        }),

      addScene: (projectId, sceneData) =>
        set((state) => {
          const newScene: Scene = {
            ...sceneData,
            id: generateId(),
            takes: [],
            duration: calculateDuration(sceneData.voiceover),
          };

          const updatedProjects = state.enhancedProjects.map((project) => {
            if (project.id === projectId) {
              const updatedScenes = [...project.scenes, newScene];

              return {
                ...project,
                script: { scenes: updatedScenes },
                scenes: updatedScenes,
                updated_at: new Date().toISOString(),
              };
            }
            return project;
          });

          return { enhancedProjects: updatedProjects };
        }),

      deleteScene: (projectId, sceneId) =>
        set((state) => {
          const updatedProjects = state.enhancedProjects.map((project) => {
            if (project.id === projectId) {
              const updatedScenes = project.scenes.filter((scene) => scene.id !== sceneId);

              return {
                ...project,
                script: { scenes: updatedScenes },
                scenes: updatedScenes,
                updated_at: new Date().toISOString(),
              };
            }
            return project;
          });

          return { enhancedProjects: updatedProjects };
        }),

      setSelectedTake: (projectId, sceneId, takeId) =>
        set((state) => {
          const updatedProjects = state.enhancedProjects.map((project) => {
            if (project.id === projectId) {
              const updatedScenes = project.scenes.map((scene) =>
                scene.id === sceneId
                  ? { ...scene, selected_take_id: takeId }
                  : scene
              );

              return {
                ...project,
                script: { scenes: updatedScenes },
                scenes: updatedScenes,
                updated_at: new Date().toISOString(),
              };
            }
            return project;
          });

          return { enhancedProjects: updatedProjects };
        }),

      getEnhancedProject: (id) => get().enhancedProjects.find((p) => p.id === id),

      updateProject: (projectId, updates) =>
        set((state) => ({
          enhancedProjects: state.enhancedProjects.map((project) =>
            project.id === projectId
              ? { ...project, ...updates, updated_at: new Date().toISOString() }
              : project
          ),
        })),
    }),
    {
      name: 'project-storage',
    }
  )
);

// Selector for backward compatibility
export const useProjects = () => useProjectStore((state) => state.enhancedProjects);

// Additional selectors for convenience
export const useFilteredProjects = () =>
  useProjectStore((state) => {
    const { enhancedProjects, filter } = state;

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
  });