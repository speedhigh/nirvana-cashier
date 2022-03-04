<template>
  <div class="w-full h-full bg-white rounded-lg pt-2 pb-5 px-6 shadow">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="大客户提现" name="/home/getTiXiansPage" />
      <el-tab-pane label="高级经理提现" name="/home/getTiXiansPage_NewB" />
    </el-tabs>
    <base-pagination
      ref="paginationRef"
      :params="params"
      :size="12"
      :url="url"
    >
      <template #default="slotProps">
        <el-table
          :data="slotProps.list"
          style="width: 100%"
          :row-class-name="tableRowClassName"
          class="cursor-pointer"
        >
          <el-table-column prop="shijian" label="时间" min-width="150" />
          <el-table-column prop="shenqingren" label="申请大客户" min-width="120" />
          <el-table-column prop="shenqingjine" label="申请金额(HK$)" min-width="130" />
          <el-table-column prop="profit" label="打款金额(￥)" min-width="130" />
          <el-table-column prop="shenpiren" label="审核人" min-width="120" />
          <el-table-column prop="beizhu" label="备注" min-width="240" />
          <el-table-column prop="zhuangtai" label="状态" min-width="140" align="center" />
          <el-table-column label="操作" min-width="90">
            <template #default="scope">
              <!-- 待审核 -->
              <button
                v-if="scope.row.zhuangtai === '待审核'"
                class="w-16 h-6 text-xs rounded"
                :class="scope.row.caiwushenfen === '财务专员（审核）' ? 'text-white bg-amber-500 hover:bg-amber-400 active:bg-amber-500 active:text-white active:border-amber-500' : 'text-gray-500 underline hover:font-bold hover:text-sm'"
                @click="handle(scope.row.id, scope.row.shenfen)"
              >
                {{ scope.row.caiwushenfen === '财务专员（审核）' ? '去处理' : '立即查看' }}
              </button>
              <!-- 已审核待提现 -->
              <button
                v-if="scope.row.zhuangtai === '已审核待提现'"
                class="w-16 h-6 text-xs rounded"
                :class="scope.row.caiwushenfen === '财务出纳（提现）' ? 'text-white bg-amber-500 hover:bg-amber-400 active:bg-amber-500 active:text-white active:border-amber-500' : 'text-gray-500 underline hover:font-bold hover:text-sm'"
                @click="handle(scope.row.id, scope.row.shenfen)"
              >
                {{ scope.row.caiwushenfen === '财务出纳（提现）' ? '去处理' : '立即查看' }}
              </button>
              <!-- 审核不通过或提现失败 -->
              <button
                v-if="scope.row.zhuangtai === '审核不通过或提现失败'"
                class="w-16 h-6 text-xs text-red-700 underline hover:font-bold hover:text-sm"
                @click="handle(scope.row.id, scope.row.shenfen)"
              >
                查看信息
              </button>
              <!-- 已审核已提现 -->
              <button
                v-if="scope.row.zhuangtai === '已审核已提现'"
                class="w-16 h-6 text-xs text-teal-700 underline hover:font-bold hover:text-sm"
                @click="handle(scope.row.id, scope.row.shenfen)"
              >
                查看信息
              </button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </base-pagination>
  </div>
  <dialog-info :id="dialog.id" :shenfen="dialog.shenfen" :show="dialog.show" @close="dialogClose" @change="dialogChange" />
</template>

<script>
import { ref, reactive, computed } from 'vue'
import DialogInfo from '/src/components/DialogInfo.vue'
export default {
  components: {
    DialogInfo
  },
  setup() {
    const activeName = ref('/home/getTiXiansPage')
    const url = ref('/home/getTiXiansPage')
    const paginationRef = ref(null)
    const params = ref({})
    const dialog = reactive({
      id: '',
      shenfen: '',
      show: false
    })
    return {
      activeName,
      url,
      handleClick() {
        url.value = activeName.value
      },
      paginationRef,
      params,
      dialog,
      tableRowClassName({row, rowIndex}) {
        if(sessionStorage.getItem('usergroup') === '13' && row.zhuangtai === '待审核') return 'warning-row'
        if(sessionStorage.getItem('usergroup') === '14' && row.zhuangtai === '已审核待提现') return 'warning-row'
      },
      handle(id, shenfen) {
        dialog.show = true
        dialog.id = id
        dialog.shenfen = shenfen
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