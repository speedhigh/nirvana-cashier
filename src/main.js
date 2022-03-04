import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
import './index.css'
import 'default-passive-events'
import App from './App.vue'
import router from './router'
import VueI18n from './language/i18n.js'

const app = createApp(App)

// 设置全局组件
import BaseChart from './components/BaseChart.vue'
import BasePagination from './components/BasePagination.vue'

app.component('BaseChart', BaseChart)
app.component('BasePagination', BasePagination)

app.directive('resize', {
  // 当被绑定的元素挂载到 DOM 中时……
  mounted(el, binding) {
   function debounce(fn, delay = 16) {
     let t = null
     return function () {
       if (t) clearTimeout(t)
       const context = this
       const args = arguments
       t = setTimeout(function () {
         fn.apply(context, args)
       }, delay)
     }
   }
   el._resizer = new window.ResizeObserver(debounce(binding.value, Number(binding.arg) || 16))
   el._resizer.observe(el)
  },
  unmounted(el) {
    el._resizer.disconnect()
  }
})

// app.use(ElementPlus, { locale: window.localStorage.getItem('language') ? window.localStorage.getItem('language') === 'zh' ? zhCn : '' : zhCn })
app.use(ElementPlus)
app.use(VueI18n)
app.use(router)
app.mount('#app')
