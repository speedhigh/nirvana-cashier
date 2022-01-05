<template>
  <div v-resize="resize" :id="id" class="w-full h-full" />
</template>

<script>
import { ref, onMounted } from 'vue'
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
    let option = ref({
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
          type: 'line',
          smooth: true,
          data: props.yData,
          itemStyle:{
					  color: '#f87171'
				  },
          label: {
            show: true,
            position: 'top',
            valueAnimation: true
          }
        }
      ]
    })
    onMounted(() => {
      let myChart = echarts.init(document.getElementById(props.id))
      window.onresize = function() {
        myChart.resize()
      }
      option.value && myChart.setOption(option.value)
    })
    return {
      option,
      resize() {
        echarts.init(document.getElementById(props.id)).resize()
      }
    }
  }
}
</script>

<style>

</style>