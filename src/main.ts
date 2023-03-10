import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import VueKonva from 'vue-konva'
import './style.css'
import App from './App.vue'
import routers from './routers'
import "@antv/x6-vue-shape";
import 'element-plus/dist/index.css'

createApp(App).use(ElementPlus).use(routers).use(VueKonva).mount('#app')
