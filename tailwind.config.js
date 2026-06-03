/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Marken-Rot (vorher 118× als #E31E2D hardcoded)
        brand: {
          DEFAULT: '#E31E2D',
          dark: '#c0192a',
          hover: '#dc2626',
          // Heller, lesbarer Akzent für kleine Texte auf dunklem Grund (WCAG-tauglich)
          light: '#FF6B72',
        },
        // Hintergrundfarben — semantische Namen statt Hex-Reigen
        ink: {
          DEFAULT: '#0A0A0A',
          surface: '#111111',
          subtle: '#0D0D0D',
          inset: '#0e0e0e',
        },
        paper: {
          DEFAULT: '#FFFFFF',
          subtle: '#F8F8F8',
          muted: '#F0F0F0',
          inset: '#f5f5f5',
        },
        // Text-Grautöne — semantische Stufen (Light-Mode-Fallback / Karten-Inhalt)
        fg: {
          primary: '#111111',  // Headlines, starke Texte
          secondary: '#444444', // Body
          muted: '#666666',     // Sekundär-Info
          subtle: '#999999',    // Eyebrows, Daten
        },
      },
    },
  },
  plugins: [],
};
