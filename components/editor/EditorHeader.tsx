'use client';

import React from 'react';
import { ArrowLeft, Save } from 'lucide-react';
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
    <div className="flex items-center space-x-4">
      {showSaveButton && (
        <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
          <Save className="w-5 h-5 text-zinc-300" />
        </button>
      )}
      {/* 其他右侧内容 */}
    </div>
  );

  return (
    <header className="w-full h-16 border-b border-zinc-800 px-6 flex items-center justify-between bg-zinc-950">
      {/* 左侧：返回按钮和项目信息 */}
      <div className="flex items-center space-x-4">
        <Link
          href="/dashboard"
          title="返回大厅"
          className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-zinc-300" />
        </Link>
        <div className="h-4 w-px bg-zinc-700"></div>
        <span className="text-zinc-300">项目：{projectName}</span>
      </div>

      {/* 中间：Tab导航 */}
      <EditorTabNavigation />

      {/* 右侧：自定义内容或默认内容 */}
      {rightContent || defaultRightContent}
    </header>
  );
}