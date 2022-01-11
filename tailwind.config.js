module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('/src/assets/bg.jpg')",
        'aside-bg': "url('https://cdn.pixabay.com/photo/2021/12/26/17/30/beach-6895599__340.jpg')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
