<template>
  <div class="bg-white rounded-lg pt-2 pb-5 px-6 shadow">
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="大客户提现" name="/home/getTiXiansPage" />
      <el-tab-pane label="高级经理提现" name="/home/getTiXiansPage_NewB" />
    </el-tabs>

    <!-- filter -->
    <div class="pt-1 pb-3 px-4 flex items-center flex-wrap text-sm bg-gray-50 shadow rounded-md">
      <!-- 账户ID -->
      <div class="flex items-center mr-4 mb-2">
        <p class="flex-shrink-0">账户ID：</p>
        <el-input v-model="params.userId" size="small" clearable class="w-32" type="number" />
      </div>
      <!-- 用户名 -->
      <div class="flex items-center mr-4 mb-2">
        <p class="flex-shrink-0">用户名：</p>
        <el-input v-model="params.userName" size="small" clearable class="w-32" />
      </div>
      <!-- 所属公司 -->
      <div class="flex items-center mr-4 mb-2">
        <p class="flex-shrink-0">所属公司：</p>
        <el-input v-model="params.company" size="small" clearable class="w-40" />
      </div>
      <!-- 审批人 -->
      <div class="flex items-center mr-4 mb-2">
        <p class="flex-shrink-0">审批人：</p>
        <el-input v-model="params.shenpiren" size="small" clearable class="w-40" />
      </div>
      <!-- 状态 -->
      <div class="flex items-center mr-4 mb-2">
        <p class="flex-shrink-0">状态：</p>
        <el-select v-model="params.state" class="m-2" placeholder="请选择" size="small" clearable>
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <!-- 开户行
      <div class="flex items-center mr-4 mb-2">
        <p class="flex-shrink-0">开户行：</p>
        <el-input v-model="params.banks" size="small" clearable class="w-40" />
      </div>
      -->
      <!-- 账户/卡号
      <div class="flex items-center mr-4 mb-2">
        <p class="flex-shrink-0">账户/卡号：</p>
        <el-input v-model="params.accountNum" size="small" type="number" clearable class="w-60" />
      </div>
      -->
      <!-- 导出excel -->
      <button
        class="mb-2 w-24 h-8 bg-teal-600 text-sm text-white rounded hover:bg-teal-500 tracking-wider active:hover:bg-teal-600" 
        @click="exportTable"
      >
        导出excel
      </button>
     
      <!-- 日期 -->
      <div class="flex items-center mr-4">
        <p class="flex-shrink-0">起止日期：</p>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="—"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="small"
          class="mr-4"
          @change="changeDate"
        />
      </div>
      <!-- 展示数量 -->
      <div class="flex items-center">
        <p class="flex-shrink-0">展示数量：</p>
        <el-input v-model="size" type="number" size="small" class="w-28" />
      </div>
    </div>

    <base-pagination
      ref="paginationRef"
      :params="params"
      :size="+size"
      :url="url"
      class="mt-4"
    >
      <template #default="slotProps">
        <div class="w-full overflow-x-scroll">
          <table id="table-data" class="table-auto min-w-max">
            <thead class="text-left font-bold border-b text-sm text-gray-500 leading-6">
              <tr class="flex items-center leading-6 py-3">
                <th class="w-32">账户ID</th>
                <th class="w-40">用户名</th>
                <th class="w-40">身份类别</th>
                <th class="w-40">所属公司</th>
                <th class="w-40">开户行</th>
                <th class="w-40">账户/卡号</th>
                <th class="w-40">订单号</th>
                <th class="w-40">订单日期</th>
                <th class="w-40">提现金额（HK$）</th>
                <th class="w-40">汇率</th>
                <th class="w-40">提现金额（￥）</th>
                <th class="w-40">手续费（￥）</th>
                <th class="w-60">代扣代缴个税（￥）</th>
                <th class="w-40">付款金额（￥）</th>
                <th class="w-40">提现日期</th>
                <th class="w-40">提现状态</th>
                <th class="w-40">操作人</th>
                <th class="w-40">操作时间</th>
                <th class="w-60">备注</th>
              </tr>
            </thead>
            <tbody class="text-left text-sm text-gray-500">
              <tr
                v-for="(item, index) in slotProps.list"
                :key="index"
                class="flex items-center border-b last:border-none even:bg-gray-50 py-2 leading-9"
              >
                <!-- 账户ID -->
                <td class="w-32">{{ item.userId }}</td>
                <!-- 用户名 -->
                <td class="w-40">{{ item.userName }}</td>
                <!-- 身份类别 -->
                <td class="w-40">{{ item.userType }}</td>
                <!-- 所属公司 -->
                <td class="w-40">{{ item.company }}</td>
                <!-- 开户行 -->
                <td class="w-40">{{ item.banks }}</td>
                <!-- 账户/卡号 -->
                <td class="w-40">{{ item.accountNum }}</td>
                <!-- 订单号 -->
                <td class="w-40">
                  <p v-for="(i, idx) in item.incomeFromList" :key="idx">
                    {{ i.orderNum }} <span v-if="idx !== item.incomeFromList.length - 1">/ </span>
                  </p>
                </td>
                <!-- 订单日期 -->
                <td class="w-40">
                  <p v-for="(i, idx) in item.incomeFromList" :key="idx">
                    {{ i.orderTime }}<span v-if="idx !== item.incomeFromList.length - 1">/ </span>
                  </p>
                </td>
                <!-- 提现金额（HK$） -->
                <td class="w-40">{{ item.cashOutHK }}</td>
                <!-- 汇率-->
                <td class="w-40">{{ item.exchangeRates }}</td>
                <!-- 提现金额（￥） -->
                <td class="w-40">{{ item.cashOutRMB }}</td>
                <!-- 手续费（￥） -->
                <td class="w-40">{{ item.charge }}</td>
                <!-- 代扣代缴个税（￥） -->
                <td class="w-60">{{ item.tax }}</td>
                <!-- 付款金额（￥） -->
                <td class="w-40">{{ item.pay }}</td>
                <!-- 提现日期 -->
                <div class="w-40">{{ item.insertTime }}</div>
                <!-- 提现状态 -->
                <td class="w-40">
                  <p v-for="(i, idx) in item.approvals" :key="idx">
                    {{ i.des }} <span v-if="idx !== item.approvals.length - 1">/ </span>
                  </p>
                </td>
                <!-- 操作人 -->
                <td class="w-40">
                  <p v-for="(i, idx) in item.approvals" :key="idx">
                    {{ i.approver }} <span v-if="idx !== item.approvals.length - 1">/ </span>
                  </p>
                </td>
                <!-- 操作时间 -->
                <td class="w-40">
                  <p v-for="(i, idx) in item.approvals" :key="idx">
                    {{ i.updateTime }} <span v-if="idx !== item.approvals.length - 1">/ </span>
                  </p>
                </td>
                <!-- 备注 -->
                <div class="w-60">{{ item.content }}</div>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </base-pagination>
  </div>
</template>

<script>
import { ref } from 'vue'
import fileSaver from 'file-saver'
import dayjs from 'dayjs'
import xlsx from 'xlsx'
export default {
  setup() {
    const activeName = ref('/home/getTiXiansPage')
    const url = ref('/home/getTiXiansPage')
    const size = ref(7)
    const params = ref({
      userid: '',
      startTime: '',
      endTime: '',
      userName: '',
      company: '',
      time: '',
      realname: '',
      shenpiren: '',
      state: ''
    })
    const stateOptions = [
      { value: 1, label: '待审核' },
      { value: 11, label: '已审核待提现' },
      { value: 12, label: '审核失败' },
      { value: 2, label: '已审核已提现' },
      { value: 21, label: '已审核提现失败' },
    ]
    return {
      activeName,
      url,
      size,
      params,
      stateOptions,
      changeTab() {
        url.value = activeName.value
      },
      // 切换日期
      changeDate(d) {
        if(d) {
          params.value.startTime = dayjs(d[0]).format('YYYY-MM-DD')
          params.value.endTime = dayjs(d[1]).format('YYYY-MM-DD')
        } else {
          params.value.startTime = params.value.endTime = ''
        }
      },
      exportTable() {
        let box = xlsx.utils.table_to_book(document.querySelector('#table-data'), { raw: true })
        let out = xlsx.write(box, {bookType: 'xlsx', bookSST: true, type: 'array'})
        try {fileSaver.saveAs(new Blob([out], {type: 'application/octet-stream'}),'sheet.xlsx')}
        catch (error) { console.log(error) }
        return out
      },
    }
  }
}
</script>