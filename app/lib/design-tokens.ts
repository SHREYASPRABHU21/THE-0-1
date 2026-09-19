export const designTokens = {
  spacing: {
    base: 4,
    scale: [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192, 256],
  },
  typography: {
    fontFamilies: {
      sans: 'var(--font-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
      serif: 'var(--font-serif, Georgia, Cambria, "Times New Roman", serif)',
      mono: 'var(--font-mono, ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace)',
      display: 'var(--font-display, var(--font-sans))',
    },
    fontWeights: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeights: {
      tight: 1.1,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2,
    },
    scale: {
      micro: { size: 'clamp(0.625rem, 0.58rem + 0.2vw, 0.6875rem)', lineHeight: 1.4, letterSpacing: '0.04em' },
      small: { size: 'clamp(0.75rem, 0.7rem + 0.25vw, 0.8125rem)', lineHeight: 1.4, letterSpacing: '0.02em' },
      body: { size: 'clamp(1rem, 0.95rem + 0.25vw, 1.0625rem)', lineHeight: 1.6, letterSpacing: '0' },
      bodyLarge: { size: 'clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem)', lineHeight: 1.6, letterSpacing: '0' },
      h5: { size: 'clamp(1rem, 0.95rem + 0.25vw, 1.0625rem)', lineHeight: 1.4, letterSpacing: '0.01em', weight: 600 },
      h4: { size: 'clamp(1.125rem, 1.05rem + 0.35vw, 1.25rem)', lineHeight: 1.35, letterSpacing: '0.01em', weight: 600 },
      h3: { size: 'clamp(1.375rem, 1.25rem + 0.6vw, 1.625rem)', lineHeight: 1.3, letterSpacing: '0.01em', weight: 600 },
      h2: { size: 'clamp(1.75rem, 1.55rem + 1vw, 2.125rem)', lineHeight: 1.25, letterSpacing: '0.01em', weight: 600 },
      h1: { size: 'clamp(2.25rem, 1.9rem + 1.75vw, 3rem)', lineHeight: 1.2, letterSpacing: '0.01em', weight: 600 },
      display: { size: 'clamp(3rem, 2.5rem + 2.5vw, 4.5rem)', lineHeight: 1.1, letterSpacing: '0.02em', weight: 700 },
      runningHead: { size: 'clamp(0.5625rem, 0.52rem + 0.2vw, 0.625rem)', lineHeight: 1.4, letterSpacing: '0.28em', weight: 500, textTransform: 'uppercase' },
      pageNumber: { size: 'clamp(0.5625rem, 0.52rem + 0.2vw, 0.625rem)', lineHeight: 1.4, letterSpacing: '0.24em', weight: 500, textTransform: 'uppercase' },
      caption: { size: 'clamp(0.6875rem, 0.64rem + 0.2vw, 0.75rem)', lineHeight: 1.4, letterSpacing: '0.02em' },
    },
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    '3xl': 28,
    full: 9999,
  },
  shadows: {
    level1: '0 2px 8px rgba(0, 0, 0, 0.06)',
    level2: '0 8px 24px rgba(0, 0, 0, 0.08)',
    level3: '0 16px 48px rgba(0, 0, 0, 0.12)',
    level4: '0 24px 64px rgba(0, 0, 0, 0.16)',
    page: '0 20px 60px rgba(28, 25, 23, 0.15)',
    pageHover: '0 28px 80px rgba(28, 25, 23, 0.2)',
    inner: 'inset 0 2px 8px rgba(0, 0, 0, 0.06)',
    focus: '0 0 0 2px var(--color-focus, #d4a843)',
  },
  borders: {
    thin: '1px solid var(--color-border, rgba(28, 25, 23, 0.12))',
    medium: '2px solid var(--color-border, rgba(28, 25, 23, 0.12))',
    thick: '3px solid var(--color-border, rgba(28, 25, 23, 0.12))',
    dashed: '1px dashed var(--color-border, rgba(28, 25, 23, 0.12))',
    focus: '2px solid var(--color-focus, #d4a843)',
  },
  breakpoints: {
    mobile: 640,
    tablet: 768,
    desktop: 1024,
    wide: 1440,
    ultra: 1920,
  },
  motion: {
    durations: {
      instant: '0ms',
      fast: '120ms',
      normal: '200ms',
      slow: '300ms',
      slower: '500ms',
      flip: '800ms',
    },
    easings: {
      linear: 'linear',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      flip: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    },
    reducedMotion: {
      durations: {
        instant: '0ms',
        fast: '0.01ms',
        normal: '0.01ms',
        slow: '0.01ms',
        slower: '0.01ms',
        flip: '0.01ms',
      },
    },
  },
  zIndex: {
    base: 0,
    dropdown: 100,
    sticky: 200,
    modal: 300,
    popover: 400,
    tooltip: 500,
    toast: 600,
    book: 1000,
  },
  texture: {
    paper: {
      opacity: 0.04,
      scale: 28,
      enabled: true,
    },
    cover: {
      opacity: 0.06,
      scale: 32,
      enabled: true,
    },
  },
} as const;

export type DesignTokens = typeof designTokens;

export function getSpacing(value: number): string {
  return `${value * designTokens.spacing.base}px`;
}

export function getSpacingRem(value: number): string {
  return `${value * designTokens.spacing.base / 16}rem`;
}