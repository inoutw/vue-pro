<template>
    <div class="swim-lane-container">
      <div v-for="(lane, index) in lanes" :key="index" class="swim-lane" :style="{ width: laneWidth + 'px' }">
        <div v-if="index > 0" class="lane-separator" @mousedown="onMouseDown($event, index)"></div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, reactive } from 'vue';
  
  export default {
    setup() {
      const laneWidth = ref(0);
      const lanes = reactive(Array.from({ length: 7 }, () => 0));
  
      const onMouseDown = (event, index) => {
        event.preventDefault();
        event.stopPropagation();
  
        const startX = event.pageX;
        const startWidth = laneWidth.value;
        const separatorWidth = 10;
  
        const onMouseMove = (event) => {
          const deltaX = event.pageX - startX;
          laneWidth.value = startWidth + deltaX / lanes.length;
          lanes[index - 1] = laneWidth.value - separatorWidth;
          lanes[index] = laneWidth.value;
        };
  
        const onMouseUp = () => {
          document.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseup', onMouseUp);
        };
  
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };
  
      return {
        laneWidth,
        lanes,
        onMouseDown,
      };
    },
  };
  </script>
  
  <style>
  .swim-lane-container {
    display: flex;
    justify-content: space-between;
  }
  
  .swim-lane {
    flex: 1 0 0;
    height: 200px;
    background-color: #eee;
    position: relative;
  }
  
  .lane-separator {
    position: absolute;
    top: 0;
    right: -5px;
    bottom: 0;
    width: 10px;
    cursor: col-resize;
    background-color: #ddd;
  }
  </style>
  