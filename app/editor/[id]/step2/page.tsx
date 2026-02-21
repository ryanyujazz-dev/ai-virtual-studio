'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Star, Play, ImageIcon, Video, Settings, History, Download, Maximize2, Brush, Film, Info, Clock, Lock, Plus, Sparkles, Menu } from 'lucide-react';
import { EditorHeader } from '../../../../components/editor/EditorHeader';

// Mock data for scenes
const MOCK_SCENES = [
  {
    id: 'scene-1',
    title: 'Scene 01',
    duration: '4s',
    prompt: 'Neon-lit futuristic city streets, rainy night, cyberpunk style, high contrast, cinematic lighting',
    thumbnail: 'bg-gradient-to-br from-blue-900/30 to-purple-900/30',
    selected: true,
  },
  {
    id: 'scene-2',
    title: 'Scene 02',
    duration: '3s',
    prompt: 'Protagonist back view, walking into alley, mysterious atmosphere, film noir lighting',
    thumbnail: 'bg-gradient-to-br from-zinc-800/30 to-zinc-900/30',
    selected: false,
  },
  {
    id: 'scene-3',
    title: 'Scene 03',
    duration: '5s',
    prompt: 'Close up: Mechanical eye scanning data streams, reflections, cybernetic details',
    thumbnail: 'bg-gradient-to-br from-green-900/30 to-teal-900/30',
    selected: false,
  },
  {
    id: 'scene-4',
    title: 'Scene 04',
    duration: '2s',
    prompt: 'Flying cars passing skyscrapers, aerial view, dynamic perspective',
    thumbnail: 'bg-gradient-to-br from-red-900/30 to-orange-900/30',
    selected: false,
  },
];

// Mock data for takes history
const MOCK_TAKES = [
  {
    id: 'take-1',
    title: 'Take 01',
    timestamp: '14:02',
    selected: true,
    thumbnail: 'bg-gradient-to-br from-pink-900/40 to-rose-900/40',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLWM2gl3qDOxl4_zaAxOABcKQNqyBAL0h5l4wdFLaiZKNW2DBWJlDIxsdtsoHnc8TirzkjQnU87jAYSdDcKRsZ1vhESpQnKTF1T4xL6glzRt8qn6ElbQTXx3kJo3c296iZcyyXtDoZU7RAzG_4OQvfHjWC0M3ssrOZdOnAi41ZZG_FEBRFrKVKt4QQKci9JCbD6ISefwgP0wQEtfT3QacI7wzB1_vQqkD5CXrAyKmnlHztQNg83shzJhwhYGOBGlAXmgj_aA6zlMM1',
  },
  {
    id: 'take-2',
    title: 'Take 02',
    timestamp: '14:05',
    selected: false,
    thumbnail: 'bg-gradient-to-br from-blue-900/40 to-cyan-900/40',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEddzkpCpj33vUVhSVVXbd9kWDSPNb3lpDqcdl2gbBAdYeTZuHQPiu8GxgNXfUkp_HKR-HFWsYzVgPS8FRWEa6p39itbhlDvF_3F_p9Drx2YdNsFySgO45fxQqZ1u92HGeRzLY5JP4a8An3uEs7_M7b66SxYMb-IY1xZtY9WibcNN5z12d0qU23bAOckQyT5ltN5jA3bljmjcpPLNToVQdovQr9UGq7yXUmNRDEmZbCmTXzLEumeZRMclfWud4DX_qgPmNb16v4os7',
  },
  {
    id: 'take-3',
    title: 'Take 03',
    timestamp: '14:06',
    selected: false,
    thumbnail: 'bg-gradient-to-br from-purple-900/40 to-violet-900/40',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA58FQP7bDnY6Ihf2IVyuXkgz8fNe6N4HBhMndCUF4S5_JLmmAp1OzCkFtbzu3ODFrFuwNyUdEyj7Z4YLjUba1WNgKBq46GTREB4dyJ7H__sLWvJxXZdNOB2y44A1iJrlcNV_lUpFyRoaycJl3id3alO5AEox17pEs31Ie8wzyR37hK00WyZcDOwdTtLvjdE8laWYFxG5WG2bIF6iRtOAzyKhAJvuExtgX0La5wrD0pGXd39SawTtyyj0LH33blg9ygVVRWNYKRTP_u',
  },
];

export default function SceneLabPage() {
  const router = useRouter();
  const [scenes, setScenes] = useState(MOCK_SCENES);
  const [takes, setTakes] = useState(MOCK_TAKES);
  const [motionIntensity, setMotionIntensity] = useState(5);
  const [cameraMovement, setCameraMovement] = useState('pan_right');
  const [prompt, setPrompt] = useState('Neon-lit futuristic city streets, rainy night, cyberpunk style, high contrast, cinematic lighting, 8k resolution, photorealistic...');

  const handleBack = () => {
    router.push('/dashboard'); // 返回项目管理页
  };

  const handleSceneSelect = (id: string) => {
    setScenes(scenes.map(scene => ({
      ...scene,
      selected: scene.id === id
    })));
  };

  const handleTakeSelect = (id: string) => {
    setTakes(takes.map(take => ({
      ...take,
      selected: take.id === id
    })));
  };

  const handleGenerateImage = () => {
    console.log('Generating base image with prompt:', prompt);
    // Mock generation logic
  };

  const handleGenerateVideo = () => {
    console.log('Generating video take with motion:', motionIntensity, 'camera:', cameraMovement);
    // Mock generation logic
  };

  const selectedScene = scenes.find(scene => scene.selected) || scenes[0];

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-black text-white selection:bg-blue-500 selection:text-white">
      {/* Parallel Workflow Header */}
      <EditorHeader
        projectName="Cyberpunk 2077 Promo"
        showSaveButton={false}
        onBack={handleBack}
        rightContent={
          <div className="flex items-center gap-4">
            <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors">
              <Settings className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-b from-blue-400 to-blue-600 border border-white/10 shadow-inner"></div>
          </div>
        }
      />

      {/* Main content area */}
      <div className="flex-1 flex overflow-hidden w-full">
        {/* Left Sidebar - Scene navigation */}
        <aside className="w-[280px] h-full flex flex-col glass-sidebar z-20 shrink-0">
          <div className="h-12 px-4 border-b border-[var(--border-glass)] flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-2">
              <h2 className="text-[13px] font-semibold text-[var(--text-secondary)] tracking-wide">分镜列表</h2>
              <button
                className="p-1 hover:bg-white/10 rounded transition-colors"
                title="切换场景"
                aria-label="切换场景"
              >
                <Menu className="w-4 h-4 text-[var(--text-dim)] hover:text-[var(--text-secondary)]" />
              </button>
            </div>
            <span className="text-[10px] text-[var(--text-dim)] font-medium bg-white/5 px-2 py-0.5 rounded">16:9</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {scenes.map((scene, index) => (
              <div
                key={scene.id}
                className={`group relative ${scene.selected ? 'bg-white/10 active-scene-border shadow-lg ring-1 ring-blue-500/50' : 'rounded-xl border border-transparent hover:bg-white/5'} rounded-xl p-3 cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98]`}
                onClick={() => handleSceneSelect(scene.id)}
              >
                <div className="flex justify-between items-center mb-2.5">
                  <span className={`text-[11px] ${scene.selected ? 'font-bold text-blue-400' : 'font-medium text-[var(--text-dim)] group-hover:text-[var(--text-secondary)]'}`}>
                    分镜 {(index + 1).toString().padStart(2, '0')}
                  </span>
                  <span className={`text-[10px] ${scene.selected ? 'text-[var(--text-secondary)]' : 'text-[var(--text-dim)]'} font-medium`}>
                    {scene.duration}
                  </span>
                </div>
                <div className={`aspect-video w-full ${scene.thumbnail} rounded-lg overflow-hidden relative mb-2.5 border ${scene.selected ? 'border-white/10' : 'border-white/5'} shadow-sm flex items-center justify-center`}>
                  <ImageIcon className="w-8 h-8 text-zinc-600" />
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-snug line-clamp-2 font-medium">
                  {scene.prompt}
                </p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-[var(--border-glass)]">
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-[var(--text-dim)] text-[var(--text-secondary)] hover:bg-white/5 hover:border-[var(--text-secondary)] hover:text-white transition-all text-[12px] font-medium">
              <Plus className="w-4 h-4" /> New Scene
            </button>
          </div>
        </aside>

        {/* Right Workspace */}
        <div className="flex-1 flex flex-col relative z-0 h-full overflow-hidden">
          {/* Alchemy Lab - Top section */}
          <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center min-h-0">
            {/* Background image with overlay */}
            <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCMCImun4oJCrBPmpx_tIXjoxHG4tl4obgKpOOyhA4LvTGLm00lc4gLo42m70LcQNnmIGn1FQwrytGJsMhO0-5r44_ZnKnQkQMuGFtqjJhQ7HoI-q3uRUSqnErWAnd7JGWKDG8ZygsdbMgPnG2dyUrzubGc1rCpRcYuEWh5M-nsIy74eCwIEhWBc4O0qhF7A0FsNglYJ2FWt-daAXtdbvgU23ETk0tKdNN1Jd2tNqOPOXHQNFjzyYCzWwXAeBRjDPcPfLtSc2zOpkgQ')" }}></div>
            <div className="absolute inset-0 z-0 bg-[#000000]/70 backdrop-blur-[40px]"></div>

            {/* Content container */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-full max-w-[1100px] mb-8 flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-0.5 rounded-md bg-blue-500 text-white text-[10px] font-bold tracking-wider uppercase shadow-lg shadow-blue-500/30">
                      {selectedScene.title}
                    </span>
                    <span className="text-[var(--text-secondary)] text-[11px] font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> ~{selectedScene.duration}
                    </span>
                  </div>
                  <h2 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">Alchemy Lab</h2>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-[var(--text-secondary)] hover:text-white text-[11px] font-medium rounded-lg border border-white/10 transition-colors flex items-center gap-1.5 backdrop-blur-sm">
                    <History className="w-3 h-3" /> History
                  </button>
                </div>
              </div>

              {/* Two-column grid */}
              <div className="w-full max-w-[1100px] grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left column (7 parts) */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* Image preview panel */}
                  <div className="glass-panel squircle p-1.5 shadow-2xl relative group">
                    <div className="relative aspect-video bg-black rounded-[10px] overflow-hidden border border-white/10 shadow-inner">
                      <img
                        alt="Generated Base"
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCsjDzLudazfWb7pgHj5D1vXehPEiPiYfhD4vsLRoK309sco2p2oaKFN341ZZFpsIxKuHMjLCpRMLnGW5fiS7wc-W9dqOZbFM-S0JvdGABYbh7cI9P0Zc9vVkAJL4XQSJp2PgLXvAvyU7G1APhsDNbh2DraQ4RMBf4OMVBV1hwTxuVEdhvMCxFKjI8od7V-jcLAQXRChi6wya1IKdyWS9jvU62TaKYsNp8Oz_0kbK1-wgWexKxDbSwKth4Je4XfXoDpesj00ayAhUDG"
                      />
                      {/* Hover buttons */}
                      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-1 group-hover:translate-y-0">
                        <button className="w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md border border-white/10 transition-all">
                          <Maximize2 className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-md border border-white/10 transition-all">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                      {/* Bottom label */}
                      <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-white/80 border border-white/10 font-medium tracking-wide shadow-sm">
                        Midjourney v6 • 16:9
                      </div>
                    </div>
                  </div>

                  {/* Prompt panel */}
                  <div className="glass-panel squircle p-5 flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <label className="text-[11px] font-semibold text-[var(--text-secondary)] uppercase tracking-widest pl-1">Prompt</label>
                      <button className="text-[11px] text-[var(--accent-primary)] hover:text-blue-300 transition-colors flex items-center gap-1 font-medium">
                        <Sparkles className="w-3 h-3" /> Optimize
                      </button>
                    </div>
                    <textarea
                      className="w-full bg-black/20 hover:bg-black/30 border border-white/10 focus:border-[var(--accent-primary)] focus:ring-1 focus:ring-[var(--accent-primary)] rounded-xl p-3 text-[13px] leading-relaxed text-white outline-none resize-none h-24 placeholder-white/20 transition-all shadow-inner font-light"
                      placeholder="Describe the scene you imagine..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={4}
                    />
                    <button
                      onClick={handleGenerateImage}
                      className="w-full py-2.5 bg-[#0071e3] hover:bg-[#0077ED] active:bg-[#0062c3] text-white text-[13px] font-semibold rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-white/5"
                    >
                      <Brush className="w-4 h-4" />
                      Generate Base Image
                    </button>
                  </div>
                </div>

                {/* Right column (5 parts) */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {/* Video parameters panel */}
                  <div className="glass-panel squircle p-6 flex flex-col gap-6 h-fit">
                    <div className="flex items-center gap-2 pb-4 border-b border-white/10">
                      <Film className="w-5 h-5 text-pink-500" />
                      <h3 className="text-[14px] font-semibold text-white tracking-wide">Video Parameters</h3>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <label className="text-[12px] text-[var(--text-secondary)] font-medium">Motion Intensity</label>
                        <span className="text-[12px] font-mono text-[var(--accent-secondary)] bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
                          {motionIntensity}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="10"
                        value={motionIntensity}
                        onChange={(e) => setMotionIntensity(parseInt(e.target.value))}
                        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[var(--accent-secondary)]"
                      />
                      <div className="flex justify-between text-[10px] text-[var(--text-dim)] font-medium px-1 uppercase tracking-wide">
                        <span>Static</span>
                        <span>Dynamic</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[12px] text-[var(--text-secondary)] font-medium">Camera Movement</label>
                      <div className="relative">
                        <select
                          className="w-full bg-black/20 hover:bg-black/30 border border-white/10 text-white text-[13px] rounded-lg focus:ring-1 focus:ring-[var(--accent-secondary)] focus:border-[var(--accent-secondary)] block p-2.5 appearance-none transition-colors outline-none font-light"
                          value={cameraMovement}
                          onChange={(e) => setCameraMovement(e.target.value)}
                        >
                          <option value="none">None</option>
                          <option value="pan_left">Pan Left</option>
                          <option value="pan_right">Pan Right</option>
                          <option value="tilt_up">Tilt Up</option>
                          <option value="zoom_in">Zoom In</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider font-semibold">Seed</label>
                        <input
                          type="text"
                          value="-1"
                          className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-[12px] text-white/80 font-mono outline-none focus:border-white/30 transition-colors"
                          readOnly
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-[var(--text-secondary)] uppercase tracking-wider font-semibold">Duration</label>
                        <div className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-[12px] text-[var(--text-dim)] flex justify-between items-center cursor-not-allowed">
                          <span>4s</span>
                          <Lock className="w-3 h-3" />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleGenerateVideo}
                      className="w-full mt-2 py-3 bg-[var(--accent-secondary)] hover:bg-[#ff2d55] active:bg-[#d32646] text-white text-[13px] font-semibold rounded-xl shadow-lg shadow-pink-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-white/5"
                    >
                      <Video className="w-5 h-5" />
                      Generate Video Takes
                    </button>
                  </div>

                  {/* Info panel */}
                  <div className="px-4 py-3 bg-blue-500/5 border border-blue-500/10 rounded-xl backdrop-blur-sm">
                    <div className="flex gap-3 items-start">
                      <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                      <p className="text-[11px] text-blue-100/80 leading-relaxed font-light">
                        Generating video consumes approx 15 credits. It is recommended to finalize the base image composition before generating motion.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Takes History - Bottom section */}
          <div className="h-56 w-full glass-bottom shrink-0 relative flex flex-col">
            <div className="px-6 py-3 border-b border-[var(--border-glass)] bg-white/5 flex justify-between items-center backdrop-blur-md">
              <div className="flex items-center gap-3">
                <Film className="w-5 h-5 text-[var(--text-secondary)]" />
                <h3 className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">Takes History</h3>
                <span className="bg-white/10 text-white text-[10px] font-medium px-2 py-0.5 rounded-full border border-white/5">
                  {takes.length}
                </span>
              </div>
              <span className="text-[10px] text-[var(--text-dim)] flex items-center gap-1.5 font-medium">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> Select best take
              </span>
            </div>
            <div className="flex-1 overflow-x-auto p-5 flex gap-5 items-center bg-black/20">
              {takes.map(take => (
                <div
                  key={take.id}
                  className="flex-shrink-0 w-52 group relative cursor-pointer"
                  onClick={() => handleTakeSelect(take.id)}
                >
                  <div className={`aspect-video bg-black rounded-lg overflow-hidden border-2 ${take.selected ? 'border-[var(--accent-secondary)] shadow-[0_0_20px_rgba(236,72,153,0.2)]' : 'border-white/10 hover:border-white/30'} transition-all relative hover:scale-[1.02]`}>
                    <img
                      alt={take.title}
                      className={`w-full h-full object-cover ${take.selected ? 'opacity-90' : 'opacity-60 grayscale-[30%] group-hover:opacity-80 group-hover:grayscale-0'} transition-all`}
                      src={take.imageUrl}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors">
                      <Play className="w-12 h-12 text-white/90 drop-shadow-xl filter backdrop-blur-[2px] rounded-full" />
                    </div>
                    <div className="absolute top-2 right-2">
                      <button
                        className={`${take.selected ? 'text-yellow-400 hover:text-yellow-300' : 'text-white/30 hover:text-yellow-400'} transform hover:scale-110 transition-all drop-shadow-md`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTakeSelect(take.id);
                        }}
                      >
                        <Star className="w-5 h-5" fill={take.selected ? "currentColor" : "none"} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 flex justify-between items-center px-1">
                    <span className={`text-[11px] ${take.selected ? 'text-[var(--accent-secondary)] font-semibold' : 'text-[var(--text-secondary)] font-medium'} tracking-wide`}>
                      {take.title} {take.selected && '(Selected)'}
                    </span>
                    <span className="text-[10px] text-[var(--text-dim)] font-mono">{take.timestamp}</span>
                  </div>
                </div>
              ))}
              {/* Spacer for scrolling */}
              <div className="flex-shrink-0 w-12 opacity-0"></div>
            </div>
            <div className="h-6 bg-black/40 border-t border-[var(--border-glass)] flex items-center justify-center backdrop-blur-sm absolute bottom-0 w-full z-10">
              <p className="text-[9px] text-[var(--text-dim)] font-medium tracking-wide">
                Unstarred <span className="text-yellow-600/80 mx-0.5">★</span> drafts will be auto-cleaned in 24h
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
