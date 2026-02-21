export type ProjectRatio = '16:9' | '9:16' | '1:1';
export type ProjectStatus = 'draft' | 'rendering' | 'completed';
export type TakeType = 'image' | 'video';
export type PerformanceLevel = 1 | 2 | 3;
export type Language = 'en' | 'zh';

// Take interface for Phase 1+ compatibility
export interface Take {
  id: string;
  request_id: string; // Required - UUID for idempotency
  type: TakeType;
  url: string; // Local blob URL or mock image path
  is_starred: boolean;
  created_at: string;
  device_id?: string; // Reserved for Phase 1 cross-device sync
  metadata?: {
    motion?: number;
    camera?: string;
  };
}

// Scene interface for the script workflow
export interface Scene {
  id: string;
  order: number;
  voiceover: string;
  visual_prompt: string;
  duration: number; // seconds
  takes: Take[];
  selected_take_id?: string; // The starred take ID
}

// Script interface containing all scenes
export interface Script {
  scenes: Scene[];
}

// Project interface with full data structure
export interface Project {
  id: string;
  name: string;
  ratio: ProjectRatio;
  script: Script;
  scenes: Scene[]; // Alias for script.scenes for compatibility
  performance_level?: PerformanceLevel; // Reserved for Phase 1
  created_at: string;
  updated_at: string;
}

// Mock project for backward compatibility
export interface MockProject {
  id: string;
  name: string;
  thumbnail?: string;
  duration: string;
  status: ProjectStatus;
  ratio?: ProjectRatio;
  renderProgress?: number;
  updatedAt: string;
}

// AI Template types
export interface AITemplate {
  id: string;
  name: string;
  description: string;
  category: 'suspense' | 'wander' | 'science';
  keywords: string[];
  scenes: Omit<Scene, 'id' | 'order'>[];
}

// AI Generation types
export interface AIGenerationRequest {
  template?: string;
  keywords?: string;
}

export interface AIGenerationResponse {
  success: boolean;
  script: Script;
  duration: number; // total duration in seconds
  message: string;
}