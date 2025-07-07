import '../globals.css';
import { ReactNode } from 'react';
import { ToastProvider } from '../components/ToastProvider';
import Link from 'next/link';

export const metadata = {
  title: 'PatientPath',
  description: 'PatientPath demo – cloud-native referral workflow'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <header className="appbar">
          <Link href="/" className="font-semibold tracking-wide">PatientPath Demo</Link>
        </header>
        <main className="flex-1 container mx-auto p-6">{children}</main>
        <ToastProvider />
      </body>
    </html>
  );
}