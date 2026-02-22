'use client';

import React from 'react';
import { ArrowLeft, Save, Download } from 'lucide-react';
import { EditorTabNavigation } from './EditorTabNavigation';
import Link from 'next/link';

interface EditorHeaderProps {
  projectName?: string;
  showSaveButton?: boolean;
  rightContent?: React.ReactNode;
  onBack?: () => void;
}

export function EditorHeader({
  projectName = '未命名项目',
  showSaveButton = true,
  rightContent,
  onBack
}: EditorHeaderProps) {

  const defaultRightContent = (
    <div className="pointer-events-auto flex items-center space-x-6">
      <button
        className="text-white/50 hover:text-white transition-colors p-2"
        title="导出项目"
      >
        <Download className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <header className="fixed top-0 w-full z-50 h-24 flex items-center justify-between px-12 bg-gradient-to-b from-black via-black/90 to-transparent pointer-events-none" suppressHydrationWarning>
      {/* 左侧：返回按钮和项目信息 */}
      <div className="pointer-events-auto flex items-center">
        {onBack ? (
          <button
            onClick={onBack}
            title="返回"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </button>
        ) : (
          <Link
            href="/dashboard"
            title="返回大厅"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors mr-4"
          >
            <ArrowLeft className="w-5 h-5 text-white/70" />
          </Link>
        )}
        <div className="h-4 w-px bg-white/20"></div>
        <span className="ml-4 text-white/90 font-light">项目：{projectName}</span>
      </div>

      {/* 中间：Tab导航 - 与dashboard导航交互效果一致 */}
      <div className="pointer-events-auto">
        <EditorTabNavigation />
      </div>

      {/* 右侧：自定义内容或默认内容 */}
      <div className="pointer-events-auto">
        {rightContent || defaultRightContent}
      </div>
    </header>
  );
}