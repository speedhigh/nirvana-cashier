<template>
  <main class="space-y-4">
    <!-- 大客户资料(info) -->
    <section>
      <h2>{{$t(`message.customerProfile`)}}</h2>
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
            <p>{{$t(`message.userId`)}}：{{ info.id }}</p>
            <p>{{$t(`message.phone`)}}：{{ info.lianxifangshi }}</p>
            <p>{{$t(`message.subNum`)}}：{{ info.xiajishuliang }}</p>
            <p>{{$t(`message.regisiterTime`)}}：{{ info.zhuceriqi }}</p>
            <p>{{$t(`message.expiryTime`)}}：{{ info.endriqi }}</p>
          </div>
          <div class="flex items-center space-x-14 text-gray-700">
            <p>{{$t(`message.orderNum`)}}：{{ info.leijidingdanshuliang }}</p>
            <p>{{$t(`message.orderAmount`)}}：{{ info.leijidingdanjine }}</p>
            <p>{{$t(`message.orderRevenue`)}}：{{ info.leijidingdanshouyi }}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- 订单分析 -->
    <section  v-if="niandudtos.show || jidudtos.show || yuedudtos.show">
      <h2>订单分析</h2>
      <div class="mt-5 grid grid-cols-3 gap-x-6">

        <!-- 年度 -->
        <div v-if="niandudtos.show" class="w-full">
          <div class="flex items-center space-x-2">
            <div class="tag" /><h3>年度</h3>
          </div>
          <div v-loading="niandudtos.loading" class="chart-box">
            <base-chart id="niandudtos" :options="niandudtos.options" />
          </div>
        </div>

        <!-- 季度 -->
        <div v-if="jidudtos.show" class="w-full">
          <div class="flex items-center space-x-2">
            <div class="tag" /><h3>季度</h3>
          </div>
          <div v-loading="jidudtos.loading" class="chart-box">
            <base-chart id="jidudtos" :options="jidudtos.options" />
          </div>
        </div>

        <!-- 月度 -->
        <div v-if="yuedudtos.show" class="w-full">
          <div class="flex items-center space-x-2">
            <div class="tag" /><h3>月度</h3>
          </div>
          <div v-loading="yuedudtos.loading" class="chart-box">
            <base-chart id="yuedudtos" :options="yuedudtos.options" />
          </div>
        </div>
      </div>
    </section>
    <!-- 表格数据 -->
    <section>
      <!--
      <div class="flex items-center">
        <el-date-picker
          type="daterange"
          range-separator="—"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          class="mt-2.5"
        />
        <el-input
          class="w-64 ml-auto"
          placeholder="搜索"
          :suffix-icon="Search"
        />
      </div>
      -->
      <div v-if="salaries.length > 0" class="mt-4">
        <el-table :data="salaries" border stripe style="width: 100%">
          <el-table-column prop="xiadanshijian" label="下单时间" min-width="240" />
          <el-table-column prop="xiajiid" label="下级id" min-width="180" />
          <el-table-column prop="" label="子订单数量" min-width="150" />
          <el-table-column prop="dingdanjine" label="订单金额(元)" min-width="450" />
          <el-table-column prop="dingdanshouyi" label="订单收益(元)" min-width="450" />
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
import { useRoute, useRouter } from 'vue-router'
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


    api.get('/home/getNewBigById', { id: route.params.id }).then((res) => {
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
    @apply w-full bg-white rounded-lg pt-5 pb-6 px-6 shadow
  }
  .chart-box {
    @apply mt-3 w-full h-72 rounded-2xl border px-1 pt-5 pb-2
  }
  .tag {
    @apply w-1.5 h-1.5 rounded-full bg-orange-400
  }
</style>