<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import {isEmpty} from 'lodash';
import {GRID_OFFSET,GRID_CONFIG, DEFAULT_CELL_WIDTH, DEFAULT_CELL_HEIGHT, DEFAULT_CHECKBOX_BORDER_COLOR} from './constant'
import SdwGrid from './components/sdw-grid.vue';    
import SdwHoveredRow from './components/sdw-hovered-row.vue';    
import SdwActiveCell from './components/sdw-active-cell.vue';    
import { useCellPosArr, useRowPosArr } from './hooks';
import { getTargetGrid, getTargetRow } from './helper';
import { mockData, columnHeader } from './data/index';
import { computed } from '@vue/reactivity';

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
  // console.log('targetGrid', targetGrid)
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

const firstColOffset = (index: number, offsetX= 60)=>{
  return index === 0 ? offsetX : 0
}
const checkBoxShow = (index: number)=>{
  if(isEmpty(hoveredRow.value)) return false
  let hoveredRowTop = hoveredRow.value.top
  return  hoveredRowTop / DEFAULT_CELL_HEIGHT === index
}
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
            <v-text v-for="(item, index) in columnHeader" :config="{text: item.name, fontSize: 20, draggable: false, x: DEFAULT_CELL_WIDTH*(index)+ firstColOffset(index, 46), y: 5, offsetX: -10}" ></v-text>
            <sdw-hovered-row :v-show="!isEmpty(hoveredRow)" :top="hoveredRow.top" :left="hoveredRow.left"/>
            <sdw-active-cell :v-show="!isEmpty(activeCell)" :top="activeCell.top" :left="activeCell.left"/>

            <v-group v-for="(item, index) in mockData" :key="index" :x="10" :y="10 + (index+1) * DEFAULT_CELL_HEIGHT">
        <v-text v-for="(colItem, keyIndex) in columnHeader" :key="keyIndex"
          :config="{ text: item[colItem.dataIndex], x: DEFAULT_CELL_WIDTH*(keyIndex) + firstColOffset(keyIndex), fontSize: 16}"
        ></v-text>
        <v-rect :config="{x: 16, fill: 'white', stroke:DEFAULT_CHECKBOX_BORDER_COLOR, strokeWidth: 2, width: checkBoxShow(index+1)?12:0, height: checkBoxShow(index+1)?12:0}" ></v-rect>
      </v-group>
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