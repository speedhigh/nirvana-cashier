<template>
  <div class="w-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-login-bg bg-center bg-no-repeat">
    <div class="max-w-md w-full space-y-8 p-12 rounded-md shadow-lg backdrop-blur-sm" style="background:rgba(255,255,255,0.7)">
      <div>
        <img class="mx-auto h-12 w-auto rounded-2xl" :src="logoImg" alt="Workflow" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          登录您的账户
        </h2>
        <p class="text-center mt-2 text-gray-300">木子网财务后台</p>
      </div>
      <form class="mt-8 space-y-6" action="#" method="POST">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="tel" class="sr-only">用户名</label>
            <input id="tel" name="tel" type="tel" autocomplete="tel" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" placeholder="请输入您的用户名" />
          </div>
          <div>
            <label for="password" class="sr-only">密码</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-teal-500 focus:border-teal-500 focus:z-10 sm:text-sm" placeholder="请输入您的密码" />
          </div>
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-red-500 group-hover:text-red-400" aria-hidden="true" />
            </span>
            登录
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { LockClosedIcon } from '@heroicons/vue/solid'
import logoImg from '/src/assets/logo.png'

export default {
  components: {
    LockClosedIcon,
  },
  setup() {
    return {
      logoImg
    }
  }
}
</script>