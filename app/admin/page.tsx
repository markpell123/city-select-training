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
  activity?: {
    [category: string]: {
      [quizId: string]: QuizEntry;
    };
  };
};

export default function AdminPage() {
  const { user, loading } = useAuthContext();
  const [users, setUsers] = useState<UserData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!user || loading) return;

    const run = async () => {
      try {
        const snap = await getDocs(collection(db, 'userProgress'));
        const data: UserData[] = snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        setUsers(data);
      } catch (e: any) {
        console.error(e);
        setError(
          e?.message || 'Unable to load user progress. (Check Firestore rules / permissions.)'
        );
      } finally {
        setFetching(false);
      }
    };
    run();
  }, [user, loading]);

  if (loading) return <p className="p-8">Loading auth...</p>;
  if (!user) return <p className="p-8">You must be logged in.</p>;

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {fetching && <p>Loading user progress…</p>}
      {error && (
        <p className="text-red-600 mb-4">
          {error}
        </p>
      )}

      {!fetching && !error && users.length === 0 && (
        <p>No user progress yet.</p>
      )}

      {!fetching && !error && users.length > 0 && (
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
              {users.flatMap((u) => {
                const sales = u.activity || {};
                const rows: JSX.Element[] = [];
                Object.entries(sales).forEach(([category, quizzes]) => {
                  Object.entries(quizzes).forEach(([quizId, q]) => {
                    rows.push(
                      <tr key={`${u.id}-${category}-${quizId}`}>
                        <td className="border px-4 py-2">{u.email}</td>
                        <td className="border px-4 py-2">{`${category} / ${quizId}`}</td>
                        <td className="border px-4 py-2">{q.quizScore}/1</td>
                        <td className="border px-4 py-2">
                          {q.completedAt ? new Date(q.completedAt).toLocaleString() : '—'}
                        </td>
                      </tr>
                    );
                  });
                });
                return rows;
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}