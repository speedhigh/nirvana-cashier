module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('/src/assets/login_bg_a.webp')",
        'aside-bg': "url('/src/assets/aside_bg.webp')",
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
