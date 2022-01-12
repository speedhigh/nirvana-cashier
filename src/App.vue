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
  --el-color-primary-light-1: #b91c1c;
  --el-color-primary-light-2: #b91c1c;
  --el-color-primary-light-9: rgba(248, 206, 201, 0.4)
}
</style>
