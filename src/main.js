import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.css'
import App from './App.vue'
import router from './router'
// import * as echarts from 'echarts';

const app = createApp(App)

app.directive('resize', {
  // 当被绑定的元素挂载到 DOM 中时……
  mounted(el, binding) {
   function debounce(fn, delay = 16) {
     let t = null
     return function () {
       if (t) {
         clearTimeout(t)
       }
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

app.use(ElementPlus)
app.use(router)
app.mount('#app')
