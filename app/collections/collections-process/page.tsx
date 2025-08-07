'use client';

import { useAuthContext } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CollectionsProcessPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  if (loading) return <p className="p-8">Loading...</p>;
  if (!user) { router.push('/login'); return null; }

  const videos = [
    {
      title: 'Intro to the Collections Workflow',
      url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_1',
      description: 'Daily queues, cadence, and goals for each contact attempt.',
      quiz: '/collections/collections-process/intro-workflow-quiz',
    },
    {
      title: 'Right-Party Contact & Verification',
      url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_2',
      description: 'Identity checks, disclosures, and call control.',
      quiz: '/collections/collections-process/rpc-verification-quiz',
    },
    {
      title: 'Notes & Next Actions',
      url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_3',
      description: 'Documenting calls and scheduling the next best action.',
      quiz: '/collections/collections-process/notes-next-actions-quiz',
    },
    {
      title: 'Delinquency Buckets & Priorities',
      url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_4',
      description: '0–29, 30–59, 60–89+ day tactics and urgency.',
      quiz: '/collections/collections-process/buckets-priorities-quiz',
    },
    {
      title: 'Escalation & Repo Triggers',
      url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_5',
      description: 'When and how to escalate while staying compliant.',
      quiz: '/collections/collections-process/escalation-repo-quiz',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6">Collections Process</h1>
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