'use client';

import { useState } from 'react';
import { useAuthContext } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function ConvoQuestionsQuiz() {
  const { user, loading } = useAuthContext();
  const router = useRouter();
  const [answered, setAnswered] = useState(false);
  const [correct, setCorrect] = useState(false);

  const handleAnswer = async (isCorrect: boolean) => {
    setAnswered(true);
    setCorrect(isCorrect);

    if (user) {
      await setDoc(
        doc(db, 'userProgress', user.uid),
        {
          email: user.email,
          activity: {
            'advanced-sales': {
              'convo-questions': {
                quizScore: isCorrect ? 1 : 0,
                completedAt: new Date().toISOString(),
              },
            },
          },
        },
        { merge: true }
      );
    }

    setTimeout(() => {
      router.push('/sales/advanced-sales');
    }, 5000);
  };

  if (loading) return <p className="p-8">Loading...</p>;
  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Quiz: Asking Great Questions</h1>
      {!answered ? (
        <>
          <p className="mb-4">
            What is the main purpose of asking thoughtful questions during the conversation log?
          </p>
          <div className="space-y-2">
            <button onClick={() => handleAnswer(false)} className="btn">
              To speed up the credit check process
            </button>
            <button onClick={() => handleAnswer(true)} className="btn">
              To build trust and understand the customer’s real needs
            </button>
            <button onClick={() => handleAnswer(false)} className="btn">
              To show off your inventory knowledge
            </button>
          </div>
        </>
      ) : (
        <p className="mt-4 text-lg">
          {correct ? '✅ Correct!' : '❌ Incorrect.'} Returning to video list...
        </p>
      )}
    </div>
  );
}