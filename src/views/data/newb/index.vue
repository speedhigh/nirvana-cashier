<template>
  <div class="w-full h-full bg-white rounded-lg py-5 px-6 shadow backdrop-blur-sm">
    <!-- top -->
    <div class="flex items-center">
      <!-- 选择区域 -->
      <el-select v-model="params.area" placeholder="选择区域" size="large">
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
        <el-table-column prop="newbId" label="高级经理ID" width="160" />
        <el-table-column prop="name" label="高级经理用户名" width="190" />
        <el-table-column prop="phone" label="联系方式" width="190" />
        <el-table-column prop="date" label="注册日期" width="280" />
        <el-table-column prop="newbNum" label="上级ID" width="120" />
        <el-table-column prop="orderNum" label="累计订单数量" width="190" />
        <el-table-column prop="orderPrice" label="累计订单金额(元)" width="190" />
        <el-table-column prop="orderIncome" label="累计订单收益(元)" width="190" />
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
      { newbId: '1233113', name: 'Tom', phone: '110', date:'2021-09-08 至 2022-12-31' ,newbNum: '222', orderNum: '2456', orderPrice: '6787', orderIncome: '167843' },
      { newbId: '1233113', name: 'Tom', phone: '110', date:'2021-09-08 至 2022-12-31' ,newbNum: '222', orderNum: '2456', orderPrice: '6787', orderIncome: '167843' },
      { newbId: '1233113', name: 'Tom', phone: '110', date:'2021-09-08 至 2022-12-31' ,newbNum: '222', orderNum: '2456', orderPrice: '6787', orderIncome: '167843' },
      { newbId: '1233113', name: 'Tom', phone: '110', date:'2021-09-08 至 2022-12-31' ,newbNum: '222', orderNum: '2456', orderPrice: '6787', orderIncome: '167843' },
      { newbId: '1233113', name: 'Tom', phone: '110', date:'2021-09-08 至 2022-12-31' ,newbNum: '222', orderNum: '2456', orderPrice: '6787', orderIncome: '167843' },
      { newbId: '1233113', name: 'Tom', phone: '110', date:'2021-09-08 至 2022-12-31' ,newbNum: '222', orderNum: '2456', orderPrice: '6787', orderIncome: '167843' }
    ]
    return {
      Search,
      params,
      options,
      orderList,
      handleEdit(index, data) {
        console.log(index, data)
        router.push('/data/newb/detail/3')
      }
    }
  }
}
</script>