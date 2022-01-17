module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('/src/assets/login_bg.webp')",
        'login-bg-a': "url('/src/assets/login_bg_a.webp')",
        'aside-bg': "url('/src/assets/aside_bg.webp')",
      },
      aspectRatio: {
        '4/1': '4 / 1',
        '4/2': '4 / 2',
        '4/3': '4 / 3',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}
