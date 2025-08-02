'use client';

import { useAuthContext } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

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
      url: 'https://www.youtube.com/embed/your_video_id_1',
      description: 'How to respond confidently when a customer says “I’m just looking.”',
    },
    {
      title: 'Asking Great Questions During the Conversation Log',
      url: 'https://www.youtube.com/embed/your_video_id_2',
      description: 'Use discovery questions to build trust and uncover needs.',
    },
    {
      title: 'The Bounce Back Close',
      url: 'https://www.youtube.com/embed/your_video_id_3',
      description: 'A simple but effective closing technique for uncertain customers.',
    },
    {
      title: 'Handling “What’s the Price?”',
      url: 'https://www.youtube.com/embed/your_video_id_4',
      description: 'How to shift from price questions to down payment and payments.',
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
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Take Quiz
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}