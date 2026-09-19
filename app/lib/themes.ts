import type { DesignTokens } from './design-tokens';

export type ThemeName = 'paper-signal' | 'midnight-circuit' | 'research-blue' | 'data-green';

export interface ThemeColors {
  name: ThemeName;
  label: string;
  description: string;
  colors: {
    background: string;
    surface: string;
    surfaceHover: string;
    surfacePressed: string;
    border: string;
    borderStrong: string;
    text: string;
    textMuted: string;
    textInverted: string;
    primary: string;
    primaryHover: string;
    primaryPressed: string;
    primaryMuted: string;
    secondary: string;
    secondaryHover: string;
    accent: string;
    accentHover: string;
    accentMuted: string;
    focus: string;
    error: string;
    errorMuted: string;
    success: string;
    successMuted: string;
    warning: string;
    warningMuted: string;
    overlay: string;
    shadow: string;
    shadowStrong: string;
    pageBackground: string;
    pageText: string;
    pageBorder: string;
    coverBackground: string;
    coverText: string;
    coverBorder: string;
    runningHead: string;
    pageNumber: string;
    controlBackground: string;
    controlText: string;
    controlBorder: string;
    controlHover: string;
    controlActive: string;
    controlDisabled: string;
    indicatorBackground: string;
    indicatorText: string;
    textureOpacity: number;
    textureScale: number;
  };
}

export const themes: Record<ThemeName, ThemeColors> = {
  'paper-signal': {
    name: 'paper-signal',
    label: 'Paper Signal',
    description: 'Warm ivory, ink black, deep burgundy, muted amber — editorial, warm, premium',
    colors: {
      background: '#f4efe9',
      surface: '#faf9f6',
      surfaceHover: '#f0ebe3',
      surfacePressed: '#e6e0d7',
      border: '#d4cfc7',
      borderStrong: '#b8b0a4',
      text: '#1c1917',
      textMuted: '#78716c',
      textInverted: '#faf9f6',
      primary: '#1c1917',
      primaryHover: '#292524',
      primaryPressed: '#0c0a09',
      primaryMuted: '#78716c',
      secondary: '#8b4513',
      secondaryHover: '#a0522d',
      accent: '#d4a843',
      accentHover: '#c49833',
      accentMuted: '#e8d5a8',
      focus: '#d4a843',
      error: '#b91c1c',
      errorMuted: '#fef2f2',
      success: '#166534',
      successMuted: '#f0fdf4',
      warning: '#854d0e',
      warningMuted: '#fefce8',
      overlay: 'rgba(28, 25, 23, 0.6)',
      shadow: 'rgba(28, 25, 23, 0.15)',
      shadowStrong: 'rgba(28, 25, 23, 0.25)',
      pageBackground: '#faf9f6',
      pageText: '#1c1917',
      pageBorder: '#d4cfc7',
      coverBackground: '#1c1917',
      coverText: '#faf9f6',
      coverBorder: '#292524',
      runningHead: '#78716c',
      pageNumber: '#78716c',
      controlBackground: '#faf9f6',
      controlText: '#1c1917',
      controlBorder: '#d4cfc7',
      controlHover: '#f0ebe3',
      controlActive: '#e6e0d7',
      controlDisabled: '#f5f5f4',
      indicatorBackground: '#faf9f6',
      indicatorText: '#1c1917',
      textureOpacity: 0.04,
      textureScale: 28,
    },
  },
  'midnight-circuit': {
    name: 'midnight-circuit',
    label: 'Midnight Circuit',
    description: 'Near-black, soft white, electric blue, violet accent — tech, dark, futuristic',
    colors: {
      background: '#0a0a0f',
      surface: '#11111a',
      surfaceHover: '#1a1a26',
      surfacePressed: '#242436',
      border: '#2a2a3e',
      borderStrong: '#3a3a52',
      text: '#f0f0f5',
      textMuted: '#8a8a9a',
      textInverted: '#0a0a0f',
      primary: '#f0f0f5',
      primaryHover: '#ffffff',
      primaryPressed: '#d0d0e0',
      primaryMuted: '#8a8a9a',
      secondary: '#00d4ff',
      secondaryHover: '#33ddff',
      accent: '#00d4ff',
      accentHover: '#33ddff',
      accentMuted: '#1a3a4a',
      focus: '#00d4ff',
      error: '#ff4466',
      errorMuted: '#2a0a12',
      success: '#00ff88',
      successMuted: '#0a2a1a',
      warning: '#ffaa00',
      warningMuted: '#2a1a0a',
      overlay: 'rgba(10, 10, 15, 0.8)',
      shadow: 'rgba(0, 0, 0, 0.4)',
      shadowStrong: 'rgba(0, 0, 0, 0.6)',
      pageBackground: '#11111a',
      pageText: '#f0f0f5',
      pageBorder: '#2a2a3e',
      coverBackground: '#050508',
      coverText: '#f0f0f5',
      coverBorder: '#1a1a26',
      runningHead: '#5a5a6e',
      pageNumber: '#5a5a6e',
      controlBackground: '#1a1a26',
      controlText: '#f0f0f5',
      controlBorder: '#2a2a3e',
      controlHover: '#242436',
      controlActive: '#2e2e42',
      controlDisabled: '#14141c',
      indicatorBackground: '#1a1a26',
      indicatorText: '#f0f0f5',
      textureOpacity: 0.03,
      textureScale: 32,
    },
  },
  'research-blue': {
    name: 'research-blue',
    label: 'Research Blue',
    description: 'Pale blue-grey, deep navy, cyan accent — analytical, calm, trust',
    colors: {
      background: '#eef2f7',
      surface: '#f8fafc',
      surfaceHover: '#eef2f7',
      surfacePressed: '#e2e8f0',
      border: '#cbd5e1',
      borderStrong: '#94a3b8',
      text: '#0f172a',
      textMuted: '#64748b',
      textInverted: '#f8fafc',
      primary: '#0f172a',
      primaryHover: '#1e293b',
      primaryPressed: '#020617',
      primaryMuted: '#64748b',
      secondary: '#0891b2',
      secondaryHover: '#06b6d4',
      accent: '#06b6d4',
      accentHover: '#22d3ee',
      accentMuted: '#cffafe',
      focus: '#06b6d4',
      error: '#dc2626',
      errorMuted: '#fef2f2',
      success: '#059669',
      successMuted: '#ecfdf5',
      warning: '#d97706',
      warningMuted: '#fffbeb',
      overlay: 'rgba(15, 23, 42, 0.6)',
      shadow: 'rgba(15, 23, 42, 0.12)',
      shadowStrong: 'rgba(15, 23, 42, 0.2)',
      pageBackground: '#f8fafc',
      pageText: '#0f172a',
      pageBorder: '#cbd5e1',
      coverBackground: '#0f172a',
      coverText: '#f8fafc',
      coverBorder: '#1e293b',
      runningHead: '#64748b',
      pageNumber: '#64748b',
      controlBackground: '#f8fafc',
      controlText: '#0f172a',
      controlBorder: '#cbd5e1',
      controlHover: '#eef2f7',
      controlActive: '#e2e8f0',
      controlDisabled: '#f1f5f9',
      indicatorBackground: '#f8fafc',
      indicatorText: '#0f172a',
      textureOpacity: 0.03,
      textureScale: 28,
    },
  },
  'data-green': {
    name: 'data-green',
    label: 'Data Green',
    description: 'Soft off-white, forest green, acid-lime accent — data, fresh, technical',
    colors: {
      background: '#f0f5f0',
      surface: '#f7faf7',
      surfaceHover: '#eef3ee',
      surfacePressed: '#e5ebe5',
      border: '#c8d4c8',
      borderStrong: '#a3b8a3',
      text: '#142814',
      textMuted: '#5a7a5a',
      textInverted: '#f7faf7',
      primary: '#142814',
      primaryHover: '#1a3a1a',
      primaryPressed: '#0a140a',
      primaryMuted: '#5a7a5a',
      secondary: '#16a34a',
      secondaryHover: '#22c55e',
      accent: '#a3e635',
      accentHover: '#bef264',
      accentMuted: '#f0fdf4',
      focus: '#a3e635',
      error: '#dc2626',
      errorMuted: '#fef2f2',
      success: '#166534',
      successMuted: '#ecfdf5',
      warning: '#d97706',
      warningMuted: '#fffbeb',
      overlay: 'rgba(20, 40, 20, 0.6)',
      shadow: 'rgba(20, 40, 20, 0.12)',
      shadowStrong: 'rgba(20, 40, 20, 0.2)',
      pageBackground: '#f7faf7',
      pageText: '#142814',
      pageBorder: '#c8d4c8',
      coverBackground: '#142814',
      coverText: '#f7faf7',
      coverBorder: '#1a3a1a',
      runningHead: '#5a7a5a',
      pageNumber: '#5a7a5a',
      controlBackground: '#f7faf7',
      controlText: '#142814',
      controlBorder: '#c8d4c8',
      controlHover: '#eef3ee',
      controlActive: '#e5ebe5',
      controlDisabled: '#f0f5f0',
      indicatorBackground: '#f7faf7',
      indicatorText: '#142814',
      textureOpacity: 0.04,
      textureScale: 28,
    },
  },
};

export const defaultTheme: ThemeName = 'paper-signal';

export function getTheme(name: ThemeName): ThemeColors {
  return themes[name];
}

export function getAllThemes(): ThemeColors[] {
  return Object.values(themes);
}

export function getThemeNames(): ThemeName[] {
  return Object.keys(themes) as ThemeName[];
}

export function createThemeCSSVariables(theme: ThemeColors): Record<string, string> {
  const { colors } = theme;
  return {
    '--color-background': colors.background,
    '--color-surface': colors.surface,
    '--color-surface-hover': colors.surfaceHover,
    '--color-surface-pressed': colors.surfacePressed,
    '--color-border': colors.border,
    '--color-border-strong': colors.borderStrong,
    '--color-text': colors.text,
    '--color-text-muted': colors.textMuted,
    '--color-text-inverted': colors.textInverted,
    '--color-primary': colors.primary,
    '--color-primary-hover': colors.primaryHover,
    '--color-primary-pressed': colors.primaryPressed,
    '--color-primary-muted': colors.primaryMuted,
    '--color-secondary': colors.secondary,
    '--color-secondary-hover': colors.secondaryHover,
    '--color-accent': colors.accent,
    '--color-accent-hover': colors.accentHover,
    '--color-accent-muted': colors.accentMuted,
    '--color-focus': colors.focus,
    '--color-error': colors.error,
    '--color-error-muted': colors.errorMuted,
    '--color-success': colors.success,
    '--color-success-muted': colors.successMuted,
    '--color-warning': colors.warning,
    '--color-warning-muted': colors.warningMuted,
    '--color-overlay': colors.overlay,
    '--color-shadow': colors.shadow,
    '--color-shadow-strong': colors.shadowStrong,
    '--color-page-background': colors.pageBackground,
    '--color-page-text': colors.pageText,
    '--color-page-border': colors.pageBorder,
    '--color-cover-background': colors.coverBackground,
    '--color-cover-text': colors.coverText,
    '--color-cover-border': colors.coverBorder,
    '--color-running-head': colors.runningHead,
    '--color-page-number': colors.pageNumber,
    '--color-control-background': colors.controlBackground,
    '--color-control-text': colors.controlText,
    '--color-control-border': colors.controlBorder,
    '--color-control-hover': colors.controlHover,
    '--color-control-active': colors.controlActive,
    '--color-control-disabled': colors.controlDisabled,
    '--color-indicator-background': colors.indicatorBackground,
    '--color-indicator-text': colors.indicatorText,
    '--texture-opacity': String(colors.textureOpacity),
    '--texture-scale': String(colors.textureScale),
  };
}