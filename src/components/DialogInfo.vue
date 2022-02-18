<template>
  <el-dialog 
    v-model="dialog.show" 
    width="42%" 
    top="2.5vh"
    @close="closeDialog"
  >

    <!-- title -->
    <template #title>
      <div class="text-center font-bold text-xl px-4 pb-4 border-b border-gray-200 tracking-wider">{{ info.biaoti }}</div>
    </template>

    <!-- body -->
    <div class="-mt-5 space-y-3">
      <!-- 申请大客户 -->
      <div class="space-y-1.5">
        <div class="flex items-center space-x-2.5">
          <div class="tag" />
          <h3>申请大客户</h3>
        </div>
        <div class="content">
          <p class="leading-10">{{ info.shenqingren }}</p>
        </div>
      </div>

      <!-- 申请时间 -->
      <div class="space-y-1.5">
        <div class="flex items-center space-x-2.5">
          <div class="tag" />
          <h3>申请时间</h3>
        </div>
        <div class="content">
          <p class="leading-10">{{ info.shijian }}</p>
        </div>
      </div>

      <!-- 申请金额 -->
      <div class="space-y-1.5">
        <div class="flex items-center space-x-2.5">
          <div class="tag" />
          <h3>申请金额(HK$)</h3>
        </div>
        <div class="content">
          <p class="leading-10">{{ info.shenqingjine }}</p>
        </div>
      </div>

      <!-- 打款金额 -->
      <div class="space-y-1.5">
        <div class="flex items-center space-x-2.5">
          <div class="tag" />
          <h3>打款金额(￥)</h3>
        </div>
        <div class="content">
          <p class="leading-10">{{ info.profit }}</p>
        </div>
      </div>

      <!-- 开户银行 -->
      <div class="space-y-1.5">
        <div class="flex items-center space-x-2.5">
          <div class="tag" />
          <h3>开户银行</h3>
        </div>
        <div class="content">
          <p class="leading-10">{{ info.kaihuhang }}</p>
        </div>
      </div>

      <!-- 银行卡号 -->
      <div class="space-y-1.5">
        <div class="flex items-center space-x-2.5">
          <div class="tag" />
          <h3>银行卡号</h3>
        </div>
        <div class="content">
          <p class="leading-10">{{ info.cardnum }}</p>
        </div>
      </div>

      <!-- 审批人 -->
      <div class="space-y-1.5">
        <div class="flex items-center space-x-2.5">
          <div class="tag" />
          <h3>审批人</h3>
        </div>
        <div class="content">
          <p class="leading-10">{{ info.shenpiren }}</p>
        </div>
      </div>

      <!-- 备注 remark -->
      <div class="space-y-1.5">
        <div class="flex items-center space-x-2.5">
          <div class="tag" />
          <h3>备注</h3>
        </div>
        <div class="w-full rounded-md border-2 border-dashed border-gray-400 p-5 bg-gray-100">
          <textarea 
            v-model="info.beizhu" 
            :placeholder="info.zhuangtai === '待审核' || info.zhuangtai === '已审核待提现' ? '若未通过申请，请输入备注' : '没有备注'"
            :disabled="info.zhuangtai === '待审核' || info.zhuangtai === '已审核待提现' ? false : true"
            class="w-full h-20 overflow-hidden bg-gray-100 text-sm"
            style="resize:none"
          >
          </textarea>
        </div>
        <p class="text-sm text-gray-400">注：若未通过申请，请在上方输入框内写明理由。</p>
      </div>

      <!-- button -->
      <div 
        v-if="info.zhuangtai === '待审核' && info.caiwushenfen === '财务专员（审核）' || info.zhuangtai === '已审核待提现' && info.caiwushenfen === '财务出纳（提现）'" 
        class="pt-3 flex items-center justify-center space-x-5 bg-white"
      >
        <button 
          class="w-40 h-11 rounded text-white bg-red-400 hover:bg-red-300 active:bg-red-400" 
          @click="failed"
        >
          未通过
        </button>
        <button 
          class="w-40 h-11 rounded text-white bg-blue-500 hover:bg-blue-400 active:bg-blue-500" 
          @click="pass"
        >
          通过
        </button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { reactive, watch } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import api from '/src/api/index.js'
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    shenfen: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close', 'change'],
  setup(props, { emit }) {
    const dialog = reactive({
      show: false
    })

    let info = reactive({
      beizhu: '',
      biaoti: '',
      profit: '',
      shenpiren: '',
      shenqingjine: '',
      shenqingren: '',
      shijian: '',
      zhuangtai: "待审核",
    })

    watch(() => props.show, (state) => {
      dialog.show = state
      if(state) {
        // 获取信息
        api.get('/home/getTiXianById', { id: props.id, shenfen: props.shenfen }).then((res) => {
          console.log(res.data.data)
          info = Object.assign(info, res.data.data)
        })
      }
    })

    return {
      dialog,
      info,
      closeDialog() { emit('close') },  // 监听关闭
      // 未通过
      failed() {
        if(info.beizhu.length === 0) { ElMessage.error('请填写未通过理由'); return }
        let title = info.zhuangtai === '待审核' ? '确定要将该申请状态设置成未通过吗?' : '确定要将该申请状态设置成‘已审核提现失败’吗'
        ElMessageBox.confirm( title, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
          showClose: false
        })
        .then(() => {
          api.get('/home/getTiXianFAIL', { id: props.id, shenpiren: info.shenpiren, content:info.beizhu, content: info.beizhu, shenfen: props.shenfen }).then((res) => {
            if(res.data.code === 20000) {
              ElMessage.success('已完成审批')
              dialog.show = false
              emit('change')
            } else {
              ElMessage.error(res.data.msg)
            }
          })
        }).catch(() => {
          // 取消通过审批
        })
      },
      // 通过
      pass() {
         ElMessageBox.confirm( '确定要通过申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
          showClose: false
        })
        .then(() => {
          api.get('/home/getTiXianSUCCESS', { shenpiren: info.shenpiren, id: props.id, content: info.beizhu, shenfen: props.shenfen }).then((res) => {
            if(res.data.code === 20000) {
              ElMessage.success('已完成审批')
              dialog.show = false
              emit('change')
            } else {
              ElMessage.error(res.data.msg)
            }
          })
        }).catch(() => {
          // 取消通过审批
        })
      }
    }
  }
}
</script>

<style scoped>
.tag {
  @apply w-1 h-4 bg-red-500 rounded
}
.content {
  @apply w-full h-10 bg-gray-100 rounded-md px-3.5
}
</style>