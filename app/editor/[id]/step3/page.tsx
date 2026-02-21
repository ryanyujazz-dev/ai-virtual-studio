'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Settings,
  SlidersHorizontal,
  ChevronDown,
  PlayCircle,
  Music,
  ArrowLeftRight,
  Maximize2,
  Undo,
  Redo,
  Scissors,
  Layers,
  ZoomOut,
  ZoomIn,
  Play,
  CheckCircle
} from 'lucide-react';

export default function FinalRoomPage() {
  const router = useRouter();
  const [voiceoverExpanded, setVoiceoverExpanded] = useState(true);
  const [musicExpanded, setMusicExpanded] = useState(true);

  return (
    <div className="h-screen flex flex-col text-sm antialiased bg-black text-white overflow-hidden">
      {/* Header */}
      <header className="h-16 flex items-center justify-between px-8 z-50 fixed top-0 w-full bg-black/80 backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => router.push('../step2')}
            className="flex items-center text-white/50 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="h-4 w-[1px] bg-white/10"></div>
          <h1 className="font-normal text-sm tracking-wide text-white">
            Cyberpunk City Tour <span className="text-white/30 ml-2 font-light">v.04</span>
          </h1>
        </div>

        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-1 text-white/40 text-xs font-mono">
            <CheckCircle className="w-4 h-4 animate-pulse text-green-500" />
            <span>Saved</span>
          </div>
          <button className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-zinc-800 transition-colors">
            <Settings className="w-4 h-4 text-white/80" />
          </button>
          <div className="w-8 h-8 rounded-full bg-zinc-800 overflow-hidden cursor-pointer">
            <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full h-full pt-16 flex flex-col">
        <div className="flex-1 flex relative">
          {/* Video Player Area */}
          <div className="flex-1 flex items-center justify-center bg-black p-8 relative group">
            <div className="relative w-full max-w-5xl aspect-video overflow-hidden rounded-sm shadow-[0_0_50px_rgba(0,0,0,0.8)] video-player">
              <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white/30 text-lg mb-2">Video Preview</div>
                  <div className="text-white/50 text-sm">Cyberpunk City Tour</div>
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/10">
                <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-all hover:scale-105">
                  <Play className="w-8 h-8 text-white ml-1" />
                </button>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-1 bg-black/40 backdrop-blur-md rounded-full text-xs font-mono text-white/90 border border-white/5">
                00:12:04 / 00:45:00
              </div>
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="w-80 border-l border-white/5 bg-black h-full flex flex-col z-20 config-panel">
            <div className="p-6">
              <h2 className="text-xs font-medium text-white/40 uppercase tracking-widest mb-8">Configuration</h2>

              {/* Voiceover Section */}
              <div className="mb-10">
                <button
                  className="flex items-center justify-between w-full mb-4 group cursor-pointer"
                  onClick={() => setVoiceoverExpanded(!voiceoverExpanded)}
                >
                  <div className="flex items-center gap-3">
                    <SlidersHorizontal className="w-5 h-5 text-white/70 font-light" />
                    <span className="text-white font-light">Voiceover</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-white/30 group-hover:text-white transition-transform duration-200 ${
                      voiceoverExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {voiceoverExpanded && (
                  <div className="pl-8 space-y-4">
                    <div className="flex items-center justify-between bg-zinc-900/50 p-3 rounded hover:bg-zinc-900 transition-colors cursor-pointer border border-white/5 hover:border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-300 text-[10px] font-bold">A</div>
                        <div className="flex flex-col">
                          <span className="text-sm text-white/90">Adam (Deep)</span>
                          <span className="text-[10px] text-white/40">Narrative</span>
                        </div>
                      </div>
                      <PlayCircle className="w-4 h-4 text-white/20" />
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-[10px] text-white/30 uppercase tracking-wider">
                        <span>Speed</span>
                        <span>1.0x</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="50"
                        className="w-full step3-slider"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Background Music Section */}
              <div className="mb-10">
                <button
                  className="flex items-center justify-between w-full mb-4 group cursor-pointer"
                  onClick={() => setMusicExpanded(!musicExpanded)}
                >
                  <div className="flex items-center gap-3">
                    <Music className="w-5 h-5 text-white/70 font-light" />
                    <span className="text-white font-light">Background Music</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <ChevronDown
                      className={`w-4 h-4 text-white/30 group-hover:text-white transition-transform duration-200 ${
                        musicExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                {musicExpanded && (
                  <div className="pl-8 space-y-4">
                    <div className="flex items-center justify-between bg-zinc-900/50 p-3 rounded hover:bg-zinc-900 transition-colors cursor-pointer border border-white/5 hover:border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500/70 to-pink-500/70 rounded opacity-70"></div>
                        <div className="flex flex-col">
                          <span className="text-sm text-white/90">Neon Dreams</span>
                          <span className="text-[10px] text-white/40">Synthwave • 120BPM</span>
                        </div>
                      </div>
                      <ArrowLeftRight className="w-4 h-4 text-white/20" />
                    </div>
                    <div className="space-y-2 pt-2">
                      <div className="flex justify-between text-[10px] text-white/30 uppercase tracking-wider">
                        <span>Volume</span>
                        <span>-12dB</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="70"
                        className="w-full step3-slider"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Format Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4 group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <Maximize2 className="w-5 h-5 text-white/70 font-light" />
                    <span className="text-white font-light">Format</span>
                  </div>
                </div>
                <div className="pl-8 flex gap-2">
                  <button className="px-3 py-1.5 rounded border border-white/20 text-xs text-white bg-white/10">
                    16:9
                  </button>
                  <button className="px-3 py-1.5 rounded border border-white/5 text-xs text-white/40 hover:text-white hover:border-white/20 transition-all">
                    9:16
                  </button>
                  <button className="px-3 py-1.5 rounded border border-white/5 text-xs text-white/40 hover:text-white hover:border-white/20 transition-all">
                    1:1
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="h-[220px] bg-black border-t border-white/5 relative z-10 flex flex-col">
          <div className="h-10 border-b border-white/5 flex items-center justify-between px-6 bg-black/50">
            <div className="flex items-center space-x-6">
              <button className="text-white/40 hover:text-white transition-colors">
                <Undo className="w-4 h-4" />
              </button>
              <button className="text-white/40 hover:text-white transition-colors">
                <Redo className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-white/10"></div>
              <button className="text-white/40 hover:text-white transition-colors">
                <Scissors className="w-4 h-4" />
              </button>
              <button className="text-white/40 hover:text-white transition-colors">
                <Layers className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-white/40 hover:text-white transition-colors">
                <ZoomOut className="w-4 h-4" />
              </button>
              <div className="w-24 h-1 bg-zinc-800 rounded-full overflow-hidden relative">
                <div className="absolute left-0 top-0 h-full w-1/3 bg-white/30 rounded-full"></div>
              </div>
              <button className="text-white/40 hover:text-white transition-colors">
                <ZoomIn className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex-1 relative overflow-x-auto overflow-y-hidden px-6 pt-8 pb-4 bg-black">
            {/* Playhead Indicator */}
            <div className="absolute top-0 bottom-0 left-[30%] w-[1px] bg-red-500 z-30 pointer-events-none">
              <div className="absolute top-0 -left-[5px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-red-500"></div>
            </div>

            {/* Timeline Clips */}
            <div className="flex items-center space-x-1 h-24 relative">
              {[
                { label: 'Scene 01', width: 'w-48', rounded: 'rounded-l-sm' },
                { label: 'Scene 02 (Focus)', width: 'w-64', rounded: '', active: true },
                { label: 'Scene 03', width: 'w-40', rounded: '' },
                { label: 'Scene 04', width: 'w-56', rounded: '' },
                { label: 'Outro', width: 'w-48', rounded: 'rounded-r-sm' }
              ].map((scene, index) => (
                <div
                  key={index}
                  className={`h-full ${scene.width} relative group cursor-pointer ${scene.rounded} timeline-clip`}
                >
                  <div className={`w-full h-full bg-gradient-to-br ${scene.active ? 'from-blue-900/50 to-purple-900/50' : 'from-gray-900/50 to-gray-800/50'} ${scene.rounded} opacity-60 group-hover:opacity-100 transition-opacity ${scene.active ? '' : 'grayscale group-hover:grayscale-0'}`}></div>
                  <div className={`absolute inset-0 border ${scene.active ? 'border-white' : 'border-transparent'} transition-colors ${scene.rounded} clip-border`}></div>
                  {scene.active && (
                    <>
                      <div className="absolute inset-0 bg-white/5"></div>
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-indigo-500"></div>
                    </>
                  )}
                  <span className="absolute bottom-2 left-2 text-[10px] font-mono text-white drop-shadow-md">
                    {scene.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Time Markers */}
            <div className="flex h-6 mt-2 relative w-[800px] border-t border-white/10 pt-1">
              <span className="absolute left-0 text-[10px] text-zinc-600 font-mono">00:00</span>
              <span className="absolute left-[192px] text-[10px] text-zinc-600 font-mono">00:05</span>
              <span className="absolute left-[448px] text-[10px] text-zinc-600 font-mono">00:12</span>
              <span className="absolute left-[608px] text-[10px] text-zinc-600 font-mono">00:18</span>
              <span className="absolute left-[832px] text-[10px] text-zinc-600 font-mono">00:24</span>
            </div>
          </div>
        </div>
      </main>

      {/* Export Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="bg-white text-black px-8 py-4 rounded-full font-medium tracking-wide shadow-lg hover:bg-gray-200 transition-all transform hover:-translate-y-1 active:scale-95 flex items-center gap-3 group">
          <span>Export Video</span>
          <ArrowLeft className="w-5 h-5 rotate-180 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}