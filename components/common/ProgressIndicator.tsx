'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface ProgressIndicatorProps {
  className?: string;
  progress?: number; // 0-100，如果提供则使用真实进度
  simulateRandom?: boolean; // 是否模拟随机进度变化
  duration?: number; // 模拟总时长（毫秒）
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ProgressIndicator({
  className,
  progress: externalProgress,
  simulateRandom = false,
  duration = 3000,
  label = '生成中...',
  showPercentage = true,
  size = 'md',
}: ProgressIndicatorProps) {
  const [internalProgress, setInternalProgress] = useState(0);

  useEffect(() => {
    if (!simulateRandom || externalProgress !== undefined) return;

    // 模拟随机进度：0% → 45% → 100%
    const intervals = [0, 45, 100];
    const timings = [0, duration * 0.6, duration];

    let currentIndex = 0;

    const updateProgress = () => {
      if (currentIndex >= intervals.length) return;

      const targetProgress = intervals[currentIndex];
      setInternalProgress(targetProgress);
      currentIndex++;

      if (currentIndex < timings.length) {
        setTimeout(updateProgress, timings[currentIndex] - timings[currentIndex - 1]);
      }
    };

    updateProgress();
  }, [simulateRandom, externalProgress, duration]);

  const displayProgress = externalProgress !== undefined ? externalProgress : internalProgress;

  const sizeClasses = {
    sm: 'h-1 text-xs',
    md: 'h-2 text-sm',
    lg: 'h-3 text-base',
  };

  return (
    <div className={cn('space-y-2', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-zinc-300 text-sm">{label}</span>}
          {showPercentage && (
            <span className="text-zinc-400 text-sm font-mono">
              {Math.round(displayProgress)}%
            </span>
          )}
        </div>
      )}

      <div className={cn('w-full bg-zinc-800 rounded-full overflow-hidden', sizeClasses[size])}>
        <div
          className="h-full bg-white transition-all duration-300 ease-out rounded-full"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
    </div>
  );
}

// 完整加载状态组件，结合骨架屏和进度指示器
interface LoadingStateProps {
  type?: 'script' | 'image' | 'video' | 'general';
  message?: string;
  className?: string;
}

export function LoadingState({
  type = 'general',
  message,
  className,
}: LoadingStateProps) {
  const messages = {
    script: 'AI正在生成剧本...',
    image: 'AI正在生成图像...',
    video: 'AI正在生成视频...',
    general: '处理中...',
  };

  const displayMessage = message || messages[type];

  return (
    <div className={cn('space-y-6 p-6 bg-zinc-900 rounded-lg border border-zinc-800', className)}>
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 animate-pulse bg-zinc-800 rounded-full" />
        <div className="space-y-2 flex-1">
          <div className="h-3 bg-zinc-800 rounded w-3/4" />
          <div className="h-3 bg-zinc-800 rounded w-1/2" />
        </div>
      </div>

      <ProgressIndicator
        simulateRandom
        label={displayMessage}
        duration={type === 'video' ? 5000 : 3000}
      />

      <div className="grid grid-cols-3 gap-3">
        <div className="h-20 bg-zinc-800 rounded animate-pulse" />
        <div className="h-20 bg-zinc-800 rounded animate-pulse" />
        <div className="h-20 bg-zinc-800 rounded animate-pulse" />
      </div>
    </div>
  );
}