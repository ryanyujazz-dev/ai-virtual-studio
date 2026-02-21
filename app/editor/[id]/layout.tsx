'use client';

import { EditorNavigation } from "../../../components/editor/EditorNavigation";

export default function EditorLayout({
  children,
  params: _params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="flex h-screen bg-black">
      {/* Navigation */}
      <EditorNavigation />

      {/* Main Content */}
      <div className="flex-1 flex">
        {children}
      </div>
    </div>
  );
}