import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { getMenu } from '../layout/helper'
import { useMenuTree } from '../store/menu-store'
import { createPinia } from 'pinia'
const routes: Array<RouteRecordRaw> = [{
    path: '/el-tree',
    name: 'el-tree',
    component: ()=>import('../views/el-tree/index.vue')
},]

const routers = createRouter({
  history: createWebHistory('/'),
  routes
})
const store = createPinia()
const storeMenuTree: any = useMenuTree(store)
routers.beforeEach(async (to, from, next) => {
  let remoteMenus: any = await getMenu()
  remoteMenus?.forEach((route: any) => {
    routers.addRoute(route)
  })
  const list: any[] = routes.concat(remoteMenus)
  // console.log('list', list)
  // const list: any[] = remoteMenus
  storeMenuTree.setMenuTree(list)

  if (to.path === '/') {
    next()
    return
  }

  if (storeMenuTree.menuTree.length) {
    next()
    return
  }
  next({ ...to, replace: true })
  return
})
export default routers
export { store }
