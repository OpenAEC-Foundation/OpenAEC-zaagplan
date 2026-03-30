/**
 * OpenAEC Design System Kleuren
 * Dark theme met amber accent
 * Gebruik deze constanten voor consistente kleuren door de hele applicatie
 */

export const colors = {
  // Achtergrond
  bg: '#36363E',
  bgLighter: '#44444C',
  bgInput: '#2E2E36',
  bgCanvas: '#1a1a2e',

  // Accent (Amber)
  accent: '#D97706',
  accentHover: '#EA580C',

  // Tekst
  text: '#FAFAF9',
  textSecondary: 'rgba(250, 250, 249, 0.6)',
  textMuted: 'rgba(250, 250, 249, 0.5)',

  // Borders
  border: 'rgba(217, 119, 6, 0.25)',
  borderSubtle: 'rgba(217, 119, 6, 0.15)',

  // Status
  success: '#16A34A',
  danger: '#f87171',
  warning: '#F59E0B',
  info: '#60A5FA',

  // Legacy aliases (voor backward compatibility)
  violet: '#36363E',
  violetLight: '#44444C',
  verdigris: '#D97706',
  verdigrisLight: '#EA580C',
  yellow: '#F59E0B',
  magenta: '#f87171',
  peach: '#f87171',

  // Neutrals (dark theme)
  white: '#FAFAF9',
  gray50: '#36363E',
  gray100: '#3a3a42',
  gray200: '#44444C',
  gray300: '#52525a',
  gray400: 'rgba(250, 250, 249, 0.4)',
  gray500: 'rgba(250, 250, 249, 0.5)',
  gray600: 'rgba(250, 250, 249, 0.6)',
  gray700: 'rgba(250, 250, 249, 0.8)',
  gray800: 'rgba(250, 250, 249, 0.9)',
}

// Tailwind class mappings voor veelgebruikte combinaties
export const colorClasses = {
  primary: 'bg-oaec-accent text-oaec-bg',
  secondary: 'bg-oaec-bg-lighter text-oaec-text',
  accent: 'bg-oaec-warning text-oaec-bg',
  error: 'bg-oaec-danger text-oaec-bg',
  neutral: 'bg-oaec-bg text-oaec-text-secondary',
}
