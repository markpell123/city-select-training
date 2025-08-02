'use client';

import { useState, useEffect } from 'react';
import { useAuthContext } from '@/lib/AuthContext';
import { useRouter } from 'next/navigation';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function PriceQuestionQuiz() {
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
              'price-question': {
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
      <h1 className="text-2xl font-bold mb-4">Quiz: Handling “What’s the Price?”</h1>
      {!answered ? (
        <>
          <p className="mb-4">How should you respond when a customer asks for the price too early?</p>
          <div className="space-y-2">
            <button onClick={() => handleAnswer(false)} className="btn">Tell them the cash price immediately</button>
            <button onClick={() => handleAnswer(true)} className="btn">Shift the conversation to monthly payments and down payment options</button>
            <button onClick={() => handleAnswer(false)} className="btn">Say “I’ll get my manager”</button>
          </div>
        </>
      ) : (
        <p className="mt-4 text-lg">{correct ? '✅ Correct!' : '❌ Incorrect.'} Returning to video list...</p>
      )}
    </div>
  );
}