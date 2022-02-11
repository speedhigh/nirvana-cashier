<template>
  <div class="w-[80%] h-full bg-white rounded-lg py-5 px-6 shadow">
    <el-date-picker
      v-model="dateValue"
      type="daterange"
      range-separator="—"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      class="mt-2.5"
    />
    <div class="mt-4">
      <div class="w-full h-[500px]">
        <chart-pie
          id="aa"
          :data="pieData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import ChartPie from '../../../components/Chart/ChartPie.vue'
export default {
  components: {
    ChartPie
  },
  setup() {
    const dateValue = ref('')
    const pieData = [
      {value: 35, name: '龙角散镇咳祛痰粉'},
      {value: 30, name: '富士制药 月经不调 不孕不育注射剂10mg 1ml*10支'},
      {value: 20, name: '就光膏药贴'},
      {value: 10, name: '大幕制药符合维生素钙片 草莓味（120粒）'},
      {value: 5, name: '高市制药 龙角三S（32粒）'}
    ]
    return {
      dateValue,
      pieData
    }
  }
}
</script>