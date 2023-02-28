<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, ref } from 'vue';
import {isEmpty} from 'lodash';
import {useEventListener} from '@vueuse/core'
import {GRID_OFFSET,GRID_CONFIG, DEFAULT_CELL_WIDTH, DEFAULT_CELL_HEIGHT, DEFAULT_CHECKBOX_BORDER_COLOR} from './constant'
import SdwGrid from './components/sdw-grid.vue';    
import SdwHoveredRow from './components/sdw-hovered-row.vue';    
import SdwActiveCell from './components/sdw-active-cell.vue';    
import { useCellPosArr, useCellValPosArr, useRowPosArr } from './hooks';
import { getTargetGrid, getTargetRow } from './helper';
import { mockData, columnHeader } from './data/index';

const width = window.innerWidth;
const height = window.innerHeight;

const configKonva = {
  width: width,
  height: height
}
const activeCell = ref<any>({})
const activeCellData = ref<any>({})
const hoveredRow = ref<any>({})
const inputStr = ref<string>('')
// 栅格的位置
const cellsPos = useCellPosArr(GRID_CONFIG)
// 数据列表的位置
const cellValPosArr = useCellValPosArr(columnHeader, mockData )
//https://blog.csdn.net/yanxiaosa/article/details/70273277
const handleGridClick = (evt: any)=>{
  const stage = evt.target.getStage();
  const pos = stage.getPointerPosition();
  const targetGrid = getTargetGrid(pos, cellsPos, GRID_OFFSET)
  const targetCellVal = getTargetGrid(pos, cellValPosArr, GRID_OFFSET)
  //切换了格子
  if(!isEmpty(activeCell.value) && (targetGrid.top !== activeCell.value.top || targetGrid.left !== activeCell.value.left)){
    inputStr.value = ''
  }
  activeCell.value = targetGrid
  activeCellData.value = !isEmpty(targetCellVal) ? targetCellVal: targetGrid
  console.log('targetCellVal',activeCell, targetCellVal)
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

useEventListener(document, 'keypress', (evt: any)=>{
  if(isEmpty(activeCell.value)) return
  let inputRes = inputStr.value
  inputRes += evt.key
    if(!activeCellData.value.value){
      cellValPosArr.push(activeCellData.value)
    }
    inputStr.value = inputRes
    activeCellData.value.value = inputRes
})


const handleGridDbClick = (evt: any)=>{
  const {x, y} = evt
  console.log('dbclick', x, y)
}
useEventListener(document, 'dblclick', handleGridDbClick)
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
            <sdw-active-cell :v-show="!isEmpty(activeCell)" :top="activeCell.top" :left="activeCell.left" :cellValue="activeCellData" cellType="text"></sdw-active-cell>

            <v-group v-for="(item, index) in mockData" :key="index" :x="10" :y="10 + (index+1) * DEFAULT_CELL_HEIGHT">

        <!--首列CheckBox start-->
        <v-rect :config="{x: 16, fill: 'white', stroke:DEFAULT_CHECKBOX_BORDER_COLOR, strokeWidth: 2, width: checkBoxShow(index+1)?12:0, height: checkBoxShow(index+1)?12:0}" ></v-rect>
        <!--首列CheckBox end-->
      </v-group>

      <v-group :x="10">
        <v-text  v-for="(colItem, keyIndex) in cellValPosArr" :key="keyIndex" 
          :config="{ text: colItem.value, x: colItem.left, y: colItem.top + 10, fontSize: 16}"
        ></v-text>
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