import type { AITemplate, AIGenerationRequest, AIGenerationResponse, Scene } from '../store/types';

// AI Template Library
export const aiTemplates: AITemplate[] = [
  {
    id: 'suspense-template',
    name: '悬疑模板',
    description: '紧张刺激的悬疑剧情',
    category: 'suspense',
    keywords: ['悬疑', '犯罪', '侦探', '神秘', '紧张'],
    scenes: [
      {
        voiceover: '深夜的雨巷，一个身影悄然出现...',
        visual_prompt: '雨夜小巷，昏黄路灯下的人影',
        duration: 3,
        takes: [],
        selected_take_id: undefined,
      },
      {
        voiceover: '脚步声越来越近，我的心跳加速...',
        visual_prompt: '第一视角快速行走，镜头摇晃',
        duration: 2,
        takes: [],
        selected_take_id: undefined,
      },
      {
        voiceover: '突然，一只手从背后搭上我的肩膀...',
        visual_prompt: '惊悚特写，手部突然出现',
        duration: 4,
        takes: [],
        selected_take_id: undefined,
      },
    ],
  },
  {
    id: 'wander-template',
    name: '漫游模板',
    description: '探索美好的风景',
    category: 'wander',
    keywords: ['旅行', '风景', '自然', '放松', '治愈'],
    scenes: [
      {
        voiceover: '清晨的第一缕阳光洒在山顶...',
        visual_prompt: '日出时分，山顶全景，云雾缭绕',
        duration: 5,
        takes: [],
        selected_take_id: undefined,
      },
      {
        voiceover: '沿着蜿蜒的小路漫步，感受大自然的呼吸...',
        visual_prompt: '第一人称视角行走，道路两旁绿树成荫',
        duration: 6,
        takes: [],
        selected_take_id: undefined,
      },
      {
        voiceover: '到达湖边，平静的水面倒映着蓝天白云...',
        visual_prompt: '宁静湖泊，水面倒影，微风吹过',
        duration: 4,
        takes: [],
        selected_take_id: undefined,
      },
    ],
  },
  {
    id: 'science-template',
    name: '科普模板',
    description: '有趣的科学知识',
    category: 'science',
    keywords: ['科技', '未来', '创新', '知识', '探索'],
    scenes: [
      {
        voiceover: '在不久的将来，人工智能将改变我们的生活...',
        visual_prompt: '未来城市，科技感十足的建筑',
        duration: 4,
        takes: [],
        selected_take_id: undefined,
      },
      {
        voiceover: '通过量子计算，我们能够解决世界上最复杂的问题...',
        visual_prompt: '数据流可视化，粒子特效',
        duration: 5,
        takes: [],
        selected_take_id: undefined,
      },
      {
        voiceover: '让我们一起探索科技的无限可能...',
        visual_prompt: '星空背景，科技元素汇聚',
        duration: 3,
        takes: [],
        selected_take_id: undefined,
      },
    ],
  },
];

// Mock AI generation with delay
export const generateScript = async (request: AIGenerationRequest): Promise<AIGenerationResponse> => {
  return new Promise((resolve) => {
    // Simulate network delay
    const delay = Math.random() * 1000 + 1000; // 1-2 seconds

    setTimeout(() => {
      // Find best matching template
      let selectedTemplate = aiTemplates[0]; // Default to suspense

      if (request.template) {
        // Use specified template
        selectedTemplate = aiTemplates.find(t => t.id === request.template!) || aiTemplates[0];
      } else if (request.keywords) {
        // Find template based on keyword matching
        const keywordLower = request.keywords.toLowerCase();
        const scoredTemplates = aiTemplates.map(template => {
          const matchCount = template.keywords.filter(keyword =>
            keywordLower.includes(keyword.toLowerCase())
          ).length;
          return { template, score: matchCount };
        });

        // Select template with highest score
        scoredTemplates.sort((a, b) => b.score - a.score);
        if (scoredTemplates[0].score > 0) {
          selectedTemplate = scoredTemplates[0].template;
        }
      }

      // Generate scenes with unique IDs
      const scenes: Scene[] = selectedTemplate.scenes.map((scene, index) => ({
        ...scene,
        id: `scene_${Date.now()}_${index}`,
        order: index + 1,
        takes: [],
        selected_take_id: undefined,
      }));

      // Calculate total duration
      const totalDuration = scenes.reduce((sum, scene) => sum + scene.duration, 0);

      resolve({
        success: true,
        script: { scenes },
        duration: totalDuration,
        message: '脚本生成成功！',
      });
    }, delay);
  });
};

// Get available templates
export const getTemplates = () => aiTemplates;

// Get template by ID
export const getTemplateById = (id: string) => aiTemplates.find(t => t.id === id);