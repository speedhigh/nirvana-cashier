<template>
  <el-container class="h-screen relative">
    <div
      class="absolute left-0 inset-y-auto h-full z-10 bg-aside-bg bg-center bg-no-repeat bg-cover"
      :class="isCollapse ? 'w-[64px]' : 'w-[208px]'"
    />
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '65px' : '208px'" class="relative z-50">
      <el-menu
        class="h-full shadow-md reactive backdrop-blur-sm bg-[rgba(255,255,255,0.9)]"
        active-text-color="#b91c1c"
        text-color="#111827"
        :unique-opened="true"
        :default-active="$route.meta.name"
        :collapse="isCollapse"
        :collapse-transition="false"
        router
      >
        <div
          class="h-[3.75rem] py-4 z-50 relative"
          :class="isCollapse ? 'px-3.5' : 'px-6 mb-4'"
        >
          <router-link to="/" class="flex items-center space-x-2 cursor-pointer">
            <div class="rounded-md flex-shrink-0"  :class="isCollapse ? 'w-7 h-7' : 'w-9 h-9'">
              <img :src="LogoImg" alt="logo" width="36" height="36" class="rounded-md w-full h-full">
            </div>
            <div v-show="!isCollapse" class="pt-1">
              <p>香港木子网</p>
              <p class="text-xs text-gray-600">muzimed.com</p>
            </div>
          </router-link>
        </div>

        <!-- 首页 -->
        <el-menu-item index="Home" class="space-x-2" :route="{path: '/'}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>{{$t(`message.home`)}}</span>
        </el-menu-item>

        <el-sub-menu index="1">
          <template #title>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
            <span class="ml-2">{{ $t(`message.withdrawals`) }}</span>
          </template>
          <!-- 待办信息 -->
          <el-menu-item index="WithdrawTodo" :route="{path: '/withdraw/todo'}" class="bg-gray-100">{{$t(`message.todo`)}}</el-menu-item>
          <!-- 提现数据 -->
          <el-menu-item index="WithdrawData" :route="{path: '/withdraw/data'}" class="bg-gray-100">{{$t(`message.withdrawData`)}}</el-menu-item>
        </el-sub-menu>

        <!-- 订单数据 -->
        <el-menu-item index="OrderData" class="space-x-2" :route="{path: '/order/data'}">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
          <span>{{$t(`message.orderData`)}}</span>
        </el-menu-item>
        

        <!-- 客户资料 -->
        <el-sub-menu index="2">
          <template #title>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <span class="ml-2">{{$t(`message.customerProfiles`)}}</span>
          </template>
          <!-- 大客户数据 -->
          <el-menu-item index="CnewbCustomer" :route="{path: '/customer/cnewb'}" class="bg-gray-50">{{$t(`message.cnewbProfiles`)}}</el-menu-item>
          <!-- 高级经理数据 -->
          <el-menu-item index="NewbCustomer" :route="{path: '/customer/newb'}" class="bg-gray-50">{{$t(`message.newbProfiles`)}}</el-menu-item>
        </el-sub-menu>

      </el-menu>

      <div
        class="fixed bottom-0 pt-3"
        :class="isCollapse ? 'px-3.5 w-[65px] py-4' : 'px-6 mb-4 w-[208px] border-t border-gray-300 flex space-x-3'"
      >
        <el-avatar :size="40" width="40" height="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="avatar" class="w-10 h-10" />
        <div v-show="!isCollapse" class="space-y-0.5">
          <p class="text-sm">{{ user.name }}</p>
          <p class="text-xs text-gray-600">{{ $t(`message.financial`) }}-{{ user.usergroup === '13' ? $t(`message.auditor`) : $t(`message.cashier`) }}</p>
        </div>
      </div>
    </el-aside>

    <el-container>

      <!-- 头部样式 -->
      <el-header class="border-b border-gray-100">
        <div class="w-full h-full flex items-center">
          <div class="pr-4 mr-6 border-r border-gray-300 cursor-pointer" @click="isCollapse = !isCollapse">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="isCollapse ? ' M4 6h16M4 12h16M4 18h16' : 'M4 6h16M4 12h8m-8 6h16'" />
            </svg>
          </div>
          <div class="ml-auto flex items-center space-x-6">
            <!-- 全屏 -->
            <el-tooltip
              class="cursor-pointer"
              effect="dark"
              :content="fullscreen ? $t(`message.exitPreview`) : $t(`message.preview`)"
              placement="bottom"
            >
              <div v-if="!fullscreen" @click="handleFullScreen">
                <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="23" height="23"><path d="M170.667 170.667V384H85.333V85.333H384v85.334H170.667zM853.333 384V170.667H640V85.333h298.667V384h-85.334zM170.667 640v213.333H384v85.334H85.333V640h85.334zm682.666 0h85.334v298.667H640v-85.334h213.333V640z" fill="#707070"/></svg>
              </div>
              <div :sss="fullscreen" v-else @click="handleFullScreen">
                <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="23" height="23"><path d="M298.667 298.667V85.333H384V384H85.333v-85.333h213.334zM725.333 85.333v213.334h213.334V384H640V85.333h85.333zM298.667 938.667V725.333H85.333V640H384v298.667h-85.333zm426.666 0H640V640h298.667v85.333H725.333v213.334z"/></svg>
              </div>
            </el-tooltip>
            <!-- 翻译 -->
            <el-dropdown>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="change('zhCn')">简体中文</el-dropdown-item>
                  <el-dropdown-item @click="change('En')">English</el-dropdown-item>
                  <el-dropdown-item @click="change('Ja')">日本語</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
            <!-- 个人信息（退出） -->
            <el-dropdown>
              <div class="flex items-center space-x-2">
                <el-avatar
                  src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                  alt="avatar"
                  :size="28" 
                  width="28" 
                  height="28"
                  class="w-7 h-7"
                />
                <p>{{ user.name }}</p>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :icon="User">{{$t(`message.info`)}}</el-dropdown-item>
                  <el-dropdown-item :icon="Lock">{{$t(`message.changePwd`)}}</el-dropdown-item>
                  <el-dropdown-item :icon="SwitchButton" @click="quit">{{$t(`message.signout`)}}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </el-header>

      <!-- 面包屑 -->
      <div class="w-full h-12 flex-shrink-0 bg-white flex items-center px-6 border-b border-gray-200">
        <div
          v-for="(item, index) in $route.meta.breadcrumb"
          :key="index"
          class="flex items-center"
        >
          <div 
            :class="$route.meta.breadcrumb.length - index === 1 ? 'text-red-700 cursor-default font-bold' : index > 0 ? 'cursor-pointer hover:text-red-700' : 'cursor-default'"
            @click="jump(item.url, item.text)"
          >
            {{ $t(item.text) }}
          </div>
          <div v-if="index < $route.meta.breadcrumb.length - 1" class="mx-2">></div>
        </div>
      </div>

      <!-- 主体 -->
      <el-main class="bg-gray-100">
        <el-config-provider :locale="locale">
          <router-view></router-view>
        </el-config-provider>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { reactive, ref, toRefs, getCurrentInstance } from 'vue'
import { useI18n } from 'vue-i18n'
import zhCn from "element-plus/lib/locale/lang/zh-cn"
import En from 'element-plus/lib/locale/lang/en'
import Ja from 'element-plus/lib/locale/lang/ja'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { User, Lock, SwitchButton } from '@element-plus/icons-vue'
import { changeFullScreen, listenerEvent } from '../../until/fullScreen.js'
import LogoImg from '/src/assets/logo.png'
export default {
  setup() {
    const router = useRouter()
    const path = useRoute().path
    const isCollapse = ref(false)
    const user = reactive({
      name: sessionStorage.getItem('name'),
      usergroup: sessionStorage.getItem('usergroup')
    })
    const data = reactive({
      fullscreen: false
    })
    listenerEvent(() => {
      data.fullscreen = !data.fullscreen
    }, data)
    // 全屏切换
    const handleFullScreen = () => changeFullScreen(data)
    const params = toRefs(data)

    // 国际化
    let locale = ref(zhCn)
    const { proxy } = getCurrentInstance()
    function change(type) {
      if(type === 'zhCn') { ElMessage.success('切换成功!'); locale.value = zhCn }
      if(type === 'En') { ElMessage.success('success!'); locale.value = En }
      if(type === 'Ja') { ElMessage.success('スイッチングに成功!'); locale.value = Ja }
      if(localStorage.getItem('language') !== type) {
        localStorage.setItem('language',type)
        proxy.$i18n.locale = type
      }
    }
    const { t } = useI18n()
    return {
      t,LogoImg,
      locale,
      User,Lock,SwitchButton,
      path,
      isCollapse,
      user,
      ...params,
      change,
      handleFullScreen,
      jump(url, text) {
        if(url) router.push({ path: url })
      },
      quit() {
        ElMessageBox.confirm( t('message.exitDialog'), t('message.prompt'), {
          confirmButtonText: t('message.confirm'),
          cancelButtonText: t('message.cancel'),
          type: 'info',
          showClose: false
        })
        .then(() => {
          sessionStorage.removeItem('token')
          router.replace('/login')
          ElMessage.success(t('message.signedOut'))
        }).catch(() => {
          // 取消通过审批
        })
      }
    }
  }
}
</script>
<style scoped>
.el-menu-item.is-active {
  color:#b91c1c;
  background: rgba(248, 206, 201, 0.4) !important;
}
audio {
  @apply bg-white h-11 mr-12
}
</style>