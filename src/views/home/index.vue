<template>
  <main class="w-full h-full grid grid-cols-2 gap-4">
    <!-- 订单分析 -->
    <section-analyze />
    <!-- 最近订单 -->
    <section-order />
    <!-- 待办信息 -->
    <section-todo ref="todoRef" @handle="handle" />
  </main>
  <!-- 弹出info -->
  <dialog-info :id="dialog.id" :show="dialog.show" @close="dialogClose" @change="dialogChange" />
</template>

<script>
import { ref,reactive } from 'vue'
import SectionAnalyze from './components/SectionAnalyze.vue'
import SectionOrder from './components/SectionOrder.vue'
import SectionTodo from './components/SectionTodo.vue'
import DialogInfo from '/src/components/DialogInfo.vue'
export default {
  components: {
    SectionAnalyze,
    SectionOrder,
    SectionTodo,
    DialogInfo
  },
  setup() {
    const todoRef = ref(null)
    const dialog = reactive({
      id: '',
      show: false
    })
    return {
      todoRef,
      dialog,
      handle(id) {
        dialog.show = true
        dialog.id = id
      },
      dialogClose() {
        dialog.show = false
      },
      dialogChange() {
        todoRef.value.SectionTodoMitt.emit('refresh')
      }
    }
  }
}
</script>

<style scoped>
  section {
    @apply w-full h-full bg-white rounded-lg py-5 px-6 shadow backdrop-blur-sm
  }
</style>
