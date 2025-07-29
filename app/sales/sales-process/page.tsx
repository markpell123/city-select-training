'use client';

import { useAuthContext } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function SalesProcessPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  if (loading) return <p className="p-8">Loading...</p>;
  if (!user) {
    router.push('/login');
    return null;
  }

  const videos = [
    {
      title: 'Overview of the Sales Process',
      url: 'https://www.youtube.com/embed/m5bxzd-fsro',
      description: 'An introduction to the complete City Select sales process.',
      quizLink: '/sales/sales-process/overview-quiz',
    },
    {
      title: 'The Meet and Greet',
      url: 'https://www.youtube.com/embed/QmFYb5Ek5mk',
      description: 'Best practices for making a great first impression.',
      quizLink: '/sales/sales-process/meet-and-greet',
    },
    {
      title: 'Understanding the Credit App',
      url: 'https://www.youtube.com/embed/GE21UarMGxM',
      description: 'How to guide a customer through the credit application.',
      quizLink: '/sales/sales-process/credit-app',
    },
    {
      title: 'Conversation Log',
      url: 'https://www.youtube.com/embed/7Gajoafejas',
      description: 'Using the conversation log to keep accurate records.',
      quizLink: '/sales/sales-process/conversation-log',
    },
    {
      title: 'Test Drive and Close',
      url: 'https://www.youtube.com/embed/DVgBeWSGBHY',
      description: 'Steps to deliver a great test drive and close the sale.',
      quizLink: '/sales/sales-process/test-drive-and-close',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6">Sales Process Training</h1>
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
            {video.quizLink ? (
              <button
                onClick={() => router.push(video.quizLink)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Take Quiz
              </button>
            ) : (
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded cursor-not-allowed"
                disabled
              >
                Quiz Coming Soon
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}