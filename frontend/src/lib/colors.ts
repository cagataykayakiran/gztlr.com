/**
 * GZTLR Design System — Color Constants
 * Serious dark editorial palette inspired by Bloomberg Terminal + Linear + daily.dev
 */

export const COLORS = {
  // Backgrounds
  BG_PRIMARY: '#09090B',
  BG_SURFACE: '#111113',
  BG_SURFACE_HOVER: '#1A1A1D',
  BG_ELEVATED: '#161618',
  BG_INSET: '#0D0D0F',

  // Borders
  BORDER: '#1F1F23',
  BORDER_HOVER: '#2A2A30',
  BORDER_ACTIVE: '#2496ED',

  // Text
  TEXT_PRIMARY: '#EDEDEF',
  TEXT_SECONDARY: '#A0A0A8',
  TEXT_TERTIARY: '#63636E',
  TEXT_MUTED: '#3F3F46',

  // Brand
  BRAND: '#2496ED',
  BRAND_HOVER: '#1C82D2',
  BRAND_SUBTLE: '#2496ED14',
  BRAND_MUTED: '#2496ED1F',

  // Semantic
  SUCCESS: '#22C55E',
  WARNING: '#EAB308',
  ERROR: '#EF4444',
  INFO: '#2496ED',

  // Accents for category tags
  ACCENT_RUST: '#F97316',
  ACCENT_EMERALD: '#10B981',
  ACCENT_VIOLET: '#8B5CF6',
  ACCENT_AMBER: '#F59E0B',
  ACCENT_ROSE: '#F43F5E',
  ACCENT_CYAN: '#06B6D4',
} as const;

export type ColorKey = keyof typeof COLORS;
