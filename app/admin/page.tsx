'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthContext } from '@/lib/AuthContext';

type QuizEntry = {
  quizScore: number;
  completedAt: string;
};

type UserData = {
  id: string;
  email: string;
  activity: {
    [category: string]: {
      [quizId: string]: QuizEntry;
    };
  };
};

export default function AdminPage() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState<UserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'userProgress'));
      const data: UserData[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as any),
      }));
      setUsers(data);
    };

    fetchData();
  }, []);

  if (!user) return <p className="p-8">You must be logged in.</p>;

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      {users.length === 0 ? (
        <p>Loading user progress...</p>
      ) : (
        <div className="overflow-auto">
          <table className="w-full border text-sm text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">User Email</th>
                <th className="px-4 py-2">Quiz</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Completed At</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) =>
                Object.entries(user.activity?.['sales-process'] || {}).map(
                  ([quizId, quizData]) => (
                    <tr key={`${user.id}-${quizId}`}>
                      <td className="border px-4 py-2">{user.email}</td>
                      <td className="border px-4 py-2">{quizId}</td>
                      <td className="border px-4 py-2">{quizData.quizScore}/1</td>
                      <td className="border px-4 py-2">
                        {new Date(quizData.completedAt).toLocaleString()}
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}