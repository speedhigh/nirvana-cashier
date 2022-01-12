<template>
  <div class="w-[80%] h-full bg-white rounded-lg py-5 px-6 shadow backdrop-blur-sm">
    <h2>待办信息</h2>
    <base-pagination
      ref="paginationRef"
      :params="params"
      :size="12"
      url="/home/getToDoInformationsPage"
    >
      <template #default="slotProps">
        <div 
          v-for="(item, index) in slotProps.list" 
          :key="index"
          class="flex items-center hover:font-bold cursor-pointer text-left"
          @click="handle(item.id)"
        >
          <div class="pt-5 pb-3.5 flex-shrink-0 mr-2">
            <div class="w-2 h-2 rounded-full bg-gray-400" />
          </div>
          <div class="flex-grow flex items-center pt-5 pb-3.5 border-b border-gray-200">
            <p class="line-1 flex-grow w-full mr-4 text-gray-600">{{ item.shuoming }}</p>
            <p class="ml-auto flex-shrink-0 text-orange-700">{{ item.zhuangtai }}></p>
          </div>
        </div>
      </template>
    </base-pagination>
  </div>
  <!-- 弹出info -->
  <dialog-info :id="dialog.id" :show="dialog.show" @close="dialogClose" @change="dialogChange" />
</template>

<script>
import { reactive, ref } from 'vue'
import DialogInfo from '/src/components/DialogInfo.vue'
export default {
  components: {
    DialogInfo
  },
  setup() {
    const paginationRef = ref(null)
    const params = ref({})
    const dialog = reactive({
      id: '',
      show: false
    })
    return {
      paginationRef,
      dialog,
      params,
      handle(id) {
        dialog.show = true
        dialog.id = id
      },
      dialogClose() {
        dialog.show = false
      },
      dialogChange() {
        paginationRef.value.BasePaginationMitt.emit('refresh')
      }
    }
  }
}
</script>