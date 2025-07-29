'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CreditAppQuiz() {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const router = useRouter();

  const correctAnswer = 'c';

  const handleSubmit = () => {
    if (selected) {
      const correct = selected === correctAnswer;
      setIsCorrect(correct);
      setSubmitted(true);
    }
  };

  useEffect(() => {
    if (submitted && isCorrect) {
      const timer = setTimeout(() => {
        router.push('/sales/sales-process');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitted, isCorrect, router]);

  const question = {
    text: 'What is the key to helping a customer complete the credit application?',
    options: {
      a: 'Filling it out as quickly as possible without questions',
      b: 'Asking the customer to complete it on their own at home',
      c: 'Walking through it step-by-step and answering their questions',
      d: 'Only completing it after showing them cars first',
    },
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Quiz: Understanding the Credit App</h1>
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      ) : (
        <div className="mt-6">
          {isCorrect ? (
            <p className="text-green-600 font-semibold">
              Correct! ✅ Returning to video list...
            </p>
          ) : (
            <p className="text-red-600 font-semibold">
              Incorrect ❌ — the correct answer is “c”.
            </p>
          )}
        </div>
      )}
    </div>
  );
}