<template>
  <div class="w-full h-full bg-white rounded-lg py-5 px-6 shadow backdrop-blur-sm">
    <!-- top -->
    <div class="flex items-center">
      <!-- 选择区域 -->
      <el-select placeholder="选择区域" size="large">
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
        class="w-64 ml-auto"
        placeholder="搜索"
        :suffix-icon="Search"
      />
    </div>

    <!-- table -->
    <base-pagination
      :params="params"
      :size="10"
      url="/home/getGaoJiJingLisPage"
      class="mt-5"
    >
      <template #default="slotProps">
        <el-table :data="slotProps.list" border style="width: 100%">
          <el-table-column prop="id" label="高级经理ID" width="160" />
          <el-table-column prop="yonghuming" label="高级经理用户名" width="190" />
          <el-table-column prop="lianxifangshi" label="联系方式" width="190" />
          <el-table-column prop="zhuceriqi" label="注册日期" width="280" />
          <el-table-column prop="shangjiid" label="上级ID" width="120" />
          <el-table-column prop="leijidingdanshuliang" label="累计订单数量" width="190" />
          <el-table-column prop="leijidingdanjine" label="累计订单金额(元)" width="190" />
          <el-table-column prop="leijidingdanshouyi" label="累计订单收益(元)" width="190" />
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
        router.push('/data/newb/detail/' + data.id)
      }
    }
  }
}
</script>