'use client';
import { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import * as Toast from '@radix-ui/react-toast';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

declare global { interface Window { webkitSpeechRecognition:any; SpeechRecognition:any; } }

type Specialty = {id:string;name:string;procedures:{id:string;name:string}[]};

export default function ReferralForm() {
  const [catalog,setCatalog]=useState<Specialty[]>([]);
  const [selected,setSelected]=useState('');
  const [checked,setChecked]=useState<{[id:string]:boolean}>({});
  const [patient,setPatient]=useState('');
  const [instructions,setInstructions]=useState('');
  const [open,setOpen]=useState(false);

  useEffect(()=>{(async()=>{
    const {data}=await supabase.from('specialties').select('id,name,procedures(id,name)').order('name');
    setCatalog(data||[]);
  })();},[]);
  const procedures=catalog.find(s=>s.id===selected)?.procedures||[];

  const submit=async(e:any)=>{e.preventDefault();
    await supabase.from('referrals').insert({
      patient_name:patient,
      specialty_id:selected,
      procedure_ids:Object.keys(checked).filter(id=>checked[id]),
      special_instructions:instructions,
      status:'Pending'
    });
    setPatient('');setInstructions('');setChecked({});setOpen(true);
  };
  return(
    <>
    <form onSubmit={submit} className="space-y-4">
      <input className="border p-2 rounded w-full" placeholder="Patient Name" value={patient} onChange={e=>setPatient(e.target.value)} required/>
      <select value={selected} onChange={e=>setSelected(e.target.value)} className="border p-2 rounded w-full" required>
        <option value="">Select specialty…</option>
        {catalog.map(s=><option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      {procedures.length>0&&<div className="grid gap-2">
        {procedures.map(p=><label key={p.id} className="flex items-center gap-2"><input type="checkbox" checked={checked[p.id]||false} onChange={()=>setChecked(prev=>({...prev,[p.id]:!prev[p.id]}))}/>{p.name}</label>)}
      </div>}
      <textarea className="border p-2 rounded w-full min-h-[100px]" placeholder="Special instructions…" value={instructions} onChange={e=>setInstructions(e.target.value)} />
      <button className="btn-primary" type="submit">Submit</button>
    </form>
    <Toast.Root open={open} onOpenChange={setOpen}><Toast.Title className="bg-brand text-white px-3 py-2 rounded">Referral submitted!</Toast.Title></Toast.Root>
    <Toast.Viewport className="fixed bottom-4 right-4" />
    </>
  );
}