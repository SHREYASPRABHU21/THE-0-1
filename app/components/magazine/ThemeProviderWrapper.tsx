'use client';

import { ThemeProvider } from '@/lib/theme-context';
import { ReactNode } from 'react';

export function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}