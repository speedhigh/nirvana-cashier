<template>
  <div class="w-full h-full bg-white rounded-lg py-5 px-6 shadow">
    <!-- content -->
    <base-pagination
      :params="params"
      :size="12"
      url="/home/getOrdersPage"
      class="mt-5"
    >
      <template #default="slotProps">
        <el-table id="table-data" :data="slotProps.list" border stripe style="width: 100%">
          <el-table-column prop="xiadanshijian" label="下单时间" min-width="185" />
          <el-table-column prop="gaojijingliid" label="高级经理ID" min-width="180" />
          <el-table-column prop="gaojijingliyonghuming" label="高级经理用户名" min-width="185" />
          <el-table-column prop="gaojijinglilianxifangshi" label="联系方式" min-width="190" />
          <el-table-column prop="shangjiid" label="上级ID" min-width="180" />
          <el-table-column prop="" label="子订单数量" min-width="160" />
          <el-table-column prop="dingdanjine" label="订单金额(元)" min-width="190" />
          <el-table-column prop="dingdanshouyi" label="订单收益(元)" min-width="190" />
          <el-table-column label="操作">
            <template #default="scope">
              <p class="text-red-700 underline cursor-pointer" @click="handleEdit(scope.$index, scope.row)">查看信息</p>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </base-pagination>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
// import { Search } from '@element-plus/icons-vue'
export default {
  setup() {
    const router = useRouter()
    const params = reactive({
      // date: [],
      // name: '',
      // drug: '',
      // withdraw: ''
    })
    return {
     // Search,
      params,
      // 查看信息
      handleEdit(index, data) { router.push('/data/order/detail/' + data.orderid) },
    }
  }
}
</script>