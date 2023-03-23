<script setup>
import { onMounted } from 'vue'
import { Graph, Markup } from '@antv/x6'
import '@antv/x6-vue-shape'
import { ElTree } from 'element-plus'
import { data, dataRight } from './data'

onMounted(() => {
  const graph = new Graph({
    container: document.getElementById('container'),
    grid: true
  })
  const node = graph.addNode({
    shape: 'vue-shape',
    x: 32,
    y: 48,
    portMarkup: [Markup.getForeignObjectMarkup()],
    ports: {
      items: [
        { group: 'in', id: 'in1' },
        { group: 'in', id: 'in2' },
        { group: 'out', id: 'out1' },
        { group: 'out', id: 'out2' }
      ],
      groups: {
        in: {
          position: { name: 'right' },
          attrs: {
            circle: {
              x: 6,
              y: 6,
              magnet: 'true',
              stroke: '#8f8f8f',
              r: 5
            }
          },
          zIndex: 1
        },
        out: {
          position: { name: 'right' },
          attrs: {
            fo: {
              width: 30,
              height: 30,
              x: -6,
              y: -6,
              magnet: true,
              stroke: '#8f8f8f',
              r: 5
            }
          },
          zIndex: 1
        }
      }
    },
    component: {
      template: `<el-tree :data="data" default-expand-all/>`,
      data() {
        return {
          name: 'x6',
          data: data
        }
      },
      components: {
        ElTree
      }
    }
  })

  graph.addNode({
    shape: 'vue-shape',
    x: 832,
    y: 48,
    component: {
      template: `<el-tree :data="data" default-expand-all/>`,
      data() {
        return {
          name: 'x6-r',
          data: dataRight
        }
      },
      components: {
        ElTree
      }
    }
  })
})
</script>
<template><div id="container"></div></template>
<style lang="less">
#container {
  width: 1200px;
  height: 1200px;
  .el-tree-node__content {
    height: 40px;
  }
}
</style>
