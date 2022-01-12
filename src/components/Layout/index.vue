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
          <span>首页</span>
        </el-menu-item>

        <!-- 待办信息 -->
        <el-menu-item index="TodoList" class="space-x-2" :route="{path: '/todo/list'}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>待办信息</span>
        </el-menu-item>

        <!-- 数据分析 -->
        <el-sub-menu index="2">
          <template #title>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
            <span class="ml-2">数据分析</span>
          </template>
          <el-menu-item index="OrderData" :route="{path: '/data/order'}" class="bg-gray-50">订单数据</el-menu-item>
          <!-- <el-menu-item index="OrderAnalyze" :route="{path: '/data/analyze'}">订单分析</el-menu-item> -->
          <el-menu-item index="CnewbData" :route="{path: '/data/cnewb'}" class="bg-gray-50">大客户数据</el-menu-item>
          <el-menu-item index="NewbData" :route="{path: '/data/newb'}" class="bg-gray-50">高级经理数据</el-menu-item>
        </el-sub-menu>

        <!-- 提现管理 -->
        <el-menu-item index="Withdraw" class="space-x-2" :route="{path: '/withdraw/list'}">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
          <span>提现管理</span>
        </el-menu-item>
      </el-menu>

      <div 
        class="fixed bottom-0 pt-3" 
        :class="isCollapse ? 'px-3.5 w-[65px] py-4' : 'px-6 mb-4 w-[208px] border-t border-gray-300 flex space-x-3'"
      >
        <el-avatar :size="40" width="40" height="40" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="avatar" />
        <div v-show="!isCollapse" class="space-y-0.5">
          <p class="text-sm">{{ user.name }}</p>
          <p class="text-xs text-gray-600">财务-出纳</p>
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
          <!-- 全屏 -->
          <el-tooltip
            class="ml-auto cursor-pointer"
            effect="dark"
            :content="fullscreen ? '退出全屏' : '全屏'"
            placement="bottom"
          >
            <div v-if="!fullscreen" @click="handleFullScreen">
              <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="23" height="23"><path d="M170.667 170.667V384H85.333V85.333H384v85.334H170.667zM853.333 384V170.667H640V85.333h298.667V384h-85.334zM170.667 640v213.333H384v85.334H85.333V640h85.334zm682.666 0h85.334v298.667H640v-85.334h213.333V640z" fill="#707070"/></svg>
            </div>
            <div :sss="fullscreen" v-else @click="handleFullScreen">
              <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="23" height="23"><path d="M298.667 298.667V85.333H384V384H85.333v-85.333h213.334zM725.333 85.333v213.334h213.334V384H640V85.333h85.333zM298.667 938.667V725.333H85.333V640H384v298.667h-85.333zm426.666 0H640V640h298.667v85.333H725.333v213.334z"/></svg>
            </div>
          </el-tooltip>
          <!-- 个人信息（退出） -->
          <el-dropdown class="ml-6">
            <div class="flex items-center space-x-2">
              <el-avatar
                src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                alt="avatar"
                :size="25" 
                width="25" 
                height="25"
              />
              <p>安妮谷拉丝</p>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item @click="quit">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 面包屑 -->
      <div class="w-full h-12 bg-white flex items-center px-6 border-b border-gray-200">
        <div 
          v-for="(item, index) in $route.meta.breadcrumb" 
          :key="index"
          class="flex items-center"
        >
          <div 
            :class="$route.meta.breadcrumb.length - index === 1 ? 'text-red-700 cursor-default font-bold' : 'cursor-pointer'"
            @click="jump(item.url, item.text)"
          >
            {{ item.text }}
          </div>
          <div v-if="index < $route.meta.breadcrumb.length - 1" class="mx-2">></div>
        </div>
      </div>

      <!-- 主体 -->
      <el-main class="bg-gray-100">
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import { changeFullScreen, listenerEvent } from '../../until/fullScreen.js'
import LogoImg from '/src/assets/logo.png'
export default {
  setup() {
    const router = useRouter()
    const path = useRoute().path
    const isCollapse = ref(false)
    const user = reactive({
      name: sessionStorage.getItem('name') 
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
    return {
      LogoImg,
      path,
      isCollapse,
      user,
      ...params,
      handleFullScreen,
      jump(url, text) {
        if(url) router.push({ path: url })
      },
      quit() {
        ElMessageBox.confirm( '确定要退出登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
          showClose: false
        })
        .then(() => {
          sessionStorage.removeItem('token')
          router.replace('/login')
          ElMessage.success('已退出登录')
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
</style>