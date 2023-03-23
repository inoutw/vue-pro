import { defineStore } from 'pinia'
export const useMenuTree = defineStore('MENU_TREE', {
  state: () => {
    return {
      menuTree: []
    }
  },
  actions: {
    setMenuTree(tree: any) {
      this.menuTree = tree
    }
  },
  getters: {
    getMenuTree(): any[] {
      return this.menuTree
    }
  }
})
