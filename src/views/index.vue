<template>
  <div class="box">
    <!-- 订单分析 -->
    <div class="col-span-2 box-child">
      <h2>订单分析</h2>
      <el-date-picker
        v-model="dateValue"
        type="daterange"
        range-separator="—"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        class="mt-2.5"
      >
      </el-date-picker>
      <div class="mt-5 grid grid-cols-3 gap-x-6">
        <!-- 总成交量 -->
        <div class="w-full">
          <div class="flex items-center space-x-2">
            <div class="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <p class="font-bold">总成交量</p>
          </div>
          <div class="mt-3 w-full h-72 rounded-2xl border px-1 pt-5 pb-2">
            <chart-bar
              id="numCharts"
              :xData="['2021-12-27', '2021-12-24', '2021-12-23', '2021-12-29', '2021-12-31']" 
              :yData="[2, 15, 10, 20, 35]"
            />
          </div>
        </div>
        <!-- 总成交额 -->
        <div class="w-full">
          <div class="flex items-center space-x-2">
            <div class="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <p class="font-bold">总成交额</p>
          </div>
          <div class="mt-3 w-full h-72 rounded-2xl border px-1 pt-5 pb-2">
            <chart-line
              id="sumCharts"
              :xData="['2021-12-27', '2021-12-24', '2021-12-23', '2021-12-29', '2021-12-31']" 
              :yData="[2, 15, 10, 20, 35]"
            />
          </div>
        </div>
        <!-- 总收益 -->
        <div class="w-full">
          <div class="flex items-center space-x-2">
            <div class="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <p class="font-bold">总收益</p>
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
    <!-- 最近订单 -->
    <div class="col-span-1 box-child">
      <div class="flex items-center">
        <h2>最近订单</h2>
        <router-link to="/data/order" class="ml-auto text-gray-500 cursor-pointer hover:text-gray-800">查看更多 ></router-link>
      </div>
      <div v-if="orderList.length > 0" class="mt-4">
        <el-table :data="orderList" border style="width: 100%">
          <el-table-column prop="date" label="时间" width="132" />
          <el-table-column prop="id" label="高级经理Id" width="132" />
          <el-table-column prop="name" label="高级经理用户名" width="132" />
          <el-table-column prop="turnover" label="成交额(元)" width="132" />
          <el-table-column prop="income" label="收益额(元)" width="132" />
          <el-table-column prop="income" label="上级ID" />
        </el-table>
      </div>
      <el-empty v-else description="暂无订单" class="mt-6" />
    </div>
    <!-- 待办信息 -->
    <div class="col-span-1 box-child">
      <div class="flex items-center">
        <h2>待办信息</h2>
        <router-link to="/todo/list" class="ml-auto text-gray-500 cursor-pointer hover:text-gray-800">查看更多 ></router-link>
      </div>
      <div v-if="orderList.length > 0" class="mt-2.5">
        <div 
          v-for="(item, index) in orderList"
          :key="index" 
          class="flex items-center cursor-pointer pr-2 hover:font-bold"
        >
          <div class="pt-5 pb-3.5 flex-shrink-0 mr-2">
            <div class="w-2 h-2 rounded-full bg-gray-400" />
          </div>
          <div 
            class="flex-grow flex items-center pt-5 pb-3.5"
            :class="index === orderList.length - 1 ? '' : 'border-b border-gray-200'"
          >
            <p class="line-1 flex-grow mr-4 text-gray-500">处理来自大客户燕喜堂的提现收益申请处理来自大客户燕喜堂的提现收益申请申请</p>
            <p class="ml-auto flex-shrink-0 text-red-700">待处理></p>
          </div>
        </div>
      </div>
      <el-empty v-else description="暂无信息" class="mt-6" />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ChartBar from '../components/Chart/ChartBar.vue'
import ChartLine from '../components/Chart/ChartLine.vue'
// import api from '/src/api/index.js'
export default {
  components: {
    ChartBar,
    ChartLine
  },
  setup() {
    // const banners = ref([])
    // api.get("/open/home/get_banner").then((res) => { banners.value = res.data.data })
    // return {
    //   banners
    // }
    const dateValue = ref('')
    const orderList = [
      { date: '2016-05-03', id: '1233113', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', turnover: '2456', income: '6787', cnewb_id: '167843' },
      { date: '2016-05-03', id: '1233113', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', turnover: '2456', income: '6787', cnewb_id: '167843' },
      { date: '2016-05-03', id: '1233113', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', turnover: '2456', income: '6787', cnewb_id: '167843' },
      { date: '2016-05-03', id: '1233113', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', turnover: '2456', income: '6787', cnewb_id: '167843' },
      { date: '2016-05-03', id: '1233113', name: 'Tom', address: 'No. 189, Grove St, Los Angeles', turnover: '2456', income: '6787', cnewb_id: '167843' }
    ]
    return {
      orderList,
      dateValue
    }
  }
}
</script>

<style scoped>
  h2 {
    @apply font-bold text-lg
  }
  .box {
    @apply w-full grid grid-cols-2 gap-4
  }
  .box-child {
    @apply w-full h-full bg-white rounded-lg py-5 px-6 shadow backdrop-blur-sm
  }
</style>
