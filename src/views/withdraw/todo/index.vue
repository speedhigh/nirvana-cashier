<template>
  <div class="w-full bg-white rounded-lg pt-2 pb-5 px-6 shadow">

    <!-- tabbar -->
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="大客户待办信息" name="/home/getToDoInformations_DKH" />
      <el-tab-pane label="高级经理待办信息" name="/home/getToDoInformations_GJ" />
    </el-tabs>

    <!-- filter -->
    <div class="py-3 px-4 flex items-center flex-wrap text-sm bg-gray-50 shadow rounded-md">
      <!-- 账户ID -->
      <div class="flex items-center mr-4 mb-2">
        <p class="flex-shrink-0">账户ID：</p>
        <el-input v-model="params.userId" size="small" clearable class="w-32" type="number" />
      </div>
      <!-- 用户名 -->
      <div class="flex items-center mr-4 mb-2">
        <p class="flex-shrink-0">用户名：</p>
        <el-input v-model="params.userName" size="small" clearable class="w-32" />
      </div>
      <!-- 所属公司 -->
      <div class="flex items-center mr-4 mb-2">
        <p class="flex-shrink-0">所属公司：</p>
        <el-input v-model="params.company" size="small" clearable class="w-40" />
      </div>
      <!-- 开户行 -->
      <div class="flex items-center mr-4 mb-2">
        <p class="flex-shrink-0">开户行：</p>
        <el-input v-model="params.banks" size="small" clearable class="w-40" />
      </div>
      <!-- 开户人 -->
      <div class="flex items-center mr-4 mb-2">
        <p class="flex-shrink-0">开户人：</p>
        <el-input v-model="params.cardUserName" size="small" clearable class="w-32" />
      </div>
      <!-- 账户/卡号 -->
      <div class="flex items-center mr-4 mb-2">
        <p class="flex-shrink-0">账户/卡号：</p>
        <el-input v-model="params.accountNum" size="small" type="number" clearable class="w-60" />
      </div>
      <!-- 导出excel -->
      <button class="mb-2 w-24 h-8 bg-teal-600 text-sm text-white rounded hover:bg-teal-500 tracking-wider active:hover:bg-teal-600" @click="exportTable">导出excel</button>
      <!-- 日期 -->
      <div class="flex items-center mr-4">
        <p class="flex-shrink-0">起止日期：</p>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="—"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          class="mr-4"
          @change="changeDate"
        />
      </div>
      <!-- 展示数量 -->
      <div class="flex items-center">
        <p class="flex-shrink-0">展示数量：</p>
        <el-input v-model="size" type="number" size="small" class="w-28" />
      </div>
    </div>

    <!-- table-list -->
    <base-pagination
      ref="paginationRef"
      :params="params"
      :size="+size"
      :url="activeName"
      class="mt-4"
    >
      <template #default="slotProps">
        <el-table
          id="table-data"
          :data="slotProps.list"
          class="cursor-pointer"
          stripe
        >
          <el-table-column prop="userId" label="账户ID" min-width="90" />
          <el-table-column prop="userName" label="用户名" min-width="110" />
          <el-table-column prop="company" label="所属公司" min-width="130" />
          <el-table-column prop="banks" label="开户行" min-width="180" />
          <el-table-column prop="cardUserName" label="开户人" min-width="110" />
          <el-table-column prop="accountNum" label="账户/卡号" min-width="200" />
          <el-table-column label="收益来源">
            <template #default="scope">
              <p class="text-red-700 underline cursor-pointer" @click="handleDtl(scope.$index, scope.row)">查看详情</p>
            </template>
          </el-table-column>
          <el-table-column prop="cashOutHK" label="提现金额（HK$）" min-width="150" />
          <el-table-column prop="exchangeRates" label="当日汇率" min-width="100" />
          <el-table-column prop="cashOutRMB" label="提现金额（￥）" min-width="130" />
          <el-table-column prop="charge" label="手续费（￥）" min-width="110" />
          <el-table-column prop="tax" label="代扣代缴个税（￥）" min-width="150" />
          <el-table-column prop="pay" label="实际到账（￥）" min-width="120" />
          <!-- 吃 -->
          <el-table-column prop="insertTime" label="申请日期" min-width="250" />
          <el-table-column prop="state" label="当前状态" min-width="120" />
          <!-- 备注 -->
          <el-table-column label="备注（若要驳回申请，必须写备注）" min-width="500">
            <template #default="scope">
              <el-input v-model="scope.row.content" />
            </template>
          </el-table-column>
          <!-- 操作 -->
          <el-table-column label="操作" min-width="200">
            <template #default="scope">
              <div class="space-x-2.5 text-white text-sm">
                <button class="w-20 h-9 rounded-md bg-teal-600 hover:bg-teal-500 active:bg-teal-600" @click="confirm(scope.row)">{{ confirmText }}</button>
                <button class="w-20 h-9 rounded-md bg-red-600 hover:bg-red-500 active:bg-red-600" @click="failed(scope.row)">驳回申请</button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </base-pagination>
  </div>
</template>

<script>
import { ref } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'
import api from '/src/api/index.js'
import fileSaver from 'file-saver'
import xlsx from 'xlsx'
import dayjs from 'dayjs'
export default {
  setup() {
    const paginationRef = ref(null)
    const activeName = ref('/home/getToDoInformations_DKH')
    const size = ref(7)
    const date = ref([])
    const params = ref({
      userId: '',
      userName: '',
      company: '',
      banks: '',
      cardUserName: '',
      accountNum: '',
      startTime: '',
      endTime: '',
      state: '',
      approver: ''
    })
    let confirmText = ref('')
    if(sessionStorage.getItem('usergroup') === '13') confirmText.value = '通过审核'
    if(sessionStorage.getItem('usergroup') === '14') confirmText.value = '打款完成'
    const shenfen = ref('cnewb')
    return {
      paginationRef,
      activeName,
      size,
      date,
      params,
      confirmText,
      shenfen,
      // 切换tabbar
      handleClick() {
        if(activeName.value === '/home/getToDoInformations_DKH') shenfen.value = 'cnewb'
        if(activeName.value === '/home/getToDoInformations_GJ') shenfen.value = 'newb'
      },
      // 切换日期
      changeDate(d) {
        if(d) {
          params.value.startTime = dayjs(d[0]).format('YYYY-MM-DD')
          params.value.endTime = dayjs(d[1]).format('YYYY-MM-DD')
        } else {
          params.value.startTime = params.value.endTime = ''
        }
      },
      // 导出excel
      exportTable() {
        let box = xlsx.utils.table_to_book(document.querySelector('#table-data'), { raw: true })
        let out = xlsx.write(box, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {fileSaver.saveAs(new Blob([out], {type: 'application/octet-stream'}),'sheet.xlsx')}
        catch (error) { console.log(error) }
        return out
      },
      // 通过审核
      confirm(row) {
        ElMessageBox.confirm( '确定要通过申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
          showClose: false
        })
        .then(() => {
          api.get('/home/getTiXianSUCCESS', { id: row.id, content: '', shenfen: shenfen.value }).then((res) => {
            if(res.data.code === 20000) {
              ElMessage.success('已完成审批')
              paginationRef.value.BasePaginationMitt.emit('refresh')
            } else {
              ElMessage.error(res.data.msg)
            }
          })
        }).catch(() => {})
      },
      // 驳回申请
      failed(row) {
        if(!row.content) { ElMessage.error('请填写未通过理由'); return }
        ElMessageBox.confirm( '确定要驳回申请吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'info',
          showClose: false
        })
        .then(() => {
          api.get('/home/getTiXianFAIL', { id: row.id, content: row.content, shenfen: shenfen.value }).then((res) => {
            if(res.data.code === 20000) {
              ElMessage.success('已完成审批')
              paginationRef.value.BasePaginationMitt.emit('refresh')
            } else {
              ElMessage.error(res.data.msg)
            }
          })
        }).catch(() => {})
      }
    }
  }
}
</script>