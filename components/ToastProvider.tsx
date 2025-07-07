'use client';
import { ReactNode } from 'react';
import { ToastProvider as RadixToastProvider } from '@radix-ui/react-toast';

export function ToastProvider({ children }: { children: ReactNode }) {
  return <RadixToastProvider duration={3000}>{children}</RadixToastProvider>;
}