/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'nox-bg': '#1A0F0A',
        'nox-fg': '#F5E6D3',
        'nox-accent': '#D4A574',
        'nox-muted': '#3D2817',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '15vw': '15vw',
      },
    },
  },
  plugins: [],
};
