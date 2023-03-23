<script lang="ts" setup>
import { onMounted, reactive } from 'vue'

const width = window.innerWidth
const height = window.innerHeight
const state = reactive<any>({
  list: [],
  dragItemId: ''
})
const configKonva = {
  width: width,
  height: height
}
const handleDragstart = (e: any) => {
  // save drag element:
  state.dragItemId = e.target.id()
  // move current element to the top:
  const item: any = state.list.find((i: any) => i.id === state.dragItemId)
  const index = state.list.indexOf(item)
  state.list.splice(index, 1)
  state.list.push(item)
}
const handleDragend = () => {
  state.dragItemId = null
}
onMounted(() => {
  for (let n = 0; n < 30; n++) {
    state.list.push({
      id: Math.round(Math.random() * 10000).toString(),
      x: Math.random() * width,
      y: Math.random() * height,
      rotation: Math.random() * 180,
      scale: Math.random()
    })
  }
})
</script>
<template>
  <div>
    <v-stage ref="stage" :config="configKonva" @dragstart="handleDragstart" @dragend="handleDragend">
      <v-layer ref="layer">
        <v-star
          v-for="item in state.list"
          :key="item.id"
          :config="{
            x: item.x,
            y: item.y,
            rotation: item.rotation,
            id: item.id,
            numPoints: 5,
            innerRadius: 30,
            outerRadius: 50,
            fill: '#89b717',
            opacity: 0.8,
            draggable: true,
            scaleX: state.dragItemId === item.id ? item.scale * 1.2 : item.scale,
            scaleY: state.dragItemId === item.id ? item.scale * 1.2 : item.scale,
            shadowColor: 'black',
            shadowBlur: 10,
            shadowOffsetX: state.dragItemId === item.id ? 15 : 5,
            shadowOffsetY: state.dragItemId === item.id ? 15 : 5,
            shadowOpacity: 0.6
          }"
        ></v-star>
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
