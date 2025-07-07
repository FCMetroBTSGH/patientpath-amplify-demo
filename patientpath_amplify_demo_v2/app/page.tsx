import Link from 'next/link';

export default function Home() {
  return (
    <main className="p-10">
      <h1 className="text-4xl font-bold mb-4">PatientPath Demo</h1>
      <p className="mb-6">Streamlined referral management for modern practices.</p>
      <Link
        href="/dashboard"
        className="inline-block bg-brand text-white px-6 py-3 rounded hover:bg-teal-800"
      >
        Go to Dashboard
      </Link>
    </main>
  );
}