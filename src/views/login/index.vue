<template>
  <div class="w-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-login-bg-a bg-cover bg-no-repeat">
    <div class="max-w-md w-full space-y-8 p-12 rounded-md shadow-lg backdrop-blur-xl bg-[rgba(255,255,255,0.6)]">
      <div>
        <img class="mx-auto h-12 w-auto rounded-2xl" :src="logoImg" alt="Workflow" />
        <h1 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {{$t(`message.signTitle`)}}
        </h1>
        <p class="text-center mt-2 text-gray-600">{{$t(`message.siginText`)}}</p>
      </div>
      <form class="mt-8 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="phone" class="sr-only">账号</label>
            <input
              v-model="form.phone"
              id="phone" 
              name="phone" 
              type="tel"
              autocomplete="phone" 
              required="" 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-300 focus:border-red-300 focus:z-10 sm:text-sm"
              :placeholder="$t(`message.accountPlaceholder`)" 
            />
          </div>
          <div>
            <label for="password" class="sr-only">密码</label>
            <input
              v-model="form.password"
              id="password"
              name="password" 
              type="password" 
              autocomplete="current-password" 
              required="" 
              class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-300 focus:border-red-300 focus:z-10 sm:text-sm" 
              :placeholder="$t(`message.passwordPlaceholder`)" 
            />
          </div>
        </div>

        <div>
          <button :disabled="loginDisabled" type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500" @click="login">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LockClosedIcon class="h-5 w-5 text-red-500 group-hover:text-red-400" aria-hidden="true" />
            </span>
            {{$t(`message.signin`)}}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { LockClosedIcon } from '@heroicons/vue/solid'
import { useI18n } from 'vue-i18n'
import api from '../../api/index.js'
import Encrypt from '../../until/crypto.js'
import { ElMessage } from 'element-plus'
import logoImg from '/src/assets/logo.png'

export default {
  components: {
    LockClosedIcon,
  },
  setup() {
    const router = useRouter()
    const { t } = useI18n()
    const loginDisabled = ref(false)
    const form = reactive({
      phone: localStorage.getItem('account') ? localStorage.getItem('account') : '',
      password: ''
    })
    const login = function() {
      if(!form.phone || !form.password) return
      loginDisabled.value = true
      let postData = {}
      postData = Object.assign(postData, form)
      postData.password = Encrypt.Encrypt(postData.password)
      api.post('/open/login', postData).then((res) => {
        console.log(res)
        if(res.data.code === 20000) {
          localStorage.setItem('account', form.phone)
          ElMessage.success(t('message.welcome') + ' ' + res.data.data.user.realname + '!')
          sessionStorage.setItem('token', res.data.data.token)
          sessionStorage.setItem('name', res.data.data.user.realname)
          router.push('/')
        } else {
          ElMessage.error(res.data.msg)
        }
        setTimeout(() => { loginDisabled.value = false }, 500 )
      })
    }
    return {
      logoImg,
      loginDisabled,
      form,
      login
    }
  }
}
</script>