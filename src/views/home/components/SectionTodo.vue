<template>
  <section>
    <!-- title -->
    <div class="flex items-center">
      <h2>{{$t(`message.todo`)}}</h2>
      <router-link 
        v-show="todos.list.length > 0"
        to="/withdraw/todo"
        class="ml-auto text-gray-500 cursor-pointer hover:text-gray-800"
      >
        {{$t(`message.more`)}} >
      </router-link>
    </div>
    <!-- content -->
    <div
      v-if="todos.list.length > 0"
      v-loading="todos.loading" 
      class="mt-2.5"
    >
      <div
        v-for="item in todos.list"
        :key="item.id"
        class="flex items-center cursor-pointer pr-2 hover:font-bold active:font-normal"
      >
        <div class="flex-shrink-0 pt-5 pb-3.5 mr-2">
          <div class="w-2 h-2 rounded-full bg-gray-400" />
        </div>
        <router-link to="/withdraw/todo" class="flex-grow flex items-center pt-5 pb-3.5 border-b border-gray-200 hover:border-gray-300 active:border-gray-200">
          <p class="flex-grow mr-4 text-gray-500 line-1">{{ item.shuoming }}</p>
          <p class="ml-auto flex-shrink-0 text-red-700">{{ item.zhuangtai }}></p>
        </router-link>
      </div>
    </div>
    <el-empty v-if="todos.list.length === 0 && !todos.loading" description=" " class="text-sm text-gray-500"> {{$t(`message.noInfo`)}} </el-empty>
  </section>
</template>

<script>
import { reactive, onMounted } from 'vue'
import api from '/src/api/index.js'
export default {
  setup(props, { emit }) {
    const todos = reactive({
      loading: true,
      list: []
    })
    const getTodoList = function() {
      api.get('/home/getToDoInformations').then((res) => { 
        todos.list = res.data.data
        todos.loading = false
      })
    }
    onMounted(() => {
      getTodoList()
    })
    return {
      todos,
      getTodoList
    }
  }
}
</script>