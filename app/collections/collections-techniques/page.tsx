'use client';

import { useAuthContext } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CollectionsTechniquesPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  if (loading) return <p className="p-8">Loading...</p>;
  if (!user) { router.push('/login'); return null; }

  const videos = [
    {
      title: 'Tone, Empathy, and Control',
      url: 'https://www.youtube.com/embed/Zoivl20-_9E',
      description: 'Balancing empathy with forward momentum.',
      quiz: '/collections/collections-techniques/tone-empathy-quiz',
    },
    {
      title: 'Payment Negotiation Basics',
      url: 'https://www.youtube.com/embed/trI6nw-5bEQ',
      description: 'Anchors, ranges, and securing real commitments.',
      quiz: '/collections/collections-techniques/negotiation-basics-quiz',
    },
    {
      title: 'Using Silence & Pacing',
      url: 'https://www.youtube.com/embed/cZGwU3BWlpw',
      description: 'Letting customers talk while guiding the call.',
      quiz: '/collections/collections-techniques/silence-pacing-quiz',
    },
    {
      title: 'Voicemails & Text Messages that Get Callbacks',
      url: 'https://www.youtube.com/embed/kBpUjz886bY',
      description: 'Crafting messages that convert.',
      quiz: '/collections/collections-techniques/openers-voicemail-quiz',
    },
    {
      title: 'Mastering Commitment Language',
      url: 'https://www.youtube.com/embed/QZLSGJC-SxY',
      description: 'Timing, day-parting, and channel mix.',
      quiz: '/collections/collections-techniques/callback-cadence-quiz',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6">Collections Techniques</h1>
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