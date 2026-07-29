export const palette = {
  clay: "#C9713D",
  clayDark: "#A85A2E",
  ochre: "#E4A94F",
  forest: "#3E5C4A",
  ink: "#22201B",
  cream: "#F7F3EC",
  sand: "#EFE6D6",
  white: "#FFFFFF",
  charcoal: "#171613",
  slate: "#8B8578",
};

export const lightTheme = {
  mode: "light" as const,
  background: palette.cream,
  surface: palette.white,
  surfaceAlt: palette.sand,
  text: palette.ink,
  textMuted: "#6B6558",
  primary: palette.clay,
  primaryDark: palette.clayDark,
  accent: palette.ochre,
  secondary: palette.forest,
  border: "#E6DCC8",
  shadow: "rgba(34, 32, 27, 0.12)",
  tabBarBackground: "rgba(255,255,255,0.92)",
};

export const darkTheme = {
  mode: "dark" as const,
  background: palette.charcoal,
  surface: "#211F1A",
  surfaceAlt: "#2A2822",
  text: "#F3EFE6",
  textMuted: "#B4AD9D",
  primary: palette.ochre,
  primaryDark: palette.clay,
  accent: palette.clay,
  secondary: "#6E9280",
  border: "#3A362D",
  shadow: "rgba(0,0,0,0.4)",
  tabBarBackground: "rgba(23,22,19,0.92)",
};

export type Theme = typeof lightTheme;

export const radii = {
  sm: 10,
  md: 16,
  lg: 22,
  xl: 28,
  pill: 999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  display: { fontSize: 32, fontWeight: "800" as const, letterSpacing: -0.5 },
  title: { fontSize: 24, fontWeight: "700" as const, letterSpacing: -0.3 },
  heading: { fontSize: 19, fontWeight: "700" as const },
  body: { fontSize: 16, fontWeight: "400" as const, lineHeight: 26 },
  bodyMuted: { fontSize: 14, fontWeight: "400" as const, lineHeight: 22 },
  label: { fontSize: 13, fontWeight: "600" as const, letterSpacing: 0.4 },
  caption: { fontSize: 12, fontWeight: "500" as const },
};
