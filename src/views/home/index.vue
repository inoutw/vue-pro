<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import {isEmpty} from 'lodash';
import {columnHeader,GRID_OFFSET,GRID_CONFIG} from './constant'
import SdwGrid from './components/sdw-grid.vue';    
import SdwActiveCell from './components/sdw-active-cell.vue';    
import { useCellPosArr } from './hooks';
import { getTargetGrid } from './helper';

const width = window.innerWidth;
const height = window.innerHeight;

const configKonva = {
  width: width,
  height: height
}
const activeCell = ref<any>({})
const cellsPos = useCellPosArr(GRID_CONFIG)
//https://blog.csdn.net/yanxiaosa/article/details/70273277
const handleGridClick = (evt: any)=>{
  const stage = evt.target.getStage();
  const pos = stage.getPointerPosition();
  const targetGrid = getTargetGrid(pos, cellsPos, GRID_OFFSET)
  activeCell.value = targetGrid
  console.log('targetGrid', targetGrid)
}
onMounted(()=>{
})
onUnmounted(()=>{
  activeCell.value = {}
})
</script>
<template>
  <div>
    <v-stage
      ref="stage"
      :config="configKonva"
      @click="handleGridClick"
    >
      <v-layer ref="layer" >
            <v-group :config="GRID_OFFSET" >
            <sdw-grid></sdw-grid>
            <v-text v-for="(item, index) in columnHeader" :config="{text: item.name, fontSize: 20, draggable: false, x: 160*(index), y: 5, offsetX: -60}" ></v-text>
            <sdw-active-cell :v-show="!isEmpty(activeCell)" :top="activeCell.top" :left="activeCell.left"/>

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