<template>
  <div class="w-full h-full bg-white rounded-lg py-5 px-6 shadow">
    <!-- top
    <div class="flex items-center">
      <el-select placeholder="选择区域" size="large">
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
      url="/home/getNewBigsPage"
      class="mt-5"
    >
      <template #default="slotProps">
        <el-table :data="slotProps.list" border stripe style="width: 100%">
          <el-table-column prop="id" label="大客户ID" min-width="160" />
          <el-table-column prop="yonghuming" label="大客户用户名" min-width="190" />
          <el-table-column prop="lianxifangshi" label="联系方式" min-width="190" />
          <el-table-column prop="zhuceriqi" label="注册日期" min-width="280" />
          <el-table-column prop="xiajishuliang" label="下级数量" min-width="120" />
          <el-table-column prop="leijidingdanshuliang" label="累计订单数量" min-width="190" />
          <el-table-column prop="leijidingdanjine" label="累计订单金额(元)" min-width="190" />
          <el-table-column prop="leijidingdanshouyi" label="累计订单收益(元)" min-width="190" />
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
        router.push('/customer/cnewb/detail/' + data.id)
      }
    }
  }
}
</script>