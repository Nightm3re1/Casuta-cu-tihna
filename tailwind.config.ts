import type { Config } from 'tailwindcss';

/**
 * Brand tokens for Căsuța cu Tihnă.
 * Palette is derived from the property itself: Făgăraș spruce, 1923 oak timber,
 * limewashed plaster and the brass of old door furniture.
 * See BRAND.md — swapping in the exact Instagram palette is a one-file change.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    // Declared in full (rather than via extend) so `xs` sorts before `sm`
    // instead of being appended after every other breakpoint.
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        forest: {
          50: '#F1F5F2',
          100: '#DCE6DF',
          200: '#B4C8BB',
          300: '#84A390',
          400: '#5A7A62',
          500: '#3D5C48',
          600: '#2E4737',
          700: '#22362A',
          800: '#18271E',
          900: '#101C16',
          950: '#0A120E',
        },
        oak: {
          100: '#F0E3D2',
          200: '#DFC7A6',
          300: '#C9A374',
          400: '#B0834D',
          500: '#96683A',
          600: '#7A522E',
          700: '#5E3F24',
        },
        brass: {
          300: '#E0C287',
          400: '#D0A85E',
          500: '#BE8F3E',
          600: '#856026',
        },
        ember: '#B85C38',
        cream: '#FAF6EE',
        linen: '#F1E9DA',
        stone: '#D9CDB8',
        ink: '#15120F',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.3rem, 5.4vw, 4.6rem)', { lineHeight: '1.02', letterSpacing: '-0.028em' }],
        'display-lg': ['clamp(2rem, 4.4vw, 3.5rem)', { lineHeight: '1.06', letterSpacing: '-0.024em' }],
        'display-md': ['clamp(1.75rem, 3.4vw, 2.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-sm': ['clamp(1.35rem, 2.2vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.015em' }],
        eyebrow: ['0.75rem', { lineHeight: '1', letterSpacing: '0.18em' }],
      },
      maxWidth: { shell: '78rem', prose: '38rem' },
      
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
        drift: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(1.25rem)' }, to: { opacity: '1', transform: 'none' } },
        'smoke-rise': {
          '0%': { opacity: '0', transform: 'translate(0,0) scale(0.5)' },
          '20%': { opacity: '0.22' },
          '100%': { opacity: '0', transform: 'translate(-16px,-58px) scale(1.7)' },
        },
        'scroll-cue': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '35%': { opacity: '1' },
          '100%': { transform: 'translateY(300%)', opacity: '0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        'smoke-rise': 'smoke-rise 4.5s ease-out infinite',
        'scroll-cue': 'scroll-cue 2.2s cubic-bezier(0.4,0,0.2,1) infinite',
      },
    },
  },
  plugins: [],
};
export default config;
