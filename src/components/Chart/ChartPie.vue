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
    data: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    let option = ref({
      title: {
        text: '木子网药品前5名',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      grid:{
        top:30,
        left:45,// 调整这个属性
        right:30,
        bottom:30,
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          center: ['50%', '65%'],
          data: props.data,
          label: {
            normal: {
              show: true,
              formatter: '{b}  ({d}%)'
            }
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
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