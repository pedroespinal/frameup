// ─── Dark Theme — "Midnight Lens" ──────────────────────────
// Premium photography app: deep space with golden-hour amber accent
const darkColors = {
  background:    '#0A0E17',  // Ultra-deep navy (premium feel)
  surface:       '#111829',  // Slightly elevated surface
  card:          '#1A2640',  // Card with subtle depth
  cardHighlight: '#253556',  // Highlighted card
  primary:       '#F5A623',  // Golden-hour amber (photography iconic)
  primaryDark:   '#D68A1E',  // Darker amber for depth
  primaryLight:  '#FFD080',  // Light amber for highlights
  secondary:     '#00D9FF',  // Vibrant cyan (modern, tech-forward)
  accent:        '#FF6B6B',  // Warm red (action & alerts)
  success:       '#51CF66',  // Vibrant green (success)
  warning:       '#FFB84D',  // Warm orange (warning)
  text:          '#F0F4FF',  // Premium off-white (easier on eyes)
  textSecondary: '#9AA8C4',  // Refined secondary text
  textMuted:     '#4A5A7A',  // Premium muted tone
  border:        '#253555',  // Sophisticated borders
  divider:       '#1A2840',  // Subtle dividers
  // Sensor type badge colors (vibrant, modern)
  fullframe:     '#F5A623',  // Golden
  apsc:          '#00D9FF',  // Cyan
  m43:           '#51CF66',  // Green
  mediumformat:  '#DA77F2',  // Purple (premium)
  dslr:          '#FF8C42',  // Warm orange
};

// ─── Light Theme — "Studio White" ──────────────────────────
// Premium studio aesthetic: warm neutrals with photography-forward accents
const lightColors = {
  background:    '#F8FAFC',  // Premium off-white (not pure white)
  surface:       '#FFFFFF',  // Clean white surfaces
  card:          '#FFFFFF',  // Card background
  cardHighlight: '#F0F4FF',  // Subtle highlight
  primary:       '#D68A1E',  // Warm golden-brown (photography)
  primaryDark:   '#A86B0E',  // Rich brown for depth
  primaryLight:  '#F5A623',  // Light amber for accents
  secondary:     '#0891B2',  // Professional cyan
  accent:        '#DC2626',  // Clear red (actions)
  success:       '#16A34A',  // Professional green
  warning:       '#D97706',  // Warm amber (warning)
  text:          '#0F172A',  // Deep navy text (premium)
  textSecondary: '#475569',  // Refined secondary
  textMuted:     '#94A3B8',  // Sophisticated muted
  border:        '#CBD5E1',  // Premium borders
  divider:       '#E2E8F0',  // Clean dividers
  // Sensor type badge colors (vibrant on light)
  fullframe:     '#D68A1E',  // Golden-brown
  apsc:          '#0891B2',  // Cyan
  m43:           '#16A34A',  // Green
  mediumformat:  '#9333EA',  // Purple (premium)
  dslr:          '#EA580C',  // Warm orange
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
