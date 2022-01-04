<template>
  <div class="box">
    <!-- 订单分析 -->
    <div class="col-span-2 box-child">
      <h2>订单分析</h2>
    </div>
    <!-- 最近订单 -->
    <div class="col-span-1 box-child">
      <div class="flex items-center">
        <h2>最近订单</h2>
        <p class="ml-auto text-gray-500 cursor-pointer">查看更多 ></p>
      </div>
      <el-table :data="orderList" border style="width: 100%" class="mt-4">
        <el-table-column prop="date" label="时间" width="132" />
        <el-table-column prop="id" label="高级经理Id" width="132" />
        <el-table-column prop="name" label="高级经理用户名" width="132" />
        <el-table-column prop="turnover" label="成交额(元)" width="132" />
        <el-table-column prop="income" label="收益额(元)" width="132" />
        <el-table-column prop="income" label="上级ID" />
      </el-table>
    </div>
    <!-- 待办信息 -->
    <div class="col-span-1 box-child">
      <div class="flex items-center">
        <h2>待办信息</h2>
        <p class="ml-auto text-gray-500 cursor-pointer">查看更多 ></p>
      </div>
      <div class="mt-2.5">
        <div v-for="i in 6" :key="i" class="pt-5 pb-3.5 flex items-center border-b border-gray-100">
          <div class="w-2 h-2 rounded-full bg-gray-400 flex-shrink-0" />
          <p class="ml-1.5 line-1 flex-grow mr-4">处理来自大客户燕喜堂的提现收益申请处理来自大客户燕喜堂的提现收益申请处理来自大客户燕喜堂的提现收益申请处理来自大客户燕喜堂的提现收益申请</p>
          <p class="ml-auto cursor-pointer flex-shrink-0 text-[#F39800]">待处理></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { ref } from 'vue'
// import api from '/src/api/index.js'
export default {
  setup() {
    // const banners = ref([])
    // api.get("/open/home/get_banner").then((res) => { banners.value = res.data.data })
    // return {
    //   banners
    // }
    const orderList = [
      {
        date: '2016-05-03',
        id: '1233113',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        turnover: '2456',
        income: '6787',
        cnewb_id: '167843'
      },
      {
        date: '2016-05-03',
        id: '1233113',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        turnover: '2456',
        income: '6787',
        cnewb_id: '167843'
      },
      {
        date: '2016-05-03',
        id: '1233113',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        turnover: '2456',
        income: '6787',
        cnewb_id: '167843'
      },
      {
        date: '2016-05-03',
        id: '1233113',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        turnover: '2456',
        income: '6787',
        cnewb_id: '167843'
      },
      {
        date: '2016-05-03',
        id: '1233113',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        turnover: '2456',
        income: '6787',
        cnewb_id: '167843'
      }
    ]
    return {
      orderList
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
    @apply w-full h-96 bg-white rounded py-4 px-6
  }
</style>
