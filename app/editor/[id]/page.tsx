import { redirect } from 'next/navigation';

export default async function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // Redirect to step1 by default
  redirect(`/editor/${id}/step1`);
}