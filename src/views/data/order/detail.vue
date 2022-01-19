<template>
  <div 
    class="w-full h-full bg-white rounded-lg py-5 px-6 shadow backdrop-blur-sm"
    v-loading="showLoading"
  >
    <!-- top 
    <div class="flex items-center">
      <el-date-picker
        v-model="params.date"
        type="daterange"
        range-separator="—"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
      <el-select v-model="params.area" placeholder="选择区域" size="large" class="ml-5">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-input
        v-model="params.search"
        class="w-64 ml-auto"
        placeholder="搜索"
        :suffix-icon="Search"
      />
    </div>
    -->
    <!-- table -->
    <div v-if="orderList.length > 0" class="mt-4">
      <el-table :data="orderList" border stripe style="width: 100%">
        <el-table-column prop="yaopinming" label="药品名" min-width="370" />
        <el-table-column label="主题图" min-width="100" align="center">
          <template #default="scope">
            <div class="w-8 h-8 mx-auto cursor-pointer">
              <el-image :src="scope.row.zhutitu" alt="缩略图" class="w-full h-full" :preview-src-list="[scope.row.zhutitu]" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="guojia" label="国家" min-width="100" align="center" />
        <el-table-column prop="tiaoxingma" label="条形码" min-width="220" />
        <el-table-column prop="sku" label="SKU码" min-width="220" />
        <el-table-column prop="danjia" label="单价（元）" min-width="150" />
        <el-table-column prop="shuliang" label="数量" min-width="120"/>
        <el-table-column prop="zongjia" label="总价（元）" min-width="180"/>
        <el-table-column prop="shouyi" label="收益（元）" />
      </el-table>
    </div>
    <el-empty v-show="!showLoading && orderList.length === 0" description=" " :image-size="200" class="text-gray-500 mt-40">暂无数据</el-empty>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import api from '/src/api/index.js'
import { Search } from '@element-plus/icons-vue'
export default {
  setup() {
    const route = useRoute()
    const showLoading = ref(true)
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
    const orderList = ref([])

    api.get('/home/getOrderById', { id: route.params.id }).then((res) => {
      orderList.value = res.data.data
      showLoading.value = false
    })

    // 获取数据
    
    return {
      Search,
      showLoading,
      params,
      options,
      orderList
    }
  }
}
</script>