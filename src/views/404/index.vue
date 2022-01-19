<template>
  <div class="relative h-screen bg-login-bg bg-right bg-cover">
    <div class="text-center">
      <img :src="errorImg" alt="404" class="h-[60vh] inline-block">
    </div>
    <div class="text-center">
      <router-link to="/">
        <button class="w-40 h-12 bg-red-600 rounded-full text-white hover:shadow-lg hover:shadow-red-400 hover:bg-red-500">返回首页</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import errorImg from '/src/assets/404.png'
export default {
  setup() {
    return { errorImg }
  }
}
</script>