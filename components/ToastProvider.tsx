'use client';
import { ToastProvider as RadixToastProvider } from '@radix-ui/react-toast';
import { ReactNode } from 'react';

export function ToastProvider({ children }: { children: ReactNode }) {
  return <RadixToastProvider duration={3000}>{children}</RadixToastProvider>;
}