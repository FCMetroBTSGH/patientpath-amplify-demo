import '../globals.css';
import { ReactNode } from 'react';
import { ToastProvider } from '../components/ToastProvider';

export const metadata = {
  title: 'PatientPath',
  description: 'PatientPath demo – cloud-native referral workflow'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-50 text-gray-900">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
