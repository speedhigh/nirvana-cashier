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
        <el-table-column prop="name" label="药品名" width="370" />
        <el-table-column label="主题图" width="100" align="center">
          <template #default="scope">
            <div class="w-8 h-8 mx-auto cursor-pointer">
              <el-image :src="scope.row.src" alt="缩略图" class="w-full h-full" :preview-src-list="[scope.row.src]" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="country" label="国家" width="100" align="center" />
        <el-table-column prop="code" label="条形码" width="220" />
        <el-table-column prop="skuCode" label="SKU码" width="220" />
        <el-table-column prop="price" label="单价（元）" width="150" />
        <el-table-column prop="num" label="数量" width="120"/>
        <el-table-column prop="total" label="总价（元）" width="180"/>
        <el-table-column prop="ccc" label="收益（元）" />
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
      { name: '武田制药 感冒药 100锭', src: 'https://cdn.pixabay.com/photo/2021/11/09/15/32/christmas-6781762__340.jpg' ,country: '日本', code: '1223223', skuCode: '110', price: '222', num: '2456', total: '6787', ccc: '167843' },
      { name: '武田制药 感冒药 100锭', src: 'https://cdn.pixabay.com/photo/2021/11/09/15/32/christmas-6781762__340.jpg' ,country: '日本', code: '1223223', skuCode: '110', price: '222', num: '2456', total: '6787', ccc: '167843' },
      { name: '武田制药 感冒药 100锭', src: 'https://cdn.pixabay.com/photo/2021/11/09/15/32/christmas-6781762__340.jpg' ,country: '日本', code: '1223223', skuCode: '110', price: '222', num: '2456', total: '6787', ccc: '167843' },
      { name: '武田制药 感冒药 100锭', src: 'https://cdn.pixabay.com/photo/2021/11/09/15/32/christmas-6781762__340.jpg' ,country: '日本', code: '1223223', skuCode: '110', price: '222', num: '2456', total: '6787', ccc: '167843' },
      { name: '武田制药 感冒药 100锭', src: 'https://cdn.pixabay.com/photo/2021/11/09/15/32/christmas-6781762__340.jpg' ,country: '日本', code: '1223223', skuCode: '110', price: '222', num: '2456', total: '6787', ccc: '167843' },
      { name: '武田制药 感冒药 100锭', src: 'https://cdn.pixabay.com/photo/2021/11/09/15/32/christmas-6781762__340.jpg' ,country: '日本', code: '1223223', skuCode: '110', price: '222', num: '2456', total: '6787', ccc: '167843' },
      { name: '武田制药 感冒药 100锭', src: 'https://cdn.pixabay.com/photo/2021/11/09/15/32/christmas-6781762__340.jpg' ,country: '日本', code: '1223223', skuCode: '110', price: '222', num: '2456', total: '6787', ccc: '167843' },
      { name: '武田制药 感冒药 100锭', src: 'https://cdn.pixabay.com/photo/2021/11/09/15/32/christmas-6781762__340.jpg' ,country: '日本', code: '1223223', skuCode: '110', price: '222', num: '2456', total: '6787', ccc: '167843' },
      { name: '武田制药 感冒药 100锭', src: 'https://cdn.pixabay.com/photo/2021/11/09/15/32/christmas-6781762__340.jpg' ,country: '日本', code: '1223223', skuCode: '110', price: '222', num: '2456', total: '6787', ccc: '167843' }
    ]
    return {
      params,
      options,
      orderList
    }
  }
}
</script>

<style>

</style>