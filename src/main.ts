import { createApp } from 'vue'
import VueKonva from 'vue-konva'
import './style.css'
import App from './App.vue'
import routers from './routers'

createApp(App).use(routers).use(VueKonva).mount('#app')
