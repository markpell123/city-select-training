'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthContext } from '@/lib/AuthContext';

type QuizEntry = {
  quizScore?: number;
  completedAt?: string;
};

type Activity = {
  // category -> quizId -> QuizEntry
  [category: string]: {
    [quizId: string]: QuizEntry;
  };
};

type UserDoc = {
  id: string;
  email?: string;
  activity?: Activity;
};

export default function AdminPage() {
  const { user, loading } = useAuthContext();
  const [rows, setRows] = useState<Array<{
    userEmail: string;
    category: string;
    quizId: string;
    quizScore: number | string;
    completedAt: string;
  }>>([]);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState<boolean>(true);

  useEffect(() => {
    if (loading) return;
    if (!user) return;

    const run = async () => {
      setFetching(true);
      setError(null);
      try {
        const snap = await getDocs(collection(db, 'userProgress'));
        const docs: UserDoc[] = snap.docs.map((d) => {
          const data = d.data() as any;
          return {
            id: d.id,
            email: data?.email ?? '',
            activity: (data?.activity ?? {}) as Activity,
          };
        });

        const flat: typeof rows = [];
        for (const u of docs) {
          const activity = u.activity ?? {};
          const email = u.email || '(no email)';
          for (const [category, quizzes] of Object.entries(activity)) {
            for (const [quizId, q] of Object.entries(quizzes || {})) {
              const score =
                typeof q?.quizScore === 'number' ? q.quizScore : (q?.quizScore as any) ?? 0;
              const when =
                q?.completedAt ? new Date(q.completedAt).toLocaleString() : '—';
              flat.push({
                userEmail: email,
                category,
                quizId,
                quizScore: score,
                completedAt: when,
              });
            }
          }
        }
        setRows(flat);
      } catch (e: any) {
        console.error(e);
        setError(e?.message || 'Unable to load user progress. Check Firestore rules.');
      } finally {
        setFetching(false);
      }
    };

    run();
  }, [user, loading]);

  if (loading) return <p className="p-8">Loading auth…</p>;
  if (!user) return <p className="p-8">You must be logged in.</p>;

  return (
    <div className="min-h-screen bg-white text-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {fetching && <p>Loading user progress…</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {!fetching && !error && rows.length === 0 && (
        <p>No user progress yet.</p>
      )}

      {!fetching && !error && rows.length > 0 && (
        <div className="overflow-auto">
          <table className="w-full border text-sm text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">User Email</th>
                <th className="px-4 py-2">Category / Quiz</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">Completed At</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td className="border px-4 py-2">{r.userEmail}</td>
                  <td className="border px-4 py-2">
                    {r.category} / {r.quizId}
                  </td>
                  <td className="border px-4 py-2">{r.quizScore}/1</td>
                  <td className="border px-4 py-2">{r.completedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}