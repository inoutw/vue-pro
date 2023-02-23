<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import {isEmpty} from 'lodash';
import {columnHeader,GRID_OFFSET,GRID_CONFIG} from './constant'
import SdwGrid from './components/sdw-grid.vue';    
import SdwHoveredRow from './components/sdw-hovered-row.vue';    
import SdwActiveCell from './components/sdw-active-cell.vue';    
import { useCellPosArr, useRowPosArr } from './hooks';
import { getTargetGrid, getTargetRow } from './helper';

const width = window.innerWidth;
const height = window.innerHeight;

const configKonva = {
  width: width,
  height: height
}
const activeCell = ref<any>({})
const hoveredRow = ref<any>({})
const cellsPos = useCellPosArr(GRID_CONFIG)
//https://blog.csdn.net/yanxiaosa/article/details/70273277
const handleGridClick = (evt: any)=>{
  const stage = evt.target.getStage();
  const pos = stage.getPointerPosition();
  const targetGrid = getTargetGrid(pos, cellsPos, GRID_OFFSET)
  activeCell.value = targetGrid
  console.log('targetGrid', targetGrid)
}
const rowsPos = useRowPosArr(GRID_CONFIG)
const handleMouseMove = ({evt, target}: any)=>{
  const {x, y} = evt
  const pos = {x, y}
  const targetRow = getTargetRow(pos, rowsPos, GRID_OFFSET)
  // console.log('targetRow', targetRow)
  hoveredRow.value = targetRow
  
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
      @mousemove="handleMouseMove"
    >
      <v-layer ref="layer" >
            <v-group :config="GRID_OFFSET" >
            <sdw-grid></sdw-grid>
            <v-text v-for="(item, index) in columnHeader" :config="{text: item.name, fontSize: 20, draggable: false, x: 160*(index), y: 5, offsetX: -60}" ></v-text>
            <sdw-hovered-row :v-show="!isEmpty(hoveredRow)" :top="hoveredRow.top" :left="hoveredRow.left"/>
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