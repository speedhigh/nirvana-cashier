<template>
  <div v-resize="resize" :id="id" class="w-full h-full" />
</template>

<script>
import { ref, onMounted, toRefs, watch } from 'vue'
import * as echarts from 'echarts'
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    xData: {
      type: Array,
      required: true
    },
    yData: {
      type: Array,
      required: false
    }
  },
  setup(props) {
    const { options } = toRefs(props)
    watch( options, newOptions => {
      option.value.xAxis.data = newOptions.xData
      option.value.series[0].data = newOptions.yData
    },
    { deep: true }
    )
    const option = ref({
      xAxis: {
        type: 'category',
        data: props.xData,
      },
      yAxis: {
        type: 'value'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid:{
        top:30,
        left:45,// 调整这个属性
        right:30,
        bottom:30,
      },
      series: [
        {
          type: 'bar',
          data: props.yData,
          itemStyle:{
					  color:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: '#f87171'
            }, {
              offset: 1,
              color: 'rgba(248,113,113,0.1)'
            }]),
				  },
          label: {
            show: true,
            position: 'top',
            valueAnimation: true
          }
        }
      ]
    })
    let myChart
    onMounted(() => {
      myChart = echarts.init(document.getElementById(props.id))
      window.onresize = function() {
        myChart.resize()
      }
      option.value && myChart.setOption(option.value)
    })
    return {
      option,
      resize() {
        myChart.resize()
      }
    }
  }
}
</script>

<style>

</style>