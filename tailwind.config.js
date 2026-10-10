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
          bg: '#100F0E',
          bg2: '#1B1916',
          star: '#F3EEE6',
          accent: '#E4AE62',
          accent2: '#C9B99F',
          text: '#F3EEE6',
          glass: 'rgba(27,25,22,0.82)',
        },
      },
      boxShadow: {
        glow: '0 0 44px rgba(228,174,98,0.32)',
        'glow-sun': '0 0 60px rgba(253,183,80,0.45)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
