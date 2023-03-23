import { MOCK_MENU_DATA } from './data'
const modules = import.meta.glob('../views/**/**.vue')

const format = (str: string) => {
  return str.replace(/^\//, '')
}

const formatRoute: any = (routeList: any[]) => {
  if (!routeList?.length) return routeList
  return routeList.map((v: any) => {
    if (v.children) {
      return {
        path: v.menuPath,
        name: format(v.menuPath),
        redirect: v.children[0].menuPath,
        meta: {
          title: v.title,
          icon: v.icon,
          hidden: v.showPage === false
        },
        children: formatRoute(v.children)
      }
    } else {
      return {
        path: v.menuPath,
        name: format(v.menuPath),
        component: modules[/* @vite-ignore */ `../views${v.componentUrl}`],
        meta: {
          icon: v.icon,
          title: v.title,
          hidden: v.showPage === false
        }
      }
    }
  })
}

export const getMenu = () => {
  return new Promise((resolve) => {
    const menuData = formatRoute(MOCK_MENU_DATA)
    resolve(menuData)
  })
}
