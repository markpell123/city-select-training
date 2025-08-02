'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/lib/AuthContext';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

export default function JustLookingQuiz() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();
  const { user } = useAuthContext();

  const correctAnswer = 'c';

  const handleSubmit = async () => {
    if (!selected || !user) return;
    const correct = selected === correctAnswer;
    setIsCorrect(correct);
    setSubmitted(true);

    const ref = doc(db, 'userProgress', user.uid);
    await setDoc(
      ref,
      {
        email: user.email,
        activity: {
          'advanced-sales': {
            'just-looking': {
              watched: true,
              quizScore: correct ? 1 : 0,
              completedAt: new Date().toISOString(),
            },
          },
        },
      },
      { merge: true }
    );
  };

  useEffect(() => {
    if (submitted && isCorrect) {
      const timer = setTimeout(() => {
        router.push('/sales/advanced-sales');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted, isCorrect, router]);

  const question = {
    text: 'How should you respond when a customer says "I’m just looking"?',
    options: {
      a: 'Let them browse freely without approaching them',
      b: 'Ask if they want to test drive something now',
      c: 'Acknowledge and begin asking friendly discovery questions to build trust',
    },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Quiz: Handling "Just Looking"</h1>
      <p className="mb-4 text-lg">{question.text}</p>
      <div className="space-y-4 mb-6">
        {Object.entries(question.options).map(([key, value]) => (
          <div key={key} className="flex items-center">
            <input
              type="radio"
              id={key}
              name="answer"
              value={key}
              checked={selected === key}
              onChange={() => setSelected(key)}
              className="mr-2"
            />
            <label htmlFor={key}>{value}</label>
          </div>
        ))}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className={`px-4 py-2 rounded text-white ${
            selected ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Submit
        </button>
      ) : (
        <div className="mt-6">
          {isCorrect ? (
            <p className="text-green-600 font-semibold">Correct! ✅ Returning to video list...</p>
          ) : (
            <p className="text-red-600 font-semibold">Incorrect ❌ — the correct answer is "c".</p>
          )}
        </div>
      )}
    </div>
  );
}