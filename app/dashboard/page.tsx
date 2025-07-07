'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const [referrals, setReferrals] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('referrals')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      setReferrals(data || []);
    })();
  }, []);

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Provider Dashboard</h1>
        <Link
          href="/referrals/new"
          className="bg-brand text-white px-4 py-2 rounded"
        >
          New Referral
        </Link>
      </header>

      <table className="min-w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="p-2 text-left">Patient</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {referrals.map((r) => (
            <tr key={r.id} className="border-t">
              <td className="p-2">{r.patient_name}</td>
              <td className="p-2">
                {new Date(r.created_at).toLocaleDateString()}
              </td>
              <td className="p-2">
                <span className="px-2 py-1 rounded-full text-xs bg-gray-100">
                  {r.status || 'Pending'}
                </span>
              </td>
            </tr>
          ))}
          {referrals.length === 0 && (
            <tr>
              <td className="p-4" colSpan={3}>
                No referrals yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </main>
  );
}