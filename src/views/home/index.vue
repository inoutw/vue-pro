<script lang="ts" setup>
import { onMounted, reactive } from 'vue';

const width = window.innerWidth;
const height = window.innerHeight;
const state = reactive<any>({
  list: [],
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
    const item: any = state.list.find((i: any) => i.id === state.dragItemId);
    const index = state.list.indexOf(item);
    state.list.splice(index, 1);
    state.list.push(item);
}
const handleDragend = () => {
    state.dragItemId = null;
}
onMounted(()=>{
  for (let n = 0; n < 30; n++) {
    state.list.push({
        id: Math.round(Math.random() * 10000).toString(),
        x: Math.random() * width,
        y: Math.random() * height,
        rotation: Math.random() * 180,
        scale: Math.random()
    });
  }
})
</script>
<template>
  <div>
    <v-stage
      ref="stage"
      :config="configKonva"
      @dragstart="handleDragstart"
      @dragend="handleDragend"
    >
      <v-layer ref="layer">
        <v-text :config="{text: 'Some text on canvas', fontSize: 20, draggable: true}" />
        <v-line :config="{
            draggable: true,
            x: 20,
            y: 200,
            points: [0, 0, 100, 0, 100, 100],
            tension: 0.5,
            closed: true,
            stroke: 'black',
            fillLinearGradientStartPoint: { x: -50, y: -50 },
            fillLinearGradientEndPoint: { x: 50, y: 50 },
            fillLinearGradientColorStops: [0, 'red', 1, 'yellow']
        }"/>
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