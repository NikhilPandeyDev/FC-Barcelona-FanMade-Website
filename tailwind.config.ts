import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#060709',
        foreground: '#F0F2F5',
        muted: {
          DEFAULT: '#141824',
          foreground: '#8E95A5',
        },
        card: {
          DEFAULT: '#0D101A',
          foreground: '#F0F2F5',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        blau: {
          50: '#E8F1FC',
          100: '#C7DDF8',
          200: '#94BFF4',
          300: '#5C9DEE',
          400: '#2A7CE8',
          500: '#004D98', // Official Blau
          600: '#003F80',
          700: '#003166',
          800: '#00234D',
          900: '#001633',
          950: '#000C1F',
        },
        grana: {
          50: '#FDEBF1',
          100: '#F9CCD9',
          200: '#F299B4',
          300: '#EB668E',
          400: '#E43369',
          500: '#A50044', // Official Grana
          600: '#8A0039',
          700: '#6E002D',
          800: '#520022',
          900: '#360017',
          950: '#21000E',
        },
        gold: {
          50: '#FEF9E6',
          100: '#FDF1BF',
          200: '#FBE895',
          300: '#F8DF6B',
          400: '#F5D741',
          500: '#EDBB00', // Senyera Gold
          600: '#C99E00',
          700: '#9E7C00',
          800: '#735B00',
          900: '#4D3C00',
        },
        obsidian: {
          800: '#181C26',
          850: '#12151F',
          900: '#0C0E14',
          950: '#060709',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-sans)',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'var(--font-display)',
          'Syne',
          'Cabinet Grotesk',
          'Impact',
          'Arial Black',
          'sans-serif',
        ],
        mono: [
          'var(--font-mono)',
          'JetBrains Mono',
          'Menlo',
          'Monaco',
          'Consolas',
          'monospace',
        ],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'blaugrana-glow':
          'radial-gradient(circle at 50% 0%, rgba(0, 77, 152, 0.25) 0%, rgba(165, 0, 68, 0.2) 40%, rgba(6, 7, 9, 0) 70%)',
        'blaugrana-diagonal':
          'linear-gradient(135deg, rgba(0, 77, 152, 0.6) 0%, rgba(165, 0, 68, 0.6) 100%)',
        'subtle-grid':
          'linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
      },
      keyframes: {
        pulseSlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'pulse-slow': 'pulseSlow 6s ease-in-out infinite',
        float: 'float 5s ease-in-out infinite',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
};

export default config;
