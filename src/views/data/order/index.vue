<template>
  <div class="w-full h-full bg-white rounded-lg py-5 px-6 shadow backdrop-blur-sm">
    <!-- top
    <div class="flex items-center">
      <el-date-picker
        type="daterange"
        range-separator="—"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <el-select placeholder="选择区域" size="large" class="ml-5">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        class="w-64 ml-auto"
        placeholder="搜索"
        :suffix-icon="Search"
      />
    </div>
    -->
    <!-- content -->
    <base-pagination
      :params="params"
      :size="12"
      url="/home/getOrdersPage"
      class="mt-5"
    >
      <template #default="slotProps">
        <el-table :data="slotProps.list" border style="width: 100%">
          <el-table-column prop="xiadanshijian" label="下单时间" width="185" />
          <el-table-column prop="gaojijingliid" label="高级经理ID" width="180" />
          <el-table-column prop="gaojijingliyonghuming" label="高级经理用户名" width="185" />
          <el-table-column prop="gaojijinglilianxifangshi" label="联系方式" width="190" />
          <el-table-column prop="shangjiid" label="上级ID" width="180" />
          <el-table-column prop="" label="子订单数量" width="160" />
          <el-table-column prop="dingdanjine" label="订单金额(元)" width="190" />
          <el-table-column prop="dingdanshouyi" label="订单收益(元)" width="190" />
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
export default {
  setup() {
    const router = useRouter()
    const params = reactive({})
    const options = ref([
      { value: '环翠区', label: '环翠区' },
      { value: '经区', label: '经区' },
      { value: '高区', label: '高区' }
    ])
    return {
      Search,
      params,
      options,
      handleEdit(index, data) {
        router.push('/data/order/detail/' + data.orderid)
      }
    }
  }
}
</script>