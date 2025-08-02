'use client';

import { useAuthContext } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdvancedSalesPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  if (loading) return <p className="p-8">Loading...</p>;
  if (!user) {
    router.push('/login');
    return null;
  }

  const videos = [
    {
      title: 'Handling “Just Looking”',
      url: 'https://www.youtube.com/embed/ZoXVJCtUP4k',
      description: 'How to respond confidently when a customer says “I’m just looking.”',
      quiz: '/sales/advanced-sales/just-looking-quiz',
    },
    {
      title: 'Asking Great Questions During the Conversation Log',
      url: 'https://www.youtube.com/embed/XHvBLi0G24U',
      description: 'Use discovery questions to build trust and uncover needs.',
      quiz: '/sales/advanced-sales/convo-questions-quiz',
    },
    {
      title: 'The Bounce Back Close',
      url: 'https://www.youtube.com/embed/KCMcEZ5Mrv4',
      description: 'A simple but effective closing technique for uncertain customers.',
      quiz: '/sales/advanced-sales/bounce-back-quiz',
    },
    {
      title: 'Handling “What’s the Price?”',
      url: 'https://www.youtube.com/embed/hnIFJ_NtROI',
      description: 'How to shift from price questions to down payment and payments.',
      quiz: '/sales/advanced-sales/price-question-quiz',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6">Advanced Sales Techniques</h1>
      <div className="space-y-12">
        {videos.map((video, index) => (
          <div key={index} className="border-b pb-8">
            <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
            <p className="mb-4 text-sm text-gray-600">{video.description}</p>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                className="w-full h-64 rounded shadow"
                src={video.url}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <Link href={video.quiz}>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Take Quiz
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}