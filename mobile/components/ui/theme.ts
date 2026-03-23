import { useMemo } from 'react';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const shadcnTheme = {
  light: {
    background: '#ffffff',
    foreground: '#1f2937',
    card: '#ffffff',
    cardForeground: '#1f2937',
    popover: '#ffffff',
    popoverForeground: '#1f2937',
    primary: '#e62a2b',
    primaryForeground: '#fff5f5',
    secondary: '#f8fafc',
    secondaryForeground: '#1f2937',
    muted: '#f8fafc',
    mutedForeground: '#64748b',
    accent: '#fff1f2',
    accentForeground: '#9f1239',
    destructive: '#dc2626',
    destructiveForeground: '#fff5f5',
    border: '#e2e8f0',
    input: '#e2e8f0',
    ring: '#f87171',
    success: '#059669',
    successForeground: '#ecfdf5',
    kingschat: "#3183ff",
    overlay: 'rgba(15, 23, 42, 0.55)',
    shadow: 'rgba(15, 23, 42, 0.10)',
  },
  dark: {
    background: '#0f172a',
    foreground: '#f8fafc',
    card: '#111827',
    cardForeground: '#f8fafc',
    popover: '#111827',
    popoverForeground: '#f8fafc',
    primary: '#e62a2b',
    primaryForeground: '#fff5f5',
    secondary: '#1e293b',
    secondaryForeground: '#f8fafc',
    muted: '#1e293b',
    mutedForeground: '#94a3b8',
    accent: '#3f1d1d',
    accentForeground: '#fecdd3',
    destructive: '#f87171',
    destructiveForeground: '#fff5f5',
    border: '#334155',
    input: '#334155',
    ring: '#fb7185',
    success: '#10b981',
    successForeground: '#ecfdf5',
    kingschat: "#3183ff",
    overlay: 'rgba(2, 6, 23, 0.72)',
    shadow: 'rgba(2, 6, 23, 0.35)',
  },
} as const;

export type ShadcnPalette = (typeof shadcnTheme)['light'];

export function useThemeTokens() {
  const colorScheme = useColorScheme() ?? 'light';

  return useMemo(
    () => ({
      colorScheme,
      isDark: colorScheme === 'dark',
      colors: shadcnTheme[colorScheme],
    }),
    [colorScheme]
  );
}
