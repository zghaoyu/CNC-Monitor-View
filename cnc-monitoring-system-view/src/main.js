import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import axios from 'axios'
import less from 'less'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './assets/base.css'


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
// 全局使用
app.config.globalProperties.$axios=axios
app.use(less)
app.use(router)
app.mount('#app')
