<template>
  <!-- 订单分析 -->
  <section 
    v-if="numCharts.show || sumCharts.show || expendCharts.show"
    class="col-span-2 box-child"
  >
    <h2 class="font-bold text-lg">{{$t(`message.orderAnalysis`)}}</h2>
    <!-- <el-date-picker
      type="daterange"
      range-separator="—"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      class="mt-2.5"
    /> -->
    <div class="mt-5 grid grid-cols-3 gap-x-5">
      <!-- 总成交量 -->
      <div v-if="numCharts.show" class="w-full">
        <div class="flex items-center space-x-2">
          <div class="tag" /><h3>{{$t(`message.totalVolume`)}}</h3>
        </div>
        <div v-loading="numCharts.loading" class="chart-box">
          <base-chart id="numCharts" :options="numCharts.options" />
        </div>
      </div>
      <!-- 总成交额 -->
      <div v-if="sumCharts.show" class="w-full">
        <div class="flex items-center space-x-2">
          <div class="tag" /><h3>{{$t(`message.totalTurnover`)}}</h3>
        </div>
        <div v-loading="sumCharts.loading" class="chart-box">
          <base-chart id="sumCharts" :options="sumCharts.options" />
        </div>
      </div>
      <!-- 总收益 -->
      <div v-if="expendCharts.show" class="w-full">
        <div class="flex items-center space-x-2">
          <div class="tag" /><h3>{{$t(`message.totalRevenue`)}}</h3>
        </div>
        <div v-loading="expendCharts.loading" class="chart-box">
          <base-chart id="expendCharts" :options="expendCharts.options" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive } from 'vue'
import api from '/src/api/index.js'
import barChartOptions from '/src/charts/barChartOptions.js'
import lineChartOptions from '/src/charts/lineChartOptions.js'
import ChartBar from '/src/components/Chart/ChartBar.vue'
import ChartLine from '/src/components/Chart/ChartLine.vue'
export default {
  components: {
    ChartBar,
    ChartLine
  },
  setup() {
    // 总成交量
    const numCharts = reactive({
      show: false,
      options: barChartOptions(), 
      loading: true 
    })
    api.get('/home/getTotalChengJiaoNum').then((res) => {
      let arr = JSON.parse(res.data.data)
      if(arr.length > 0) numCharts.show = true
      let options = barChartOptions(arr.map(item => item.shijian), arr.map(item => item.renshu))
      numCharts.options = options
      numCharts.loading = false
    })

    // 总成交额
    const sumCharts = reactive({
      show: false,
      options: lineChartOptions(),
      loading: true
    })
    api.get('/home/getTotalChengJiaoMoney').then((res) => {
      let arr = JSON.parse(res.data.data)
      if(arr.length > 0) sumCharts.show = true
      let options = lineChartOptions(arr.map(item => item.shijian), arr.map(item => item.renshu))
      sumCharts.options = options
      sumCharts.loading = false
    })

    // 总收益
    const expendCharts = reactive({
      show: false,
      options: lineChartOptions(), 
      loading: true 
    })
    api.get('/home/getTotalZhiChuMoney').then((res) => {
      let arr = JSON.parse(res.data.data)
      if(arr.length > 0) expendCharts.show = true
      let options = lineChartOptions(arr.map(item => item.shijian), arr.map(item => item.renshu))
      expendCharts.options = options
      expendCharts.loading = false
    })
    
    return {
      numCharts,
      sumCharts,
      expendCharts
    }
  }
}
</script>

<style scoped>
.chart-box {
  @apply mt-3 w-full h-72 rounded-2xl border px-1 pt-5 pb-2
}
.tag {
  @apply w-1.5 h-1.5 rounded-full bg-orange-400
}
</style>