'use client';

import { useTheme } from '@/lib/theme-context';
import type { ThemeName } from '@/lib/themes';

export function ThemeToggle() {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <div className="flex items-center gap-2 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] p-3 shadow-[var(--shadow-level3)]">
        <span className="text-running-head text-[var(--color-text-muted)]">Theme</span>
        <select
          value={currentTheme}
          onChange={(e) => setTheme(e.target.value as ThemeName)}
          className="rounded-md border border-[var(--color-border)] bg-[var(--color-background)] px-3 py-1.5 text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]"
        >
          {availableThemes.map((t) => (
            <option key={t.name} value={t.name}>
              {t.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}