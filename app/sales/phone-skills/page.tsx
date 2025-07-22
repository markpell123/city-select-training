'use client';

import { useAuth } from '@/lib/useAuth';
import { useRouter } from 'next/navigation';

export default function PhoneScriptsTraining() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <p className="p-8">Loading...</p>;
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-4">Phone Scripts</h1>
      <p className="mb-6">[Embed or link to training video here]</p>
      <p className="text-sm text-gray-600">[Quiz button or questions will go here]</p>
    </div>
  );
}
