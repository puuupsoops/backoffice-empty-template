
/** @type {import('tailwindcss').Config} */
module.exports = {

  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './utils/**/*.{js,ts}',
    './app.vue',
    './node_modules/flowbite/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        'font-color': 'gray-500',
        'dark-bg-color': '#15171C',
        'dark-bg-default': '#1F2227',
        'dark-font-color': '#A5A7A9',
      },
      keyframes: {
        slideIn: {
          "0%": { opacity: 0, transform: "translateX(100%)" },
          "100%": { opacity: 1, transform: "translateX(0)" }
        }
      },
      animation: {
        slideIn: "slideIn .25s ease-in-out forwards"
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ]
}