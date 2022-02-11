<template>
  <div class="text-base leading-none text-gray-900">
    <router-view></router-view>
  </div>
</template>


<style>
input, button, select, textarea {
  outline: none !important
}
textarea { 
  resize: none !important
}
.el-table .warning-row {
  background: oldlace;
}
:root {
  --el-color-primary: #b91c1c;
  --el-color-primary-light-1: #DF2626;
  --el-color-primary-light-2: #E34545;
  --el-color-primary-light-3: #E86464;
  --el-color-primary-light-4: #EC8383;
  --el-color-primary-light-5: #EF9A9A;
  --el-color-primary-light-6: #F3B4B4;
  --el-color-primary-light-7: #F6CBCB;
  --el-color-primary-light-8: #F9D7D7;
  --el-color-primary-light-9: #FDEDED
}
</style>
