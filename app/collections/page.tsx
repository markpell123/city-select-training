'use client';

import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';

export default function CollectionsTrainingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <p className="p-8">Loading...</p>;

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-4">Collections Training</h1>
      <p className="text-sm">This page is protected. Only logged-in users can access it.</p>
    </div>
  );
}