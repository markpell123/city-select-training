'use client';

import { useAuthContext } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function PhoneSkillsPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  if (loading) return <p className="p-8">Loading...</p>;
  if (!user) { router.push('/login'); return null; }

  const videos = [
    {
      title: 'Handling a Phone Call',
      url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_1',
      description: 'End-to-end structure for a professional, effective call.',
      quiz: '/sales/phone-skills/handling-a-phone-call-quiz',
    },
    {
      title: 'How to Greet',
      url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_2',
      description: 'Open strong: name, dealership, permission, purpose.',
      quiz: '/sales/phone-skills/how-to-greet-quiz',
    },
    {
      title: 'Bridging Skills',
      url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_3',
      description: 'Smooth transitions that keep the conversation on track.',
      quiz: '/sales/phone-skills/bridging-skills-quiz',
    },
    {
      title: 'Setting Appointments',
      url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_4',
      description: 'Lock the time, confirm details, reduce no-shows.',
      quiz: '/sales/phone-skills/setting-appointments-quiz',
    },
    {
      title: 'Handling Objections',
      url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_5',
      description: 'Price, availability, and timing—without losing momentum.',
      quiz: '/sales/phone-skills/handling-objections-quiz',
    },
    {
      title: 'How to Control a Call',
      url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_6',
      description: 'Lead with questions, pace, and confident summaries.',
      quiz: '/sales/phone-skills/how-to-control-a-call-quiz',
    },
    {
      title: 'Voice and Tone',
      url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_7',
      description: 'Sound like a pro: tone, pace, energy, clarity.',
      quiz: '/sales/phone-skills/voice-and-tone-quiz',
    },
    {
      title: 'Compliance',
      url: 'https://www.youtube.com/embed/YOUR_VIDEO_ID_8',
      description: 'Disclosures, documentation, and staying within policy.',
      quiz: '/sales/phone-skills/compliance-quiz',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6">Phone Skills</h1>
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