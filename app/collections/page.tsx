'use client';

import { useAuthContext } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CollectionsCategories() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  if (loading) return <p className="p-8">Loading...</p>;
  if (!user) {
    router.push('/login');
    return null;
  }

  const categories = [
    {
      title: 'Collections Process',
      description: 'End-to-end workflow: daily queues, notes, next actions, compliance touchpoints.',
      slug: 'collections-process',
    },
    {
      title: 'Collections Techniques',
      description: 'Negotiation, tone, pacing, right-party contact, and follow-through.',
      slug: 'collections-techniques',
    },
    {
      title: 'Handling Objections to Payment',
      description: 'Defusing “can’t pay”, “not today”, hardship stories, and setting realistic arrangements.',
      slug: 'handling-objections-to-payment',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6">Collections Training</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div key={cat.slug} className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">{cat.title}</h2>
            <p className="text-sm mb-4">{cat.description}</p>
            <Link
              href={`/collections/${cat.slug}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Open
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}