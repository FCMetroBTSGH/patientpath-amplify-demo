import Link from 'next/link';

export default function Home() {
  return (
    <section className="text-center space-y-6">
      <h1 className="text-5xl font-extrabold">PatientPath</h1>
      <p className="text-lg">Streamlined referral management for modern practices.</p>
      <div className="flex justify-center gap-4">
        <Link href="/dashboard" className="btn-primary">Dashboard</Link>
        <Link href="/referrals/new" className="btn-primary">New Referral</Link>
      </div>
    </section>
  );
}