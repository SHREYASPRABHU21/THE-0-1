'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { ThemeName, ThemeColors } from './themes';
import { themes, defaultTheme, createThemeCSSVariables } from './themes';

interface ThemeContextValue {
  currentTheme: ThemeName;
  theme: ThemeColors;
  setTheme: (name: ThemeName) => void;
  availableThemes: ThemeColors[];
}

const defaultContextValue: ThemeContextValue = {
  currentTheme: defaultTheme,
  theme: themes[defaultTheme],
  setTheme: () => {},
  availableThemes: Object.values(themes),
};

const ThemeContext = createContext<ThemeContextValue>(defaultContextValue);

export function ThemeProvider({ children, initialTheme = defaultTheme }: { children: ReactNode; initialTheme?: ThemeName }) {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>(initialTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('magazine-theme') as ThemeName | null;
    if (saved && themes[saved]) {
      setCurrentTheme(saved);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const vars = createThemeCSSVariables(themes[currentTheme]);
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    localStorage.setItem('magazine-theme', currentTheme);
  }, [currentTheme, mounted]);

  const setTheme = (name: ThemeName) => {
    setCurrentTheme(name);
  };

  const value = mounted
    ? { currentTheme, theme: themes[currentTheme], setTheme, availableThemes: Object.values(themes) }
    : defaultContextValue;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}