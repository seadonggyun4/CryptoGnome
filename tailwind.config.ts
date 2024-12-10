/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 'class' 기반으로 다크 모드 활성화
  content: ['./src/**/*.{js,ts,jsx,tsx}'], // Tailwind 적용 경로
  theme: {
    extend: {
      colors: {
        primary: '#FCD535',
        primaryHover: '#F0B90B',
        error:  '#E33B54',
        success: '#0ECB81',
        textLink: '#C99400',
        badgeBg: "rgba(240, 185, 11, 0.1)",
        // 라이트 모드
        light:{
          line: '#EAECEF',
          disable: '#EAECEF',
          iconNormal: '#929AA5',
          bg: '#F5F5F5',
          // bg1: '#FFFFFF',
          bg1: 'rgba(255, 255, 255, 0.7)',
          primaryText: "#202630",
        },
        // 다크모드
        dark:{
          line: '#2B3139',
          disable: '#474D57',
          iconNormal: '#848E9C',
          bg: '#0B0E11',
          // bg1: '#181A20',
          bg1: 'rgba(24, 26, 32, 0.9)',
          primaryText: '#EAECEF',
        },
      },
    },
  },
  plugins: [],
};
