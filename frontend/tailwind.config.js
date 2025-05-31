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
  'upliving-primary': { // Roxos como cor principal
    light: '#A64182', // Roxo claro
    DEFAULT: '#732457', // Roxo médio (principal)
    dark: '#5A1B45',  // Roxo escuro (um tom mais escuro)
  },
  'upliving-accent': { // Verde usado em detalhes e botões
    light: '#A3BF3B', // Verde claro
    DEFAULT: '#5DA649', // Verde médio
    dark: '#3D7A30',  // Verde escuro
  },
  'upliving-dark-bg': '#111827', // Fundo escuro
  'upliving-dark-card': '#1f2937', // Cartões escuros
  'upliving-dark-text': '#d1d5db', // Texto claro no modo escuro
  'upliving-dark-text-dim': '#9ca3af', // Texto secundário no modo escuro
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