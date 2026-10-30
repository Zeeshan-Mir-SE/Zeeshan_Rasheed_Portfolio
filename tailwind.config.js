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
        // Dark palette: black, cobalt blue, and acid lime
        night: {
          bg: '#05070A',
          bg2: '#0B1020',
          star: '#F3EEE6',
          accent: '#4169E1',
          accent2: '#C7F000',
          text: '#F3EEE6',
          glass: 'rgba(11,16,32,0.86)',
        },
      },
      boxShadow: {
        glow: '0 0 44px rgba(65,105,225,0.36)',
        'glow-sun': '0 0 60px rgba(253,183,80,0.45)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
