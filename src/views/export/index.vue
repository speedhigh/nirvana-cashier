<template>
  <div class="w-full bg-white rounded-lg pt-5 px-6 pb-10 shadow">
    <div class="flex items-center">
      <div class="flex items-center space-x-4">
        <!-- 选择日期区间 -->
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="—"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeDate"
        />
        <!-- 搜索姓名 -->
        <el-input
          v-model="params.name"
          placeholder="请输入姓名"
          clearable
          :prefix-icon="Search"
          class="w-56"
        />
        <!-- 搜索药品名 -->
        <el-input
          v-model="params.drug"
          placeholder="请输入药品名"
          clearable
          :prefix-icon="Search"
          class="w-56"
        />
        <!-- 提现情况 -->
        <el-select v-model="params.withdraw" class="m-2" placeholder="提现情况" size="large" clearable>
          <el-option label="已提现" value="yes"/>
          <el-option label="未提现" value="no"/>
        </el-select>
        <!-- 导出按钮 -->
        <button class="w-24 h-10 bg-teal-600 text-sm text-white rounded hover:bg-teal-500 tracking-wider active:hover:bg-teal-600" @click="exportTable">导出excel</button>
      </div>
      <!-- 展示数量 -->
      <div class="ml-auto">
        <span class="text-gray-500">展示数量：</span>
        <el-input
          v-model="size"
          type="number"
          class="w-24"
        />
      </div>
    </div>

    <base-pagination
      :params="params"
      :size="+size"
      url="/home/getOrdersAllPage"
      class="mt-5"
    >
      <template #default="slotProps">
        <el-table id="table-data" :data="slotProps.list" border stripe style="width: 100%">
          <el-table-column prop="orderid" label="订单ID" min-width="50" />
          <el-table-column prop="zhuceshoujihao" label="注册手机号" min-width="100" />
          <el-table-column prop="shimingname" label="真实姓名" min-width="80" />
          <el-table-column prop="shimingscardno" label="身份证号" min-width="120" />
          <el-table-column prop="inserttimestr" label="插入时间" min-width="120" />
          <el-table-column prop="updatetimestr" label="更新时间" min-width="120" />
          <el-table-column prop="productname" label="订单产品" min-width="300" />
          <el-table-column prop="shifoutixian" label="提现状态" min-width="60" />
        </el-table>
      </template>
    </base-pagination>
  </div>
</template>

<script>
import { ref, reactive } from "vue"
import { Search } from '@element-plus/icons-vue'
import fileSaver from 'file-saver'
import xlsx from 'xlsx'
import dayjs from 'dayjs'
export default {
  setup() {
    const date = ref([])
    const size = ref(12)
    const params = reactive({
      datestart: '',
      dateend: '',
      name: '',
      drug: '',
      withdraw: ''
    })
    return {
      Search,
      date,
      size,
      changeDate(d) {
        params.datestart = dayjs(d[0]).format('YYYY-MM-DD')
        params.dateend = dayjs(d[1]).format('YYYY-MM-DD')
      },
      params,
      // 导出excel
      exportTable() {
        let box = xlsx.utils.table_to_book(document.querySelector('#table-data'))
        let out = xlsx.write(box, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {fileSaver.saveAs(new Blob([out], {type: 'application/octet-stream'}),'sheet.xlsx')}
        catch (error) { console.log(error) }
        return out
      },
    }
  }
}
</script>

<style>

</style>