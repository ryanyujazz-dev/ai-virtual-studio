'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Settings, Clock, Video, Music, Download } from 'lucide-react';

export default function FinalRoomPage() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-black text-white selection:bg-blue-500 selection:text-white">
      {/* Glass Header */}
      <header className="h-14 glass-header flex items-center justify-between px-6 z-50 relative shrink-0">
        <div className="flex items-center gap-5">
          {/* Back button */}
          <button
            onClick={() => router.push('../step2')}
            className="flex items-center gap-2 text-[var(--text-secondary)] cursor-pointer hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            <span className="text-[13px] font-medium tracking-wide">Scene Lab</span>
          </button>
          <div className="w-px h-4 bg-[var(--border-glass)]"></div>
          {/* Project info */}
          <div className="flex items-center gap-3">
            <h1 className="text-[13px] font-semibold text-[var(--text-main)] truncate max-w-[200px] tracking-wide">Cyberpunk 2077 Promo</h1>
            <span className="px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] border border-yellow-500/20 font-medium">Draft</span>
          </div>
        </div>

        {/* Step indicator */}
        <nav className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center bg-black/20 rounded-full p-1 border border-white/5 backdrop-blur-md">
          <button
            onClick={() => router.push('../step1')}
            className="px-5 py-1.5 rounded-full text-[13px] font-medium text-[var(--text-secondary)] hover:text-white transition-all"
          >
            Script
          </button>
          <button
            onClick={() => router.push('../step2')}
            className="px-5 py-1.5 rounded-full text-[13px] font-medium text-[var(--text-secondary)] hover:text-white transition-all"
          >
            Scene Lab
          </button>
          <button className="px-5 py-1.5 rounded-full text-[13px] font-medium bg-[rgba(255,255,255,0.15)] text-white shadow-sm border border-white/10 backdrop-blur-sm">
            Final
          </button>
        </nav>

        {/* Right side icons */}
        <div className="flex items-center gap-4">
          <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition-colors">
            <Settings className="w-4 h-4 text-[var(--text-secondary)]" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-b from-green-400 to-green-600 border border-white/10 shadow-inner"></div>
        </div>
      </header>

      {/* Main content - Coming Soon */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-2xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Video className="w-10 h-10 text-blue-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">Final Room</h1>
          <p className="text-xl text-[var(--text-secondary)] mb-8">
            Timeline composition, audio configuration, and export
          </p>

          <div className="glass-panel squircle p-8 max-w-lg mx-auto mb-8">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-blue-400" />
              <h2 className="text-lg font-semibold text-white">Coming Soon</h2>
            </div>
            <p className="text-[var(--text-secondary)] mb-6">
              The Final Room is currently under development. This is where you'll be able to:
            </p>
            <ul className="space-y-3 text-left">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                  <span className="text-blue-400 text-xs font-bold">1</span>
                </div>
                <span className="text-[var(--text-secondary)]">Arrange selected takes in a timeline</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                  <span className="text-blue-400 text-xs font-bold">2</span>
                </div>
                <span className="text-[var(--text-secondary)]">Add voiceover and background music</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-500/10 flex items-center justify-center mt-0.5">
                  <span className="text-blue-400 text-xs font-bold">3</span>
                </div>
                <span className="text-[var(--text-secondary)]">Export final video as MP4 or ZIP package</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('../step2')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Scene Lab
            </button>
            <button className="px-6 py-3 bg-blue-600/50 text-blue-200 rounded-xl border border-blue-500/30 cursor-not-allowed flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Export (Coming Soon)
            </button>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div className="h-12 border-t border-[var(--border-glass)] flex items-center justify-center backdrop-blur-sm">
        <p className="text-[10px] text-[var(--text-dim)] font-medium tracking-wide">
          Final Room • Part of AI Virtual Studio MVP
        </p>
      </div>
    </div>
  );
}