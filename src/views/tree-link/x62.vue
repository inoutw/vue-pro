<template>
    <div class="app-content">
      <div id="container"></div>
      <!-- <TeleportContainer /> -->
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent } from "vue";
    import ProgressNode from "./components/ProgressNode.vue";
    import { Graph, Registry } from "@antv/x6";
    import {  getTeleport } from "@antv/x6-vue-shape";
  
    Graph.registerVueComponent({
      shape: "my-node",
      width: 100,
      height: 100,
      component: ProgressNode,
    });
    // const TeleportContainer = getTeleport();
  
    export default defineComponent({
      name: "App",
      components: {
        ProgressNode,
      },
      mounted() {
        const graph = new Graph({
          container: document.getElementById("container")!,
          background: {
            color: "#F2F7FA",
          },
          autoResize: true,
        });
  
        const node = graph.addNode({
          shape: "my-node",
          x: 100,
          y: 60,
        });

        setInterval(() => {
            const { progress } = node.getData();
            node.setData({
                progress: (progress + 10) % 100,
            });
}, 2000);
      },
    });






  </script>
  