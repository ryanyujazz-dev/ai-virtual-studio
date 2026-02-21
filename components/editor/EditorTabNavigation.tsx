'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';

export function EditorTabNavigation() {
  const pathname = usePathname();
  const params = useParams();

  // 安全获取 Next.js 动态路由参数 [id]
  const projectId = params?.id || '';

  // 检测当前步骤：从路径末尾提取 stepX
  let currentStep = 'step1';
  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || '';
  if (lastSegment.startsWith('step')) {
    currentStep = lastSegment;
  }

  // Use absolute path with projectId, fallback to relative paths
  const tabs = [
    {
      id: 'step1',
      label: '文案',
      href: projectId ? `/editor/${projectId}/step1` : '../step1'
    },
    {
      id: 'step2',
      label: '画面',
      href: projectId ? `/editor/${projectId}/step2` : '../step2'
    },
    {
      id: 'step3',
      label: '生成',
      href: projectId ? `/editor/${projectId}/step3` : '../step3'
    },
  ];

  return (
    <div className="flex items-center space-x-6">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={`text-lg transition-colors ${
            currentStep === tab.id
              ? 'text-white font-medium'
              : 'text-zinc-500 hover:text-white'
          }`}
        >
          {tab.label}
        </Link>
      ))}
    </div>
  );
}