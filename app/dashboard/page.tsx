'use client';
import { useEffect,useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
const sb=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
export default function Dashboard(){
  const [rows,setRows]=useState<any[]>([]);
  useEffect(()=>{sb.from('referrals').select('*').order('created_at',{ascending:false}).then(r=>setRows(r.data||[]));},[]);
  return(
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <Link href="/referrals/new" className="btn-primary">New Referral</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rows.map(r=>(
          <div key={r.id} className="rounded-xl bg-white p-4 shadow">
            <h3 className="font-semibold">{r.patient_name}</h3>
            <p className="text-sm text-gray-500">{new Date(r.created_at).toLocaleDateString()}</p>
            <span className="mt-2 inline-block rounded-full bg-gray-100 px-2 py-1 text-xs">{r.status}</span>
          </div>
        ))}
        {rows.length===0&&<p>No referrals yet.</p>}
      </div>
    </>
  );
}