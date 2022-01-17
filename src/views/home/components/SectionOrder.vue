<template>
  <!-- 最近订单 -->
  <section>
    <div class="flex items-center">
      <h2>{{$t(`message.recentOrders`)}}</h2>
      <router-link 
        v-show="order.list.length > 0" 
        to="/data/order" 
        class="ml-auto text-gray-500 cursor-pointer hover:text-gray-800"
      >
        {{$t(`message.more`)}} >
      </router-link>
    </div>
    <el-table 
      v-if="order.list.length > 0" 
      :data="order.list" 
      v-loading="order.loading" 
      border 
      class="mt-4"
    >
      <el-table-column prop="xiadanshijian" label="时间" width="170" />
      <el-table-column prop="gaojijingliid" label="高级经理 ID" width="120" />
      <el-table-column prop="gaojijingliyonghuming" label="高级经理用户名" width="120" />
      <el-table-column prop="dingdanjine" label="成交额（元）" width="120" />
      <el-table-column prop="dingdanshouyi" label="收益额（元）" width="120" />
      <el-table-column prop="shangjiid" label="上级 ID" />
    </el-table>
    <el-empty v-if="!order.loading && order.list.length === 0" description=" " class="mt-6 text-gray-500">{{ $t(`message.noOrder`) }}</el-empty>
  </section>
</template>

<script>
import { reactive } from 'vue'
import api from '/src/api/index.js'

export default {
  setup() {
    const order = reactive({
      loading: true,
      list: []
    })
    api.get("/home/getOrdersRecent").then((res) => { 
      order.list = res.data.data
      order.loading = false
    })
    return {
      order
    }
  }
}
</script>