/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: {
          DEFAULT: '#0F172A',
          secondary: '#1E293B',
          elevated: '#334155',
        },
        brand: {
          teal: '#14B8A6',
          'teal-light': '#5EEAD4',
          'teal-dark': '#0F766E',
          violet: '#8B5CF6',
          'violet-light': '#C4B5FD',
          amber: '#F59E0B',
          'amber-light': '#FCD34D',
        },
        axis: {
          'enseignant-savoir': '#14B8A6',
          'enseignant-eleve': '#F59E0B',
          'eleve-savoir': '#8B5CF6',
        },
        ethics: {
          minimal: '#14B8A6',
          partner: '#22C55E',
          dominant: '#F59E0B',
          total: '#EF4444',
        },
        text: {
          DEFAULT: '#F8FAFC',
          emphasized: '#F1F5F9',
          secondary: '#E2E8F0',
          muted: '#64748B',
        },
        semantic: {
          success: '#10B981',
          error: '#EF4444',
          info: '#3B82F6',
          warning: '#F59E0B',
        },
      },
      transitionDuration: {
        DEFAULT: '200ms',
        slow: '400ms',
      },
    },
  },
  plugins: [],
};
