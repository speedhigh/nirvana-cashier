import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './index.css'
import App from './App.vue'
import router from './router'

import * as echarts from 'echarts';
import 'echarts-gl';

const app = createApp(App)

app.use(ElementPlus)
app.use(router)
app.mount('#app')