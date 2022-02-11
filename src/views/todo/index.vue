<template>
  <div class="w-[80%] bg-white rounded-lg pt-5 px-6 pb-8 shadow">
    <h2>{{$t(`message.todo`)}}</h2>
    <div 
      v-for="(item, index) in list" 
      :key="item.id"
      class="flex items-center hover:font-bold cursor-pointer text-left"
      @click="handle(item.id, item.shenfen)"
    >
      <div class="pt-5 pb-3.5 flex-shrink-0 mr-2">
        <div class="w-2 h-2 rounded-full bg-gray-400" />
      </div>
      <div 
        class="flex-grow flex items-center pt-5 pb-3.5" 
        :class="list.length - 1 === index ? '' : 'border-b border-gray-200'"
      >
        <p class="line-1 flex-grow w-full text-gray-600">
          {{ item.shuoming }} <span class="ml-2 text-sm">( 截止至 {{ item.inserttimeend }} )</span>
        </p>
        <p class="ml-auto flex-shrink-0 text-orange-700">{{ item.zhuangtai }}></p>
      </div>
    </div>
  </div>
  <!-- 弹出info -->
  <dialog-info :id="dialog.id" :shenfen="dialog.shenfen" :show="dialog.show" @close="dialogClose" @change="dialogChange" />
</template>

<script>
import { reactive, ref } from 'vue'
import api from '/src/api/index.js'
import DialogInfo from '/src/components/DialogInfo.vue'
export default {
  components: {
    DialogInfo
  },
  setup() {
    const list = ref([])
    const dialog = reactive({
      id: '',
      shenfen: '',
      show: false
    })
    const getList = function() {
      api.get('/home/getToDoInformationsPage').then((res) => {
        list.value = res.data.data
      })
    }
    getList()
    return {
      list,
      dialog,
      handle(id, shenfen) {
        dialog.show = true
        dialog.id = id
        shenfen === '集团大客户' ? dialog.shenfen = 'cnewb' : dialog.shenfen = 'newb'
      },
      dialogClose() {
        dialog.show = false
      },
      dialogChange() {
        getList()
      }
    }
  }
}
</script>