/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        black: '#111118',
        white: '#fdfdfd',
      },
      container: {
        center: true,
        padding: '2rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
