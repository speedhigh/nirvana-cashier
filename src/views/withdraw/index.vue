<template>
  <div class="w-[80%] h-full bg-white rounded-lg py-5 px-6 shadow backdrop-blur-sm">
    <base-pagination
      ref="paginationRef"
      :params="params"
      :size="12"
      url="/home/getTiXiansPage"
      class="mt-5"
    >
      <template #default="slotProps">
        <el-table
          :data="slotProps.list"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          class="cursor-pointer"
        >
          <el-table-column prop="shijian" label="时间" width="200" />
          <el-table-column prop="shenqingren" label="申请大客户" width="130" />
          <el-table-column prop="shenqingjine" label="申请金额" width="140" />
          <el-table-column prop="profit" label="打款金额" width="140" />
          <el-table-column prop="shenpiren" label="审核人" width="120" />
          <el-table-column prop="beizhu" label="备注" />
          <el-table-column prop="zhuangtai" label="状态" width="100" align="center" />
          <el-table-column label="操作" width="90">
            <template #default="scope">
              <button
                v-if="scope.row.zhuangtai === '待处理'" 
                class="w-16 h-6 bg-amber-500 text-white text-xs rounded hover:bg-amber-400 active:bg-amber-500"
                @click="handle(scope.row.id)"
              >
                去处理
              </button>
              <button 
                v-if="scope.row.zhuangtai === '未通过'" 
                class="w-16 h-6 text-xs text-red-700 border border-red-600 rounded hover:bg-red-500 hover:text-white active:bg-red-400"
                @click="handle(scope.row.id)"
              >
                查看信息
              </button>
              <button 
                v-if="scope.row.zhuangtai === '已打款'" 
                class="w-16 h-6 text-xs text-lime-700 border border-lime-600 rounded hover:bg-lime-600 hover:text-white active:bg-lime-500"
                @click="handle(scope.row.id)"
              >
                查看信息
              </button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </base-pagination>
  </div>
  <dialog-info :id="dialog.id" :show="dialog.show" @close="dialogClose" @change="dialogChange" />
</template>

<script>
import { ref, reactive } from 'vue'
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
      params,
      dialog,
      tableRowClassName({row, rowIndex}) {
        if(row.zhuangtai === '待处理') return 'warning-row'
      },
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