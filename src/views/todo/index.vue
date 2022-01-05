<template>
  <div class="w-[80%] h-full bg-white rounded-lg py-5 px-6 shadow backdrop-blur-sm">
    <h2 class="text-lg font-bold px-4">待办信息</h2>
    <div 
      v-for="(item, index) in list" 
      :key="index" 
      class="flex items-center hover:font-bold cursor-pointer"
      @click="dialog.show = true"
    >
      <div class="pt-5 pb-3.5 flex-shrink-0 mr-2">
        <div class="w-2 h-2 rounded-full bg-gray-400" />
      </div>
      <div class="flex-grow flex items-center pt-5 pb-3.5 border-b border-gray-200">
        <p class="line-1 flex-grow w-full mr-4 text-gray-600">处理来自大客户燕喜堂的提现收益申请</p>
        <p class="ml-auto flex-shrink-0 text-orange-700">待处理></p>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialog.show" width="42%" top="2.5vh">
    <template #title>
      <div class="text-center font-bold text-xl px-4 pb-4 border-b border-gray-200 tracking-wider">
        大客户燕喜堂的提现收益申请
      </div>
    </template>
    <div class="space-y-5">
      <!-- 申请大客户 -->
      <div class="space-y-3.5">
        <div class="flex items-center space-x-2.5">
          <div class="w-1 h-[1.13rem] bg-red-500 rounded" />
          <h3 class="text-lg font-bold text-gray-800">申请大客户</h3>
        </div>
        <div class="w-full h-12 bg-gray-100 rounded-md px-3.5">
          <p class="leading-[3rem]">燕喜堂</p>
        </div>
      </div>
      <!-- 申请时间 -->
      <div class="space-y-3.5">
        <div class="flex items-center space-x-2.5">
          <div class="w-1 h-[1.13rem] bg-red-500 rounded" />
          <h3 class="text-lg font-bold text-gray-800">申请时间</h3>
        </div>
        <div class="w-full h-12 bg-gray-100 rounded-md px-3.5">
          <p class="leading-[3rem]">2021-12-27  12:36:05</p>
        </div>
      </div>
      <!-- 申请金额 -->
      <div class="space-y-3.5">
        <div class="flex items-center space-x-2.5">
          <div class="w-1 h-[1.13rem] bg-red-500 rounded" />
          <h3 class="text-lg font-bold text-gray-800">申请金额</h3>
        </div>
        <div class="w-full h-12 bg-gray-100 rounded-md px-3.5">
          <p class="leading-[3rem]">6600.66</p>
        </div>
      </div>
      <!-- 审批人 -->
      <div class="space-y-3.5">
        <div class="flex items-center space-x-2.5">
          <div class="w-1 h-[1.13rem] bg-red-500 rounded" />
          <h3 class="text-lg font-bold text-gray-800">审批人</h3>
        </div>
        <div class="w-full h-12 bg-gray-100 rounded-md px-3.5">
          <p class="leading-[3rem]">于君秀</p>
        </div>
      </div>
      <!-- 备注 -->
      <div class="space-y-3.5">
        <div class="flex items-center space-x-2.5">
          <div class="w-1 h-[1.13rem] bg-red-500 rounded" />
          <h3 class="text-lg font-bold text-gray-800">备注</h3>
        </div>
        <div class="w-full rounded-md border-2 border-dashed border-gray-400 p-5 bg-gray-100">
          <textarea 
            v-model="dialog.remark" 
            placeholder="若未通过申请，请输入备注"
            class="w-full h-20 text-base overflow-hidden bg-gray-100"
            style="resize:none"
          >
          </textarea>
        </div>
      </div>
      <p class="text-sm text-gray-400">注：若未通过申请，请在上方输入框内写明理由。</p>
      <div class="pt-4 flex items-center justify-center space-x-5 bg-white">
        <button 
          :disabled="dialog.failDisabled" 
          class="w-40 h-11 rounded text-white hover:bg-red-300 active:bg-red-400"
          :class="dialog.failDisabled ? 'bg-red-300' : 'bg-red-400'"
          @click="failed"
        >
          未通过
        </button>
        <button 
          :disabled="dialog.successDisabled" 
          class="w-40 h-11 rounded text-white hover:bg-blue-400 active:bg-blue-500"
          :class="dialog.successDisabled ? 'bg-blue-400 ' : 'bg-blue-500 '"
          @click="pass"
        >
          通过
        </button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { reactive, ref } from 'vue'
export default {
  setup() {
    const list = ref(['','','','','','','','','','',''])
    const dialog = reactive({
      show: false,
      remark: '',
      failDisabled: false,
      successDisabled: false
    })
    return {
      list,
      dialog,
      failed() {
        // 未通过
        // dialog.failDisabled = true
      },
      pass() {
        // 通过
        // dialog.successDisabled = true
      }
    }
  }
}
</script>