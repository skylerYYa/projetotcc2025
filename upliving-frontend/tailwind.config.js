/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // darkMode: 'class', // Descomente se for implementar seletor de modo dark
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fonte padrão
      },
      colors: {
        'upliving-primary': { // Nosso verde/esmeralda principal
          light: '#34d399', // emerald-400
          DEFAULT: '#10b981', // emerald-500
          dark: '#059669',  // emerald-600
        },
        'upliving-accent': { // Nosso índigo/roxo para acentos secundários
          light: '#818cf8', // indigo-400
          DEFAULT: '#6366f1', // indigo-500
          dark: '#4f46e5',  // indigo-600
        },
        // Cores para modo escuro (exemplo, se for usar)
        'upliving-dark-bg': '#111827',     // gray-900
        'upliving-dark-card': '#1f2937',    // gray-800
        'upliving-dark-text': '#d1d5db',    // gray-300
        'upliving-dark-text-dim': '#9ca3af', // gray-400
      },
      animation: {
        'pulse-border': 'pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-border-slow': 'pulse-border 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
      },
      keyframes: {
        'pulse-border': {
          '0%, 100%': { borderColor: 'currentColor' },
          '50%': { borderColor: 'transparent' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('tailwind-scrollbar'), // Para estilização da scrollbar
  ],
}