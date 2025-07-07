'use client';
import { useEffect, useState, useRef } from 'react';
import { createClient } from '@supabase/supabase-js';
import * as Toast from '@radix-ui/react-toast';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

type Specialty = {
  id: string;
  name: string;
  procedures: { id: string; name: string }[];
};

export default function ReferralForm() {
  const [catalog, setCatalog] = useState<Specialty[]>([]);
  const [selected, setSelected] = useState<string>('');
  const [checked, setChecked] = useState<{ [id: string]: boolean }>({});
  const [patient, setPatient] = useState('');
  const [instructions, setInstructions] = useState('');
  const [open, setOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('specialties')
        .select('id,name,procedures(id,name)')
        .order('name');
      setCatalog((data || []) as any);
    })();
  }, []);

  const procedures = catalog.find((s) => s.id === selected)?.procedures ?? [];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await supabase.from('referrals').insert({
      patient_name: patient,
      specialty_id: selected,
      procedure_ids: Object.keys(checked).filter((id) => checked[id]),
      special_instructions: instructions,
      status: 'Pending'
    });
    setToastMsg('Referral submitted!');
    setOpen(true);
    setPatient('');
    setInstructions('');
    setChecked({});
  };

  const startDictation = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;
    if (!recognitionRef.current) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setInstructions((prev) => (prev ? prev + ' ' + text : text));
      };
    }
    recognitionRef.current.start();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          className="border p-2 rounded w-full"
          placeholder="Patient Name"
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          required
        />

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="border p-2 rounded w-full"
          required
        >
          <option value="">Select specialty…</option>
          {catalog.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        {procedures.length > 0 && (
          <div className="grid gap-2">
            {procedures.map((p) => (
              <label key={p.id} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  checked={checked[p.id] || false}
                  onChange={() =>
                    setChecked((prev) => ({
                      ...prev,
                      [p.id]: !prev[p.id]
                    }))
                  }
                />
                {p.name}
              </label>
            ))}
          </div>
        )}

        <textarea
          placeholder="Special instructions…"
          className="border p-2 rounded w-full min-h-[120px]"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <button
          type="button"
          onClick={startDictation}
          className="bg-gray-100 p-2 rounded mb-2"
        >
          🎤 Dictate
        </button>

        <button
          type="submit"
          className="bg-brand text-white px-4 py-2 rounded hover:bg-teal-800"
        >
          Submit
        </button>
      </form>

      <Toast.Root open={open} onOpenChange={setOpen}>
        <Toast.Title className="bg-brand text-white px-3 py-2 rounded">
          {toastMsg}
        </Toast.Title>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-4 right-4 z-50" />
    </>
  );
}