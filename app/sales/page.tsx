'use client';

import { useAuthContext } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SalesTrainingPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  if (loading) return <p className="p-8">Loading...</p>;
  if (!user) {
    router.push('/login');
    return null;
  }

  const categories = [
    {
      title: 'Sales Process',
      description: 'Master the City Select Auto Sales Sales Process',
      slug: 'sales-process',
    },
    {
      title: 'Phone Skills',
      description: 'Become a Champion of the Phone.',
      slug: 'phone-skills',
    },
    {
      title: 'Handling Objections',
      description: 'Handle Objections with Ease.',
      slug: 'Objections',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6">Sales Training</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.slug} className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">{category.title}</h2>
            <p className="text-sm mb-4">{category.description}</p>
            <Link
              href={`/sales/${category.slug}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Start
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}