export const MOCK_MENU_DATA: any[] = [
  {
    id: 1,
    menuCode: 'konva',
    title: 'Konva',
    menuPath: '/konva',
    icon: 'MenuDesignManage',
    // componentUrl: '/konva/index.vue',
    children: [
      {
        id: 10,
        menuCode: 'table',
        title: '表格',
        menuPath: '/konva/',
        icon: 'DesignIcon',
        componentUrl: '/home/index.vue'
      },
      {
        id: 11,
        menuCode: 'animation',
        title: '动画',
        menuPath: '/konva/animation',
        icon: 'DesignIcon',
        componentUrl: '/konva/animation.vue'
      },
      {
        id: 12,
        menuCode: 'konva/star',
        title: '星星',
        menuPath: '/konva/star',
        icon: 'DesignIcon',
        componentUrl: '/konva/index.vue'
      },
      {
        id: 13,
        menuCode: 'konva/circle',
        title: '圆形',
        menuPath: '/konva/circle',
        icon: 'DesignIcon',
        componentUrl: '/konva/circle.vue'
      },
      {
        id: 14,
        menuCode: 'konva/cache',
        title: '星星',
        menuPath: '/konva/cache',
        icon: 'DesignIcon',
        componentUrl: '/konva/cache.vue'
      }
    ]
  },
  {
    id: 2,
    menuCode: 'chatgpt',
    title: 'ChatGPT',
    menuPath: '/chatgpt',
    icon: 'MenuDesignManage',
    flowType: 'soa',
    componentUrl: '/by-chat/index.vue',
    sortNum: 0,
    children: [
      {
        id: 20,
        menuCode: 'chatgpt/cursor',
        title: '表格',
        menuPath: '/chatgpt/cursor',
        icon: 'DesignIcon',
        componentUrl: '/by-chat/cursor.vue'
      }
    ]
  },
  {
    id: 3,
    menuCode: 'map',
    title: 'Map',
    menuPath: '/map',
    icon: 'MenuDesignManage',
    flowType: 'soa',
    componentUrl: '/by-chat/index.vue',
    sortNum: 0,
    children: [
      {
        id: 30,
        menuCode: 'map/antv-x6',
        title: 'Antv-x6',
        menuPath: '/map/antv-x6',
        icon: 'DesignIcon',
        componentUrl: '/map/antv-x6.vue'
      },
      {
        id: 31,
        menuCode: 'map/antv-x6-2',
        title: 'Antv-x6',
        menuPath: '/map/antv-x6-2',
        icon: 'DesignIcon',
        componentUrl: '/tree-link/x62.vue'
      },
      {
        id: 32,
        menuCode: 'map/hello',
        title: 'Hello',
        menuPath: '/map/hello',
        icon: 'DesignIcon',
        componentUrl: '/tree-link/hello.vue'
      },
      {
        id: 33,
        menuCode: 'map/relation',
        title: 'relation',
        menuPath: '/map/relation',
        icon: 'DesignIcon',
        componentUrl: '/tree-link/relationMap.vue'
      }
    ]
  },
  {
    id: 4,
    title: 'EyeDropper',
    menuPath: '/eye-dropper',
    name: 'eye-dropper',
    componentUrl: '/eyedropper/index.vue'
  },
  {
    id: 5,
    title: 'Viewer',
    menuPath: '/doc/view',
    name: 'doc_view',
    componentUrl: '/viewer/doc.vue'
  }
]
