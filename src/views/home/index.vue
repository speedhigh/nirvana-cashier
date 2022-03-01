<template>
  <main class="w-full h-full grid grid-cols-2 gap-4">
    <!-- 订单分析 -->
    <section-analyze />
    <!-- 最近订单 -->
    <section-order />
    <!-- 待办信息 -->
    <section-todo />
  </main>
</template>

<script>
import SectionAnalyze from './components/SectionAnalyze.vue'
import SectionOrder from './components/SectionOrder.vue'
import SectionTodo from './components/SectionTodo.vue'
export default {
  components: {
    SectionAnalyze,
    SectionOrder,
    SectionTodo
  }
}
</script>

<style scoped>
  section {
    @apply w-full h-full bg-white rounded-lg py-5 px-6 shadow
  }
</style>
