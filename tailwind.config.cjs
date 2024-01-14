/** @type {import('tailwindcss').Config}*/
const config = {
  content: ["./src/**/*.{html,js,svelte,ts}"],

  theme: {
    extend: {
      colors: {
        'primary-10': '#E3E7FE',
        'primary-20': '#CDD4FC',
        'primary-50': '#A3AFF0',
        'primary-100': '#7786DE',
        'primary-200': '#5363ba',
        'error-50':'#ffdddd',
        'error-70':'#f49c9c',
        'error-100': "#d92d20",
        'error-200':'#a8170d',

        // status
        'done-100':'#027A48',
        'done-50':'#ECFDF3',
        'warn-50':'#ffffcc',
        'warn-100':'#ffeb3b',
      }
    },
  },

  plugins: [],
};

module.exports = config;
