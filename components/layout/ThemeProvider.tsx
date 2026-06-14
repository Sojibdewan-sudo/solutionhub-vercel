'use client'
import { ThemeProvider as T } from 'next-themes'
export function ThemeProvider({ children, ...p }: { children: React.ReactNode; [k: string]: any }) {
  return <T {...p}>{children}</T>
}
