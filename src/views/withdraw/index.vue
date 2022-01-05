<template>
  <div class="w-[80%] h-full bg-white rounded-lg py-5 px-6 shadow backdrop-blur-sm">
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      class="cursor-pointer"
    >
      <el-table-column prop="date" label="时间" width="150" />
      <el-table-column prop="name" label="申请大客户" width="150" />
      <el-table-column prop="price" label="申请金额" width="150" />
      <el-table-column prop="audit" label="审核人" width="150" />
      <el-table-column prop="remark" label="备注" />
      <el-table-column prop="state" label="状态" width="100" align="center" />
      <el-table-column label="操作" width="90">
        <template #default="scope">
          <!-- <p class="text-red-700 underline cursor-pointer" @click="handleEdit(scope.$index, scope.row)">查看信息</p> -->
          <button 
            v-if="scope.row.state === '待处理'" 
            class="w-16 h-6 bg-amber-500 text-white text-xs rounded hover:bg-amber-400 active:bg-amber-500"
          >
            去处理
          </button>
          <button 
            v-if="scope.row.state === '未通过'" 
            class="w-16 h-6 text-xs text-red-700 border border-red-600 rounded hover:bg-red-500 hover:text-white active:bg-red-400"
          >
            查看信息
          </button>
          <button 
            v-if="scope.row.state === '已打款'" 
            class="w-16 h-6 text-xs text-lime-700 border border-lime-600 rounded hover:bg-lime-600 hover:text-white active:bg-lime-500"
          >
            查看信息
          </button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  setup() {
    const tableData = [
      { date: '2016-05-02', name: '王小虎', price: '2000', audit: '安妮谷拉丝', remark: '', state: '待处理' },
      { date: '2016-05-02', name: '王小虎', price: '2000', audit: '安妮谷拉丝', remark: '不放葱花，多加香菜辣不放葱花，多加香菜辣', state: '未通过' },
      { date: '2016-05-02', name: '王小虎', price: '2000', audit: '安妮谷拉丝', remark: '不放葱花，多加香菜辣', state: '未通过' },
      { date: '2016-05-02', name: '王小虎', price: '2000', audit: '安妮谷拉丝', remark: '', state: '已打款' },
      { date: '2016-05-02', name: '王小虎', price: '2000', audit: '安妮谷拉丝', remark: '', state: '已打款' },
      { date: '2016-05-02', name: '王小虎', price: '2000', audit: '安妮谷拉丝', remark: '', state: '待处理' },
      { date: '2016-05-02', name: '王小虎', price: '2000', audit: '安妮谷拉丝', remark: '', state: '待处理' },
      { date: '2016-05-02', name: '王小虎', price: '2000', audit: '安妮谷拉丝', remark: '不放葱花，多加香菜辣', state: '未通过' },
      { date: '2016-05-02', name: '王小虎', price: '2000', audit: '安妮谷拉丝', remark: '', state: '已打款' },
      { date: '2016-05-02', name: '王小虎', price: '2000', audit: '安妮谷拉丝', remark: '', state: '已打款' },
      { date: '2016-05-02', name: '王小虎', price: '2000', audit: '安妮谷拉丝', remark: '', state: '已打款' },
      { date: '2016-05-02', name: '王小虎', price: '2000', audit: '安妮谷拉丝', remark: '', state: '待处理' },
      { date: '2016-05-02', name: '王小虎', price: '2000', audit: '安妮谷拉丝', remark: '', state: '已打款' }
    ]
    return {
      tableData,
      tableRowClassName({row, rowIndex}) {
        if(row.state === '待处理') {
          return 'warning-row'
        }
      }
    }
  }
}
</script>
<style>
.el-table .warning-row {
  background: oldlace;
}
</style>