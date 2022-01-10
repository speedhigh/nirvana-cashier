<template>
  <main class="space-y-4">
    <!-- 大客户资料(info) -->
    <section>
      <h2>大客户资料</h2>
      <div class="mt-6 flex space-x-6">
        <el-avatar
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" 
          :size="74"
          width="74"
          height="74"
          alt="avatar"
          class="flex-shrink-0" 
        />
        <div class="mt-1 flex-grow space-y-4">
          <p class="text-2xl">{{ info.yonghuming }}</p>
          <div class="flex items-center space-x-14 text-gray-700">
            <p>用户ID：{{ info.id }}</p>
            <p>联系方式：{{ info.lianxifangshi }}</p>
            <p>上级ID：{{ info.shangjiid }}</p>
            <p>注册时间：{{ info.zhuceriqi }}</p>
            <p>到期时间：{{ info.endriqi }}</p>
          </div>
          <div class="flex items-center space-x-14 text-gray-700">
            <p>累计订单数量：{{ info.leijidingdanshuliang }}</p>
            <p>累计订单金额：{{ info.leijidingdanjine }}</p>
            <p>累计订单收益：{{ info.leijidingdanshouyi }}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- 订单分析 -->
    <section v-if="niandudtos.show || jidudtos.show || yuedudtos.show" >
      <h2>订单分析</h2>
      <div class="mt-5 grid grid-cols-3 gap-x-6">

        <!-- 年度 -->
        <div v-if="niandudtos.show" class="w-full">
          <div class="flex items-center space-x-2">
            <div class="tag" /><h3>年度</h3>
          </div>
          <div v-loading="niandudtos.loading" class="chart-box">
            <base-chart :options="niandudtos.options" />
          </div>
        </div>

        <!-- 季度 -->
        <div v-if="jidudtos.show" class="w-full">
          <div class="flex items-center space-x-2">
            <div class="tag" /><h3>季度</h3>
          </div>
          <div v-loading="jidudtos.loading" class="chart-box">
            <base-chart :options="jidudtos.options" />
          </div>
        </div>

        <!-- 月度 -->
        <div v-if="yuedudtos.show" class="w-full">
          <div class="flex items-center space-x-2">
            <div class="tag" /><h3>月度</h3>
          </div>
          <div v-loading="yuedudtos.loading" class="chart-box">
            <base-chart :options="yuedudtos.options" />
          </div>
        </div>
      </div>
    </section>
    <!-- 表格数据 -->
    <section>
      <div class="flex items-center">
        <!-- 选择日期区间 -->
        <el-date-picker
          type="daterange"
          range-separator="—"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="mt-2.5"
        />
        <!-- 搜索 -->
        <el-input
          class="w-64 ml-auto"
          placeholder="搜索"
          :suffix-icon="Search"
        />
      </div>
      <div v-if="salaries.length > 0" class="mt-4">
        <el-table :data="salaries" border style="width: 100%">
          <el-table-column prop="xiadanshijian" label="下单时间" width="240" />
          <el-table-column prop="shangjiid" label="上级id" width="180" />
          <el-table-column prop="" label="子订单数量" width="150" />
          <el-table-column prop="dingdanjine" label="订单金额(元)" width="450" />
          <el-table-column prop="dingdanshouyi" label="订单收益(元)" width="450" />
          <el-table-column label="操作">
            <template #default="scope">
              <p class="text-red-700 underline cursor-pointer" @click="handleEdit(scope.$index, scope.row)">查看信息</p>
            </template>
          </el-table-column>
          </el-table>
      </div>
      <el-empty v-else description=" " class="mt-6 text-sm text-gray-500">暂无订单</el-empty>
    </section>
  </main>
</template>

<script>
import { reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router'
import api from '/src/api/index.js'
import barChartOptions from '/src/charts/barChartOptions.js'
import lineChartOptions from '/src/charts/lineChartOptions.js'
import ChartBar from '../../../components/Chart/ChartBar.vue'
import ChartLine from '../../../components/Chart/ChartLine.vue'
export default {
  components: {
    ChartBar,
    ChartLine
  },
  setup() {
    const route = useRoute()
    const router = useRouter()

    // 大客户资料
    const info = ref({})

    const niandudtos = reactive({
      show: false,
      options: barChartOptions(), 
      loading: true 
    })

    const jidudtos = reactive({
      show: false,
      options: lineChartOptions(), 
      loading: true 
    })

    const yuedudtos = reactive({
      show: false,
      options: lineChartOptions(), 
      loading: true 
    })

    const salaries = ref([])


    api.get('/home/getGaoJiJingLiById', { id: route.params.id }).then((res) => {
      console.log(res)
      // info（个人资料）
      info.value = res.data.data.info

      // 年度图表
      let nianduArr = JSON.parse(res.data.data.niandudtos)
      if(nianduArr.length > 0) niandudtos.show = true
      let nianduOptions = barChartOptions(nianduArr.map(item => item.shijian), nianduArr.map(item => item.renshu))
      niandudtos.options = nianduOptions
      niandudtos.loading = false

      // 季度图表
      let jiduArr = JSON.parse(res.data.data.jidudtos)
      if(jiduArr.length > 0) jidudtos.show = true
      let jiduOptions = lineChartOptions(jiduArr.map(item => item.shijian), jiduArr.map(item => item.renshu))
      jidudtos.options = jiduOptions
      jidudtos.loading = false

      // 月度图表
      let yueduArr = JSON.parse(res.data.data.yuedudtos)
      if(yueduArr.length > 0) yuedudtos.show = true
      let yueduoptions = lineChartOptions(yueduArr.map(item => item.shijian), yueduArr.map(item => item.renshu))
      yuedudtos.options = yueduoptions
      yuedudtos.loading = false

      // salaries
      salaries.value = res.data.data.salaries
    })

    return {
      Search,
      info,
      niandudtos,
      jidudtos,
      yuedudtos,
      salaries,
      handleEdit(index, data) {
        router.push('/data/order/detail/' + data.orderid)
      }
    }
  }
}
</script>

<style scoped>
  section {
    @apply w-full bg-white rounded-lg pt-5 pb-6 px-6 shadow backdrop-blur-sm
  }
  .chart-box {
    @apply mt-3 w-full h-72 rounded-2xl border px-1 pt-5 pb-2
  }
  .tag {
    @apply w-1.5 h-1.5 rounded-full bg-orange-400
  }
</style>