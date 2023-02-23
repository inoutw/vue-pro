import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: '首页',
        component: ()=>import('../views/home/index.vue')
    },
    {
        path: '/konva',
        name: '画布',
        component: ()=>import('../views/konva/index.vue')
    },
    {
        path: '/circle',
        name: '圆形',
        component: ()=>import('../views/konva/circle.vue')
    },
    {
        path: '/animation',
        name: '动画',
        component: ()=>import('../views/konva/animation.vue')
    },
    {
        path: '/cache',
        name: '缓存',
        component: ()=>import('../views/konva/cache.vue')
    },
    {
        path: '/by-chat',
        name: '缓存',
        component: ()=>import('../views/by-chat/index.vue')
    },

]
const routers = createRouter({
    history: createWebHistory('/'),
    routes
})
export default routers