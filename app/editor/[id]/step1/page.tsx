'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProjectStore } from '../../../../store/projectStore';
import { useTranslation } from '../../../../lib/useTranslation';
import { ArrowLeft, Save, Image as ImageIcon, List, Grid, RefreshCcw, Sparkles } from 'lucide-react';
import { EditorHeader } from '../../../../components/editor/EditorHeader';

// Mock scene datasets for AI regeneration
const MOCK_SCENES_SET_A = [
  {
    id: 'scene-a1',
    order: 1,
    voiceover: '清晨的阳光透过落地窗洒进实验室，AI助手"晨曦"正在整理实验数据。',
    visual_prompt: '未来主义实验室，全息屏幕悬浮空中，AI助手以光粒形态呈现，窗外是晨曦中的未来城市天际线。',
    duration: 6,
    takes: []
  },
  {
    id: 'scene-a2',
    order: 2,
    voiceover: '研究人员走进实验室，与"晨曦"进行自然对话，讨论最新的研究发现。',
    visual_prompt: '研究人员与AI全息影像互动，手势操作数据流，实验室充满科技设备特写。',
    duration: 8,
    takes: []
  },
  {
    id: 'scene-a3',
    order: 3,
    voiceover: 'AI展示了一个突破性的算法可视化，复杂的数据转化为美丽的动态艺术。',
    visual_prompt: '全息投影中算法如星河般流动，研究人员惊叹表情特写，光影在脸上变幻。',
    duration: 12,
    takes: []
  }
];

const MOCK_SCENES_SET_B = [
  {
    id: 'scene-b1',
    order: 1,
    voiceover: '夜幕降临，未来城市的霓虹灯闪烁，AI系统"夜影"开始执行夜间维护任务。',
    visual_prompt: '城市夜景，无人机穿梭于摩天大楼之间，全息广告牌投射出动态信息流。',
    duration: 7,
    takes: []
  },
  {
    id: 'scene-b2',
    order: 2,
    voiceover: '在中央控制室，人类工程师与AI协同工作，监控整个城市的能源网络。',
    visual_prompt: '控制室内巨大的弧形屏幕显示着城市能源地图，工程师与AI全息界面交互。',
    duration: 9,
    takes: []
  },
  {
    id: 'scene-b3',
    order: 3,
    voiceover: 'AI预测到潜在的系统故障，提前启动应急预案，确保城市平稳运行。',
    visual_prompt: '数据流如瀑布般倾泻，预警信号闪烁，AI自动调度维修机器人前往现场。',
    duration: 10,
    takes: []
  },
  {
    id: 'scene-b4',
    order: 4,
    voiceover: '黎明时分，城市恢复宁静，AI生成夜间工作报告，准备迎接新的一天。',
    visual_prompt: '晨光中的城市天际线，报告全息投影缓缓旋转，象征人类与AI的完美协作。',
    duration: 5,
    takes: []
  }
];

// Simple Skeleton component mimicking shadcn/ui style
function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-zinc-800 rounded-md ${className}`} />
  );
}

export default function ScriptRoomPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { enhancedProjects, createEnhancedProject } = useProjectStore();

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/'); // 回退到首页
    }
  };

  const currentProject = enhancedProjects[0];

  const [displayedScenes, setDisplayedScenes] = useState(() => {
    const projectScenes = currentProject?.script?.scenes || currentProject?.scenes || [];
    return projectScenes.length > 0 ? projectScenes : MOCK_SCENES_SET_A;
  });

  // Create a new project if none exists
  useEffect(() => {
    if (enhancedProjects.length === 0) {
      createEnhancedProject('新项目', '16:9');
    }
  }, [enhancedProjects, createEnhancedProject]);

  // Total scenes and duration based on displayed scenes
  const totalScenes = displayedScenes.length;
  const totalDuration = displayedScenes.reduce((sum, scene) => sum + (scene.duration || 0), 0);

  // Format total duration as MM:SS
  const formatTotalDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Slider states
  const [rhythmValue, setRhythmValue] = React.useState(50);
  const [moodValue, setMoodValue] = React.useState(33);
  // Core prompt state
  const [corePrompt, setCorePrompt] = React.useState('展示未来城市中人工智能与人类和谐共生的场景，科技感十足，充满希望与创新氛围。');
  const corePromptLength = corePrompt.length;
  const maxCorePromptLength = 500;

  // AI Regeneration states
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [regenerationProgress, setRegenerationProgress] = useState(0);
  const [currentSceneSet, setCurrentSceneSet] = useState<'A' | 'B'>('A');

  // Effect for simulating regeneration progress
  useEffect(() => {
    if (!isRegenerating) {
      setRegenerationProgress(0);
      return;
    }

    const interval = setInterval(() => {
      setRegenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsRegenerating(false);
          // Switch scene set after completion
          const nextSet = currentSceneSet === 'A' ? 'B' : 'A';
          setCurrentSceneSet(nextSet);
          setDisplayedScenes(nextSet === 'A' ? MOCK_SCENES_SET_A : MOCK_SCENES_SET_B);
          return 100;
        }
        // Increment by random amount between 5 and 15 to simulate uneven progress
        const increment = Math.floor(Math.random() * 10) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 200); // Update every 200ms for smooth animation

    return () => clearInterval(interval);
  }, [isRegenerating, currentSceneSet]);


  const handleRegenerate = () => {
    setIsRegenerating(true);
    setRegenerationProgress(0);
  };

  return (
    <div className="min-h-screen w-full bg-zinc-950 flex flex-col text-white">
      {/* Top Navigation Bar - Parallel Workflow Header */}
      <EditorHeader
        projectName={currentProject?.name || '赛博朋克城市'}
        showSaveButton={true}
        onBack={handleBack}
      />

      {/* Main Content Area - Split Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - AI Planning (30%) */}
        <aside className="w-[30%] min-w-[320px] max-w-sm border-r border-zinc-800 p-6 overflow-y-auto">
          {/* Title Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">故事叙述</h2>
            <p className="text-zinc-500 text-sm leading-relaxed">
              通过AI策划，自动生成符合品牌调性的视频脚本。您可以通过调整风格、节奏和情绪等参数，精细化控制生成结果。
            </p>
          </div>

          {/* Style Template Select */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-zinc-300 mb-2">风格模板</label>
            <div className="relative">
              <select className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 appearance-none">
                <option>电影纪录片</option>
                <option>科技宣传片</option>
                <option>品牌广告片</option>
                <option>短视频快剪</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Core Prompt Textarea */}
          <div className="mb-8 relative">
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-medium text-zinc-300">核心提示词</label>
              <button className="absolute top-0 right-0 text-xs bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded-md transition-colors hover:bg-zinc-700 active:scale-95">
                ✨ Improve
              </button>
            </div>
            <textarea
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 resize-none"
              rows={6}
              placeholder="请输入视频的核心描述，例如：展示未来城市中人工智能与人类和谐共生的场景..."
              value={corePrompt}
              onChange={(e) => setCorePrompt(e.target.value)}
            />
            <div className={`text-right text-xs mt-2 ${corePromptLength > maxCorePromptLength ? 'text-red-500' : 'text-zinc-500'}`}>
              {corePromptLength}/{maxCorePromptLength}
            </div>
          </div>

          {/* Control Sliders */}
          <div className="space-y-8 mb-8">
            {/* Rhythm Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-zinc-300">节奏</label>
                <div className="text-xs text-zinc-500">
                  <span className="mr-4">慢</span>
                  <span>快</span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={rhythmValue}
                  onChange={(e) => setRhythmValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500"
                />
                <div className="absolute top-0 left-0 right-0 h-2 bg-zinc-800 rounded-full -z-10"></div>
                <div className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full -z-10" style={{ width: `${rhythmValue}%` }}></div>
              </div>
            </div>

            {/* Mood Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-zinc-300">情绪</label>
                <div className="text-xs text-zinc-500">
                  <span className="mr-4">轻松</span>
                  <span>深沉</span>
                </div>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={moodValue}
                  onChange={(e) => setMoodValue(parseInt(e.target.value))}
                  className="w-full h-2 bg-zinc-800 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-purple-500"
                />
                <div className="absolute top-0 left-0 right-0 h-2 bg-zinc-800 rounded-full -z-10"></div>
                <div className="absolute top-0 left-0 h-2 bg-purple-500 rounded-full -z-10" style={{ width: `${moodValue}%` }}></div>
              </div>
            </div>
          </div>

          {/* Regenerate Button */}
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className={`w-full border border-zinc-800 font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 ${
              isRegenerating
                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                : 'text-zinc-300 hover:bg-zinc-800'
            }`}
          >
            {isRegenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-zinc-600 border-t-zinc-300 rounded-full animate-spin"></div>
                <span>正在生成剧本... {regenerationProgress}%</span>
              </>
            ) : (
              <>
                <RefreshCcw className="w-4 h-4" />
                <span>重新生成场景</span>
              </>
            )}
          </button>
        </aside>

        {/* Right Editor Area - Scene Decomposition (70%) */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-white">场景分解</h2>
              <p className="text-zinc-500 text-sm mt-1">
                {totalScenes} Scenes • {formatTotalDuration(totalDuration)} Total
              </p>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                <List className="w-5 h-5 text-zinc-300" />
              </button>
              <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                <Grid className="w-5 h-5 text-zinc-300" />
              </button>
            </div>
          </div>

          {/* Scene List with Timeline */}
          <div className="relative">
            {/* Vertical Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-zinc-800"></div>

            {/* Scene Cards */}
            {isRegenerating ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="relative flex items-start space-x-6">
                    {/* Timeline Node Skeleton */}
                    <div className="relative z-10">
                      <Skeleton className="w-16 h-16 rounded-full" />
                    </div>
                    {/* Scene Content Skeleton */}
                    <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                      <Skeleton className="h-6 w-1/3 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-2/3 mb-6" />
                      <Skeleton className="h-6 w-1/4 mb-4" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-6" />
                      <Skeleton className="h-48 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {displayedScenes.map((scene, index) => (
                  <div key={scene.id} className="relative flex items-start space-x-6">
                    {/* Timeline Node */}
                    <div className="relative z-10">
                      <div className="w-16 h-16 rounded-full bg-zinc-900 border-4 border-zinc-800 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {(index + 1).toString().padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Scene Content */}
                    <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                      {/* Voiceover Section */}
                      <div className="mb-6">
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-sm font-medium text-zinc-400">旁白</span>
                          <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded">
                            {scene.duration || 0}s
                          </span>
                        </div>
                        <p className="text-white">{scene.voiceover}</p>
                      </div>

                      {/* Visual Description */}
                      <div className="mb-6">
                        <span className="text-sm font-medium text-zinc-400 mb-3 block">画面描述</span>
                        <p className="text-zinc-300">{scene.visual_prompt}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {/* Mock tags - could be extended with actual tags from scene data */}
                          <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">Midjourney v6</span>
                          <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">Cinematic</span>
                        </div>
                      </div>

                      {/* Image Placeholder */}
                      <div className="bg-zinc-800 border border-zinc-700 rounded-lg h-48 flex items-center justify-center">
                        <ImageIcon className="w-12 h-12 text-zinc-500" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}