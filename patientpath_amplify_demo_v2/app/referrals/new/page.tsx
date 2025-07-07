import ReferralForm from '../../../components/ReferralForm';

export default function NewReferralPage() {
  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-semibold mb-6">Create Referral</h1>
      <ReferralForm />
    </main>
  );
}