<script lang="ts" setup>
/**
 * 栅格组件
 */
import { inject, onMounted, reactive } from 'vue';
import { DEFAULT_CELL_HEIGHT, DEFAULT_CELL_WIDTH, DEFAULT_COL_COUNT, DEFAULT_ROW_COUNT } from '../constant';

const props = defineProps({
    rows: {
        type: Number,
        default: DEFAULT_ROW_COUNT,
    },
    cols: {
        type: Number,
        default: DEFAULT_COL_COUNT
    },
    cellHeight: {
        type: Number,
        default: DEFAULT_CELL_HEIGHT,
    },
    cellWidth: {
        type: Number,
        default: DEFAULT_CELL_WIDTH,
    },
})
const state = reactive<any>({
  xList: [],
  yList: [],
})

/**
 * 生成栅格线数据
 */
const genXYList = ()=>{
    const {rows, cols, cellWidth, cellHeight} = props
    const rowX2 = cols * cellWidth
    const colX2 = rows * cellHeight
    for (let n = 0; n < rows+1; n++) {
        state.xList.push({
            id: Math.round(Math.random() * rows).toString(),
            x: 0,
            y: cellHeight*(n),
            points: [0, 0, rowX2, 0]
        });
    }
    for (let n = 0; n < cols+1; n++) {
        state.yList.push({
            id: Math.round(Math.random() * 6).toString(),
            x: cellWidth*(n),
            y: 0,
            points: [0, 0, 0, colX2]
        });
    }
}
onMounted(()=>{
    genXYList()
})
</script>
<template>
        <v-line v-for="item in state.xList" :key="item.id" :config="{
              x : item.x, y: item.y, points: item.points, stroke: '#BBB', strokeWidth: 1,
            }"></v-line>
            <v-line v-for="item in state.yList" :key="item.id" :config="{
              x : item.x, y: item.y, points: item.points, stroke: '#BBB', strokeWidth: 1,
            }"></v-line>
</template>
<style>
body {
  margin: 0;
  padding: 0;
}
</style>