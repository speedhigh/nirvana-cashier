<template>
  <div class="space-y-4">
    <!-- 高级经理资料 -->
    <div class="w-full bg-white rounded-lg pt-5 pb-6 px-6 shadow backdrop-blur-sm">
      <h2 class="text-lg font-bold">高级经理资料</h2>
      <div class="mt-6 flex space-x-6">
        <el-avatar :size="74" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" alt="avatar" class="flex-shrink-0" />
        <div class="mt-1 flex-grow space-y-4">
          <p class="text-2xl">安妮谷拉丝</p>
          <div class="flex items-center space-x-14 text-gray-700">
            <p>用户ID：1433223</p>
            <p>联系方式：17076868695</p>
            <p>上级ID：4687</p>
            <p>注册时间：2021-12-30</p>
            <p>到期时间：2022-12-30</p>
          </div>
          <div class="flex items-center space-x-14 text-gray-700">
            <p>累计订单数量：4671</p>
            <p>累计订单金额：178967.00</p>
            <p>累计订单收益：1789.67</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单分析 -->
    <div class="w-full bg-white rounded-lg pt-5 pb-6 px-6 shadow backdrop-blur-sm">
      <h2 class="text-lg font-bold">订单分析</h2>
      <div class="mt-5 grid grid-cols-3 gap-x-6">
        <!-- 年度 -->
        <div class="w-full">
          <div class="flex items-center space-x-2">
            <div class="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <p class="font-bold">年度</p>
          </div>
          <div class="mt-3 w-full h-72 rounded-2xl border px-1 pt-5 pb-2">
            <chart-bar
              id="numCharts"
              :xData="['2021-12-27', '2021-12-24', '2021-12-23', '2021-12-29', '2021-12-31']" 
              :yData="[2, 15, 10, 20, 35]"
            />
          </div>
        </div>
        <!-- 季度 -->
        <div class="w-full">
          <div class="flex items-center space-x-2">
            <div class="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <p class="font-bold">季度</p>
          </div>
          <div class="mt-3 w-full h-72 rounded-2xl border px-1 pt-5 pb-2">
            <chart-line
              id="sumCharts"
              :xData="['2021-12-27', '2021-12-24', '2021-12-23', '2021-12-29', '2021-12-31']" 
              :yData="[2, 15, 10, 20, 35]"
            />
          </div>
        </div>
        <!-- 月度 -->
        <div class="w-full">
          <div class="flex items-center space-x-2">
            <div class="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <p class="font-bold">月度</p>
          </div>
          <div class="mt-3 w-full h-72 rounded-2xl border px-1 pt-5 pb-2">
            <chart-line
              id="expendCharts"
              :xData="['2021-12-27', '2021-12-24', '2021-12-23', '2021-12-29', '2021-12-31']" 
              :yData="[2, 15, 10, 20, 35]"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- 表格数据 -->
    <div class="w-full bg-white rounded-lg pt-5 pb-6 px-6 shadow backdrop-blur-sm">
      <div class="flex items-center">
        <!-- 选择日期区间 -->
        <el-date-picker
          v-model="params.date"
          type="daterange"
          range-separator="—"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="mt-2.5"
        />
        <!-- 搜索 -->
        <el-input
          v-model="params.search"
          class="w-64 ml-auto"
          placeholder="搜索"
          :suffix-icon="Search"
        />
      </div>
      <div v-if="orderList.length > 0" class="mt-4">
        <el-table :data="orderList" border style="width: 100%">
          <el-table-column prop="date" label="下单时间" width="240" />
          <el-table-column prop="num" label="子订单数量" width="240" />
          <el-table-column prop="price" label="订单金额(元)" width="470" />
          <el-table-column prop="income" label="订单收益(元)" width="470" />
          <el-table-column label="操作">
            <template #default="scope">
              <p class="text-red-700 underline cursor-pointer" @click="handleEdit(scope.$index, scope.row)">查看信息</p>
            </template>
          </el-table-column>
          </el-table>
      </div>
      <el-empty v-else description="暂无订单" class="mt-6" />
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import ChartBar from '../../../components/Chart/ChartBar.vue'
import ChartLine from '../../../components/Chart/ChartLine.vue'
export default {
  components: {
    ChartBar,
    ChartLine
  },
  setup() {
    const params = reactive({
      date: '',
      search: ''
    })
    const orderList = [
      { date: '2016-05-03', num: '1233113', price: '2456', income: '6787'},
      { date: '2016-05-03', num: '1233113', price: '2456', income: '6787'},
      { date: '2016-05-03', num: '1233113', price: '2456', income: '6787'},
      { date: '2016-05-03', num: '1233113', price: '2456', income: '6787'},
      { date: '2016-05-03', num: '1233113', price: '2456', income: '6787'}
    ]
    return {
      Search,
      params,
      orderList
    }
  }
}
</script>

<style>

</style>