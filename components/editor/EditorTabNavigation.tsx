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
    <nav className="flex space-x-12">
      {tabs.map((tab) => (
        <Link
          key={tab.id}
          href={tab.href}
          className={`nav-link text-sm font-light hover:text-white transition-colors tracking-wide relative ${
            currentStep === tab.id ? 'text-white/90' : 'text-white/50'
          }`}
        >
          {tab.label}
        </Link>
      ))}
      <style jsx>{`
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          width: 0;
          height: 1px;
          bottom: -4px;
          left: 50%;
          background-color: white;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
}