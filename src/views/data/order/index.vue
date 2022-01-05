<template>
  <div class="w-full h-full bg-white rounded-lg py-5 px-6 shadow backdrop-blur-sm">
    <!-- top -->
    <div class="flex items-center">
      <!-- 选择日期区间 -->
      <el-date-picker
        v-model="params.date"
        type="daterange"
        range-separator="—"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <!-- 选择区域 -->
      <el-select v-model="params.area" placeholder="选择区域" size="large" class="ml-5">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 搜索 -->
      <el-input
        v-model="params.search"
        class="w-64 ml-auto"
        placeholder="搜索"
        :suffix-icon="Search"
      />
    </div>
    <!-- table -->
    <div v-if="orderList.length > 0" class="mt-4">
      <el-table :data="orderList" border style="width: 100%">
        <el-table-column prop="date" label="下单时间" width="185" />
        <el-table-column prop="newbId" label="高级经理ID" width="180" />
        <el-table-column prop="name" label="高级经理用户名" width="185" />
        <el-table-column prop="phone" label="联系方式" width="190" />
        <el-table-column prop="cnewbId" label="上级ID" width="180" />
        <el-table-column prop="subOrderNum" label="子订单数量" width="160" />
        <el-table-column prop="orderPrice" label="订单金额(元)" width="190" />
        <el-table-column prop="orderIncome" label="订单收益(元)" width="190" />
        <el-table-column label="操作">
          <template #default="scope">
            <p class="text-red-700 underline cursor-pointer" @click="handleEdit(scope.$index, scope.row)">查看信息</p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-empty v-else description="暂无数据" :image-size="200" class="mt-40" />
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Search } from '@element-plus/icons-vue'
export default {
  setup() {
    const router = useRouter()
    const params = reactive({
      date: '',
      area: '',
      search: ''
    })
    const options = ref([
      { value: '环翠区', label: '环翠区' },
      { value: '经区', label: '经区' },
      { value: '高区', label: '高区' }
    ])
    const orderList = [
      { date: '2016-05-03', newbId: '1233113', name: 'Tom', phone: '110', cnewbId: '222', subOrderNum: '2456', orderPrice: '6787', orderIncome: '167843', do: '查看信息' },
      { date: '2016-05-03', newbId: '1233113', name: 'Tom', phone: '110', cnewbId: '222', subOrderNum: '2456', orderPrice: '6787', orderIncome: '167843', do: '查看信息' },
      { date: '2016-05-03', newbId: '1233113', name: 'Tom', phone: '110', cnewbId: '222', subOrderNum: '2456', orderPrice: '6787', orderIncome: '167843', do: '查看信息' },
      { date: '2016-05-03', newbId: '1233113', name: 'Tom', phone: '110', cnewbId: '222', subOrderNum: '2456', orderPrice: '6787', orderIncome: '167843', do: '查看信息' },
      { date: '2016-05-03', newbId: '1233113', name: 'Tom', phone: '110', cnewbId: '222', subOrderNum: '2456', orderPrice: '6787', orderIncome: '167843', do: '查看信息' },
      { date: '2016-05-03', newbId: '1233113', name: 'Tom', phone: '110', cnewbId: '222', subOrderNum: '2456', orderPrice: '6787', orderIncome: '167843', do: '查看信息' }
    ]
    return {
      Search,
      params,
      options,
      orderList,
      handleEdit(index, data) {
        console.log(index, data)
        router.push('/data/order/detail/3')
      }
    }
  }
}
</script>

<style>

</style>