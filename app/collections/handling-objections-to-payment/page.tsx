'use client';

import { useAuthContext } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ObjectionsToPaymentPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  if (loading) return <p className="p-8">Loading...</p>;
  if (!user) { router.push('/login'); return null; }

  const videos = [
    {
      title: '“Can’t Pay Today”',
      url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_1',
      description: 'Moving from no-pay to partial or scheduled commitment.',
      quiz: '/collections/handling-objections-to-payment/cant-pay-today-quiz',
    },
    {
      title: '“Handling "I had to fix the car"”',
      url: 'https://www.youtube.com/embed/Z-pMAE70PD0',
      description: 'Securing a callback time and third-party participation.',
      quiz: '/collections/handling-objections-to-payment/check-with-spouse-quiz',
    },
    {
      title: 'Hardship & Loss of Job',
      url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_3',
      description: 'Empathy scripts + realistic payment arrangements.',
      quiz: '/collections/handling-objections-to-payment/hardship-quiz',
    },
    {
      title: '“Already Paid” or Dispute',
      url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_4',
      description: 'Gathering facts and verifying while keeping momentum.',
      quiz: '/collections/handling-objections-to-payment/already-paid-quiz',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6">Handling Objections to Payment</h1>
      <div className="space-y-12">
        {videos.map((v, i) => (
          <div key={i} className="border-b pb-8">
            <h2 className="text-xl font-semibold mb-2">{v.title}</h2>
            <p className="mb-4 text-sm text-gray-600">{v.description}</p>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                className="w-full h-64 rounded shadow"
                src={v.url}
                title={v.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <Link href={v.quiz}>
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