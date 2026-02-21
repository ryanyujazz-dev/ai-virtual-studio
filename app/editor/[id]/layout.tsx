'use client';

export default function EditorLayout({
  children,
  params: _params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  return (
    <div className="min-h-screen w-full bg-zinc-950">
      {children}
    </div>
  );
}