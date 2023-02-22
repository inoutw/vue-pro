<script lang="ts" setup>
import { onMounted, reactive } from 'vue';

const width = window.innerWidth;
const height = window.innerHeight;
const props = defineProps({
    rows: {
        type: Number,
        default: 3,
    },
    cols: {
        type: Number,
        default: 3
    },
    cellHeight: {
        type: Number,
        default: 30,
    },
    cellWidth: {
        type: Number,
        default: 160,
    },
})
const state = reactive<any>({
  xList: [],
  yList: [],
})
const configGroup = {
  width: width,
  height: height
}
onMounted(()=>{
    const rowCount = props.rows
    const colCount = props.cols
    const rowX2 = colCount * props.cellWidth
    const colX2 = rowCount * props.cellHeight
  for (let n = 0; n < rowCount+1; n++) {
    state.xList.push({
        id: Math.round(Math.random() * rowCount).toString(),
        x: 0,
        y: props.cellHeight*(n),
        points: [0, 0, rowX2, 0]
    });
  }
  for (let n = 0; n < colCount+1; n++) {
    state.yList.push({
        id: Math.round(Math.random() * 6).toString(),
        x: props.cellWidth*(n),
        y: 0,
        points: [0, 0, 0, colX2]
    });
  }
})
</script>
<template>
  <div>
        <v-line v-for="item in state.xList" :key="item.id" :config="{
              x : item.x, y: item.y, points: item.points, stroke: '#BBB', strokeWidth: 1,
            }"></v-line>
            <v-line v-for="item in state.yList" :key="item.id" :config="{
              x : item.x, y: item.y, points: item.points, stroke: '#BBB', strokeWidth: 1,
            }"></v-line>
  </div>
</template>
<style>
body {
  margin: 0;
  padding: 0;
}
</style>