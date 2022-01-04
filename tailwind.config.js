module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('/src/assets/bg.jpg')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
