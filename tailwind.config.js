/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Light "sky" palette
        sky: {
          bg: '#EAF4FF',
          bg2: '#CFE8FF',
          sun: '#FDB750',
          text: '#16233B',
          glass: 'rgba(255,255,255,0.55)',
        },
        // Dark "stars" palette
        night: {
          bg: '#050914',
          bg2: '#0B1224',
          star: '#F5F7FF',
          accent: '#8B7CFF',
          accent2: '#33D6C0',
          text: '#EAEFFB',
          glass: 'rgba(16,22,44,0.55)',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(139,124,255,0.35)',
        'glow-sun': '0 0 60px rgba(253,183,80,0.45)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
