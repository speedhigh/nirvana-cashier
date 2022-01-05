<template>
  <div class="w-full h-full bg-white rounded-lg py-5 px-6 shadow backdrop-blur-sm">
    <el-date-picker
      v-model="dateValue"
      type="daterange"
      range-separator="—"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      class="mt-2.5"
    />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
export default {
  setup() {
    const dateValue = ref('')
    return {
      dateValue
    }
  }
}
</script>

<style>

</style>