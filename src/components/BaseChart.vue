<template>
  <div v-resize="resize" ref="container" class="w-full h-full" />
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
export default {
  props: {
    options: {
      required: true,
      type: Object,
      default: () => {}
    }
  },
  setup(props) {
    const container = ref(null)
    const chart = ref(null)
    onMounted(() => {
      chart.value = echarts.init(container.value)
      window.onresize = function() {
        chart.value.resize()
      }
      chart.value.setOption(props.options)
    })
    watch(() => props.options, (newOptions) => {
      chart.value.setOption(newOptions)
    }, { deep: true })
    return {
      container,
      chart,
      resize() {
        chart.value.resize()
      }
    }
  }
}
</script>