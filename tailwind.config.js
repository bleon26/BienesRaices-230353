/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'],
  theme: {
    extend: {
      colors:{
        negro:'#000000',
        azulclaro:'#00B2CA',
        blanco:'#FFFFFF',
        morado:'#564787',
        azulrey:'#1B2CC1',
      }
    },
  },
  plugins: [],
}

