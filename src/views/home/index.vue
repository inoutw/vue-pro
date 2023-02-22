<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import {columnHeader} from './constant'
import sdwGrid from './components/sdw-grid.vue';    

const width = window.innerWidth;
const height = window.innerHeight;
const state = reactive<any>({
  xList: [],
  yList: [],
  dragItemId: ''
})
const configKonva = {
  width: width,
  height: height
}
 const  handleDragstart = (e: any)=> {
    // save drag element:
    state.dragItemId = e.target.id();
    // move current element to the top:
    const item: any = state.xList.find((i: any) => i.id === state.dragItemId);
    const index = state.xList.indexOf(item);
    state.xList.splice(index, 1);
    state.xList.push(item);
}
const handleDragend = () => {
    state.dragItemId = null;
}
//https://blog.csdn.net/yanxiaosa/article/details/70273277
const handleGridClick = (evt: any)=>{
  console.log('evt', evt)
}
onMounted(()=>{
})
</script>
<template>
  <div>
    <v-stage
      ref="stage"
      :config="configKonva"
      @click="handleGridClick"
    >
      <v-layer ref="layer">
        <!-- <v-text :config="{text: 'Some text on canvas', fontSize: 20, draggable: true}" /> -->
        
        <!-- <v-line v-for="item in state.xList" :key="item.id" :config="{
              x : item.x, y: item.y, points: item.points, stroke: '#BBB', strokeWidth: 1,
            }"></v-line>
            <v-line v-for="item in state.yList" :key="item.id" :config="{
              x : item.x, y: item.y, points: item.points, stroke: '#BBB', strokeWidth: 1,
            }"></v-line> -->
            <v-group :config="{x: 200, y: 20}" >
            <sdw-grid></sdw-grid>
<v-text v-for="(item, index) in columnHeader" :config="{text: item.name, fontSize: 20, draggable: false, x: 160*(index), y: 5, offsetX: -60}" ></v-text>

        </v-group>
</v-layer>
    </v-stage>
  </div>
</template>
<style>
body {
  margin: 0;
  padding: 0;
}
</style>