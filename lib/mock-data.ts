import { Project } from '../store/types';

// Helper function to generate a unique ID
const generateId = () => `id_${Math.random().toString(36).substr(2, 9)}`;

// Helper function to generate a request ID (UUID-like)
const generateRequestId = () => `req_${Math.random().toString(36).substr(2, 9)}`;

// Helper function to generate a date in ISO format, offset by days/hours
const generateDate = (options: { daysAgo?: number; hoursAgo?: number } = {}): string => {
  const now = new Date();
  const { daysAgo = 0, hoursAgo = 0 } = options;
  const date = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000) - (hoursAgo * 60 * 60 * 1000));
  return date.toISOString();
};

// Mock image URLs - using Unsplash placeholder images
const mockImages = {
  suspense: [
    'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&q=80',
  ],
  wander: [
    'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&q=80',
    'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?w=800&q=80',
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80',
  ],
  tech: [
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80',
    'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=800&q=80',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80',
  ]
};

// Create a take object
const createTake = (type: 'image' | 'video', url: string, isStarred: boolean, daysAgo: number) => ({
  id: generateId(),
  request_id: generateRequestId(),
  type,
  url,
  is_starred: isStarred,
  created_at: generateDate({ daysAgo }),
});

// Create a scene object
const createScene = (order: number, voiceover: string, visualPrompt: string, duration: number, takes: any[]) => ({
  id: generateId(),
  order,
  voiceover,
  visual_prompt: visualPrompt,
  duration,
  takes,
  selected_take_id: takes.find(take => take.is_starred)?.id,
});

// Enhanced projects data following the Project interface
export const enhancedProjects: Project[] = [
  // Template 1: Suspense Explanation (悬疑解说模板) - Completed
  {
    id: 'template_suspense',
    name: '悬疑解说模板',
    ratio: '16:9',
    script: {
      scenes: [
        createScene(
          1,
          '在一个雨夜，侦探接到了一通神秘电话...',
          '雨夜中的侦探办公室，窗外闪电，桌上散落的文件',
          8,
          [
            createTake('image', mockImages.suspense[0], true, 1),
            createTake('image', mockImages.suspense[1], false, 1),
          ]
        ),
        createScene(
          2,
          '线索指向一家废弃的工厂，那里隐藏着不为人知的秘密',
          '月光下的废弃工厂，破碎的窗户，杂草丛生',
          10,
          [
            createTake('image', mockImages.suspense[2], true, 1),
          ]
        ),
      ],
    },
    scenes: [], // Will be populated below
    created_at: generateDate({ daysAgo: 5 }),
    updated_at: generateDate({ hoursAgo: 2 }),
  },
  // Template 2: Space Wander (空间漫游模板) - Completed
  {
    id: 'template_wander',
    name: '空间漫游模板',
    ratio: '16:9',
    script: {
      scenes: [
        createScene(
          1,
          '欢迎来到未来城市，这里的一切都充满科技感',
          '未来城市天际线，飞行汽车穿梭，霓虹灯闪烁',
          12,
          [
            createTake('image', mockImages.wander[0], true, 2),
            createTake('image', mockImages.wander[1], false, 2),
          ]
        ),
        createScene(
          2,
          '让我们走进这座建筑，感受内部的设计之美',
          '现代建筑内部，流线型设计，光影交错',
          9,
          [
            createTake('image', mockImages.wander[2], true, 2),
          ]
        ),
      ],
    },
    scenes: [],
    created_at: generateDate({ daysAgo: 4 }),
    updated_at: generateDate({ hoursAgo: 5 }),
  },
  // Template 3: Tech Promotion (科技宣传模板) - Completed
  {
    id: 'template_tech',
    name: '科技宣传模板',
    ratio: '16:9',
    script: {
      scenes: [
        createScene(
          1,
          '这款新产品将彻底改变我们的生活',
          '科技产品特写，简约设计，灯光效果',
          7,
          [
            createTake('image', mockImages.tech[0], true, 3),
            createTake('video', 'https://example.com/video1.mp4', false, 3),
          ]
        ),
        createScene(
          2,
          '它拥有多项创新技术，为用户带来极致体验',
          '产品使用场景，人们在各种环境中使用',
          11,
          [
            createTake('image', mockImages.tech[1], true, 3),
            createTake('image', mockImages.tech[2], false, 3),
          ]
        ),
      ],
    },
    scenes: [],
    created_at: generateDate({ daysAgo: 3 }),
    updated_at: generateDate({ hoursAgo: 1 }),
  },
  // Draft project (no scenes)
  {
    id: 'project_draft_1',
    name: '城市夜景漫游',
    ratio: '16:9',
    script: { scenes: [] },
    scenes: [],
    created_at: generateDate({ daysAgo: 2 }),
    updated_at: generateDate({ daysAgo: 2 }),
  },
  // Draft project (no scenes, vertical)
  {
    id: 'project_draft_2',
    name: '短视频美食日记',
    ratio: '9:16',
    script: { scenes: [] },
    scenes: [],
    created_at: generateDate({ daysAgo: 1 }),
    updated_at: generateDate({ hoursAgo: 12 }),
  },
  // Rendering project (has scenes but no starred takes)
  {
    id: 'project_rendering_1',
    name: '自然风光纪录片',
    ratio: '16:9',
    script: {
      scenes: [
        createScene(
          1,
          '清晨的第一缕阳光洒在山巅',
          '日出山脉，金色阳光，薄雾缭绕',
          8,
          [
            createTake('image', mockImages.default[0], false, 1),
            createTake('image', mockImages.default[1], false, 1),
          ]
        ),
        createScene(
          2,
          '瀑布从高处倾泻而下，气势磅礴',
          '瀑布全景，水花四溅，绿色植被',
          10,
          [
            createTake('image', mockImages.default[2], false, 1),
          ]
        ),
      ],
    },
    scenes: [],
    created_at: generateDate({ daysAgo: 3 }),
    updated_at: generateDate({ hoursAgo: 3 }),
  },
  // Completed project (all scenes have starred takes)
  {
    id: 'project_completed_1',
    name: '产品发布会回顾',
    ratio: '16:9',
    script: {
      scenes: [
        createScene(
          1,
          '欢迎各位参加我们的新产品发布会',
          '发布会现场，观众席，舞台灯光',
          6,
          [
            createTake('image', mockImages.tech[0], true, 5),
            createTake('video', 'https://example.com/video2.mp4', false, 5),
          ]
        ),
        createScene(
          2,
          '这款产品代表了未来科技的发展方向',
          '产品展示，CEO讲解，大屏幕演示',
          9,
          [
            createTake('image', mockImages.tech[1], true, 5),
            createTake('image', mockImages.tech[2], false, 5),
          ]
        ),
        createScene(
          3,
          '感谢大家的参与，我们期待与您共创未来',
          '观众鼓掌，团队合影，结束画面',
          5,
          [
            createTake('image', mockImages.default[0], true, 5),
          ]
        ),
      ],
    },
    scenes: [],
    created_at: generateDate({ daysAgo: 7 }),
    updated_at: generateDate({ daysAgo: 1 }),
  },
  // Square ratio project (completed)
  {
    id: 'project_square_1',
    name: '艺术摄影集',
    ratio: '1:1',
    script: {
      scenes: [
        createScene(
          1,
          '每一张照片都是一个故事',
          '黑白摄影作品，光影对比',
          5,
          [
            createTake('image', mockImages.default[1], true, 2),
          ]
        ),
      ],
    },
    scenes: [],
    created_at: generateDate({ daysAgo: 4 }),
    updated_at: generateDate({ hoursAgo: 6 }),
  },
];

// Populate the scenes array for each project (alias of script.scenes)
enhancedProjects.forEach(project => {
  project.scenes = project.script.scenes;
});

// Initialize function for enhanced projects
export const initializeEnhancedProjects = (setProjects: (projects: Project[]) => void) => {
  setProjects(enhancedProjects);
};

// Backward compatibility (optional)
export const mockProjects: any[] = [];
export const initializeMockData = (setProjects: (projects: any[]) => void) => {
  console.warn('initializeMockData is deprecated, use initializeEnhancedProjects instead');
  initializeEnhancedProjects(setProjects as (projects: Project[]) => void);
};