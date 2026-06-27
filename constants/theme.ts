// ─── Dark Theme — "Midnight Lens" ──────────────────────────
// Deep space navy blacks with golden-hour amber as the signature accent
const darkColors = {
  background:    '#07090F',  // near-black deep navy
  surface:       '#0C1020',  // dark blue surface
  card:          '#131B2E',  // card background
  cardHighlight: '#1A2440',  // selected/active card
  primary:       '#F5A623',  // golden-hour amber — brand color
  primaryDark:   '#C07B0D',
  primaryLight:  '#FFD080',
  secondary:     '#00C4A7',  // ocean teal — nature/water
  accent:        '#FF4757',  // sunset red
  success:       '#2ED573',
  warning:       '#FFA502',
  text:          '#EEF2FF',  // slightly blue-white
  textSecondary: '#8897B4',  // muted slate
  textMuted:     '#3A4A66',  // very muted
  border:        '#1A2540',
  divider:       '#0F1825',
  // Sensor type badge colors
  fullframe:     '#F5A623',
  apsc:          '#00C4A7',
  m43:           '#2ED573',
  mediumformat:  '#CE93D8',
  dslr:          '#FF8A65',
};

// ─── Light Theme — "Studio White" ──────────────────────────
// Warm studio light feel; amber accent on a cool cream background
const lightColors = {
  background:    '#EEF1F8',  // cool near-white
  surface:       '#FFFFFF',
  card:          '#FFFFFF',
  cardHighlight: '#F5F7FF',
  primary:       '#B8720D',  // darker amber for contrast on white
  primaryDark:   '#8A5200',
  primaryLight:  '#F5A623',
  secondary:     '#007A68',  // darker teal
  accent:        '#C0392B',
  success:       '#1E8449',
  warning:       '#9A5600',
  text:          '#0B0F1E',  // very dark navy
  textSecondary: '#4A5470',
  textMuted:     '#909DC0',
  border:        '#D0D8EC',
  divider:       '#E5EAF5',
  // Sensor type badge colors (darker for light bg)
  fullframe:     '#B8720D',
  apsc:          '#007A68',
  m43:           '#1E8449',
  mediumformat:  '#8E24AA',
  dslr:          '#BF360C',
};

const spacing = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
};

const radius = {
  sm:    8,
  md:    12,
  lg:    16,
  xl:    24,
  round: 999,
};

const typography = {
  h1:      { fontSize: 28, fontWeight: '700' as const, letterSpacing: -0.5 },
  h2:      { fontSize: 22, fontWeight: '700' as const, letterSpacing: -0.3 },
  h3:      { fontSize: 18, fontWeight: '600' as const, letterSpacing: -0.2 },
  h4:      { fontSize: 15, fontWeight: '600' as const },
  body:    { fontSize: 15, fontWeight: '400' as const },
  caption: { fontSize: 13, fontWeight: '400' as const },
  small:   { fontSize: 11, fontWeight: '500' as const, letterSpacing: 0.5 },
};

export const darkTheme = {
  colors:     darkColors,
  spacing,
  radius,
  typography,
  isDark: true,
} as const;

export const lightTheme = {
  colors:     lightColors,
  spacing,
  radius,
  typography,
  isDark: false,
} as const;

// Default export stays dark so any file that hasn't migrated to useAppTheme() still works
export const theme = darkTheme;

export type ThemeColors = { readonly [K in keyof typeof darkColors]: string };

export type Theme = {
  readonly colors:     ThemeColors;
  readonly spacing:    typeof spacing;
  readonly radius:     typeof radius;
  readonly typography: typeof typography;
  readonly isDark:     boolean;
};
