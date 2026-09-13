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
      /**
       * The real brand palette, sampled from the owner's own live site
       * (casuta-cu-tihna.ro) — warm oak, clay and limewash, not invented.
       * The exact values pulled from production are marked ◆.
       */
      colors: {
        // Dark warm neutral: body text and dark sections.
        bark: {
          50: '#F7F5F2',   // ◆ alternate surface
          100: '#EFEAE3',
          200: '#E7E1DA',  // ◆ borders and hairlines
          300: '#CFC4B6',
          400: '#A2917F',
          500: '#8A7768',
          600: '#756357',  // ◆ muted body text
          700: '#544639',
          800: '#3B3028',
          900: '#2E251F',  // ◆ primary text
          950: '#1C1611',
        },
        // The brand accent: aged oak / clay.
        clay: {
          100: '#F0E5D6',
          200: '#DFC9AB',
          300: '#C4A078',
          400: '#A57C4E',
          500: '#7D5936',  // ◆ brand accent — every primary CTA
          600: '#66452A',
          700: '#563C29',  // ◆ deep brown
        },
        ember: '#A5432A',
        cream: '#FBFAF8',  // ◆ page background
        linen: '#F5F3EF',  // ◆ light surface / text on dark
        sand: '#F4F0EB',   // ◆ third surface
        stone: '#E7E1DA',  // ◆ border
        ink: '#2E251F',    // ◆
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
