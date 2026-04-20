/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'Playfair Display', 'serif'],
        mono: ['Menlo', 'Consolas', 'monospace'],
      },
      colors: {
        background: {
          DEFAULT: 'rgb(var(--bg-primary) / <alpha-value>)',
          card: 'rgb(var(--bg-card) / <alpha-value>)',
          secondary: 'rgb(var(--bg-card) / <alpha-value>)',
          elevated: 'rgb(var(--bg-elevated) / <alpha-value>)',
          pressed: 'rgb(var(--bg-pressed) / <alpha-value>)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          DEFAULT: 'var(--border-normal)',
          focus: 'rgba(15, 118, 110, 0.4)',
        },
        brand: {
          teal: 'rgb(var(--teal-medium) / <alpha-value>)',
          'teal-primary': 'rgb(var(--teal-primary) / <alpha-value>)',
          'teal-medium': 'rgb(var(--teal-medium) / <alpha-value>)',
          'teal-light': 'rgb(var(--teal-light) / <alpha-value>)',
          'teal-subtle': 'rgb(var(--teal-subtle) / <alpha-value>)',
          'teal-text': 'rgb(var(--teal-text) / <alpha-value>)',
          'teal-dark': 'rgb(var(--teal-primary) / <alpha-value>)',
          violet: 'rgb(var(--violet-medium) / <alpha-value>)',
          'violet-primary': 'rgb(var(--violet-primary) / <alpha-value>)',
          'violet-medium': 'rgb(var(--violet-medium) / <alpha-value>)',
          'violet-light': 'rgb(var(--violet-light) / <alpha-value>)',
          'violet-subtle': 'rgb(var(--violet-subtle) / <alpha-value>)',
          'violet-text': 'rgb(var(--violet-text) / <alpha-value>)',
          amber: 'rgb(var(--amber-primary) / <alpha-value>)',
          'amber-primary': 'rgb(var(--amber-primary) / <alpha-value>)',
          'amber-medium': 'rgb(var(--amber-medium) / <alpha-value>)',
          'amber-light': 'rgb(var(--amber-light) / <alpha-value>)',
          'amber-subtle': 'rgb(var(--amber-subtle) / <alpha-value>)',
          'amber-text': 'rgb(var(--amber-text) / <alpha-value>)',
        },
        axis: {
          'enseignant-savoir': 'rgb(var(--teal-primary) / <alpha-value>)',
          'enseignant-eleve': 'rgb(var(--amber-primary) / <alpha-value>)',
          'eleve-savoir': 'rgb(var(--violet-primary) / <alpha-value>)',
        },
        ethics: {
          minimal: 'rgb(var(--ethics-minimal) / <alpha-value>)',
          partner: 'rgb(var(--ethics-partner) / <alpha-value>)',
          dominant: 'rgb(var(--ethics-dominant) / <alpha-value>)',
          total: 'rgb(var(--ethics-total) / <alpha-value>)',
        },
        text: {
          DEFAULT: 'rgb(var(--text-primary) / <alpha-value>)',
          emphasized: 'rgb(var(--text-emphasized) / <alpha-value>)',
          secondary: 'rgb(var(--text-secondary) / <alpha-value>)',
          muted: 'rgb(var(--text-muted) / <alpha-value>)',
          disabled: 'rgb(var(--text-muted) / <alpha-value>)',
        },
        semantic: {
          success: '#059669',
          error: '#DC2626',
          info: 'rgb(var(--teal-primary) / <alpha-value>)',
          warning: 'rgb(var(--amber-primary) / <alpha-value>)',
        },
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        focus: '0 0 0 3px rgba(15, 118, 110, 0.15)',
      },
      borderRadius: {
        DEFAULT: '4px',
        lg: '8px',
        xl: '12px',
      },
      transitionDuration: {
        DEFAULT: '200ms',
        slow: '400ms',
      },
    },
  },
  plugins: [],
};
