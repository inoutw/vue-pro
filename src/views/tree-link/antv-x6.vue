<script lang="ts" setup>
import '@antv/x6-vue-shape'
import { Graph } from '@antv/x6'
import { onMounted } from 'vue'
import { ElTree } from 'element-plus'
import { data } from './data';

Graph.registerNode("my-tree", {
  inherit: "vue-shape",
  x: 200,
  y: 150,
  width: 150,
  height: 100,
  component: ElTree,
});

console.log('data',data)

onMounted(()=>{
  const graph = new Graph({
  container: document.getElementById('container'),
  grid: true,
})
// 文档：https://x6.antv.vision/zh/docs/tutorial/basic/port

graph.addNode({
  id: "1",
  shape: "my-tree",
  x: 400,
  y: 10,
  width: 150,
  height: 100,
  data: {
    data,
  },
});

const rect1 = graph.addNode({
  x: 440,
  y: 60,
  width: 200,
  height: 680,
  attrs: {
    body: {
      fill: '#f5f5f5',
      stroke: '#d9d9d9',
      strokeWidth: 1,
    },
  },
  ports: {
    groups: {
      group1: {
        position: 'right',
        attrs: {
          circle: {
            r: 16,
            magnet: true,
            stroke: '#31d0c6',
            fill: '#fff',
            strokeWidth: 2,
          },
        },
      },
    },
    items: [
      {
        id: 'port1',
        group: 'group1',
        attrs: {
          text: {
            // 标签选择器
            text: 'port1', // 标签文本
          },
        },
      },
      {
        id: 'port2',
        group: 'group1',
        attrs: {
          text: {
            // 标签选择器
            text: 'port2', // 标签文本
          },
        },
      },
    ],
  },
})
const rect2 = graph.addNode({
  x: 840,
  y: 60,
  width: 200,
  height: 680,
  attrs: {
    body: {
      fill: '#f5f5f5',
      stroke: '#d9d9d9',
      strokeWidth: 1,
    },
  },
  ports: {
    groups: {
      group1: {
        attrs: {
          circle: {
            r: 16,
            magnet: true,
            stroke: '#31d0c6',
            fill: '#fff',
            strokeWidth: 2,
          },
        },
      },
    },
    items: [
      {
        id: 'port1',
        group: 'group1',
        attrs: {
          text: {
            // 标签选择器
            text: 'port1', // 标签文本
          },
        },
      },
      {
        id: 'port2',
        group: 'group1',
        attrs: {
          text: {
            // 标签选择器
            text: 'port2', // 标签文本
          },
        },
      },
    ],
  },
})

rect2.addPort({
  id: 'port3',
  group: 'group1',
  attrs: {
    text: {
      // 标签选择器
      text: 'port3', // 标签文本
    },
  },
})
})



</script>
<template><div id="container"></div></template>
<style>
#container{
width: 1600px;
height: 1600px;
}
</style>