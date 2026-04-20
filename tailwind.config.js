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
          DEFAULT: '#FAFAF9',
          card: '#FFFFFF',
          secondary: '#FFFFFF',
          elevated: '#F8FAFC',
          pressed: '#F1F5F9',
        },
        border: {
          subtle: 'rgba(15, 23, 42, 0.06)',
          DEFAULT: 'rgba(15, 23, 42, 0.12)',
          focus: 'rgba(15, 118, 110, 0.4)',
        },
        brand: {
          teal: '#14B8A6',
          'teal-primary': '#0F766E',
          'teal-medium': '#14B8A6',
          'teal-light': '#E6F2F0',
          'teal-subtle': '#F0FDFA',
          'teal-text': '#0F4B44',
          'teal-dark': '#0F766E',
          violet: '#7C3AED',
          'violet-primary': '#7C3AED',
          'violet-medium': '#8B5CF6',
          'violet-light': '#F0EAFE',
          'violet-subtle': '#F5F3FF',
          'violet-text': '#4C1D95',
          amber: '#D97706',
          'amber-primary': '#D97706',
          'amber-medium': '#F59E0B',
          'amber-light': '#FEF3E6',
          'amber-subtle': '#FFFBEB',
          'amber-text': '#854F0B',
        },
        axis: {
          'enseignant-savoir': '#0F766E',
          'enseignant-eleve': '#D97706',
          'eleve-savoir': '#7C3AED',
        },
        ethics: {
          minimal: '#0F766E',
          partner: '#059669',
          dominant: '#D97706',
          total: '#DC2626',
        },
        text: {
          DEFAULT: '#0F172A',
          emphasized: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
          disabled: '#CBD5E1',
        },
        semantic: {
          success: '#059669',
          error: '#DC2626',
          info: '#0F766E',
          warning: '#D97706',
        },
      },
      boxShadow: {
        sm: '0 1px 2px rgba(15, 23, 42, 0.04)',
        DEFAULT: '0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)',
        md: '0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)',
        lg: '0 4px 6px rgba(15, 23, 42, 0.07), 0 2px 4px rgba(15, 23, 42, 0.05)',
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
