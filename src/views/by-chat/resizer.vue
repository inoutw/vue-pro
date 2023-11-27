<template>
  <div class="lane-resize-container">
    <el-row :gutter="10" class="lane-row" ref="laneRow">
      <el-col
        v-for="(lane, index) in lanes"
        :key="lane.id"
        :xs="12"
        :sm="6"
        :md="4"
        :lg="3"
        :style="laneStyle(index)"
        @mousedown="startResize(index, $event)"
        @mousemove="resizeHandler($event)"
        @mouseup="endResize"
      >
        <div class="lane-header">{{ lane.name }}</div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import { ref, reactive } from 'vue'

export default {
//   setup() {
//     const containerRef = ref(null)

//     const lanes = reactive([
//       { name: 'Lane 1', color: 'pink', width: 100 / 7 },
//       { name: 'Lane 2', color: 'orange', width: 100 / 7 },
//       { name: 'Lane 3', color: 'yellow', width: 100 / 7 },
//       { name: 'Lane 4', color: 'green', width: 100 / 7 },
//       { name: 'Lane 5', color: 'blue', width: 100 / 7 },
//       { name: 'Lane 6', color: 'purple', width: 100 / 7 },
//       { name: 'Lane 7', color: 'gray', width: 100 / 7 },
//     ])


//     startResize(index, event) {
//   this.isResizing = true
//   this.resizingIndex = index
//   this.resizingStartX = event.clientX
//   this.resizingStartWidth = this.lanes[index].width
// }
// resizeHandler(event) {
//   if (this.isResizing) {
//     const deltaX = event.clientX - this.resizingStartX
//     const totalWidth = this.getTotalWidth()
//     const totalGutterWidth = (this.lanes.length - 1) * this.gutterWidth
//     const totalAvailableWidth = totalWidth - totalGutterWidth - this.resizingStartWidth
//     const availableWidth = totalAvailableWidth + deltaX
//     const maxWidth = this.maxWidth
//     const minWidth = this.minWidth
//     let newWidth = this.resizingStartWidth + deltaX

//     // clamp width between min and max width
//     if (newWidth > maxWidth) {
//       newWidth = maxWidth
//     } else if (newWidth < minWidth) {
//       newWidth = minWidth
//     }

//     // distribute the remaining available width to other lanes
//     const totalNewAvailableWidth = totalAvailableWidth - (newWidth - this.resizingStartWidth)
//     const availablePerLane = totalNewAvailableWidth / (this.lanes.length - 1)
//     this.lanes.forEach((lane, index) => {
//       if (index !== this.resizingIndex) {
//         lane.width = availablePerLane
//       }
//     })
//     this.lanes[this.resizingIndex].width = newWidth

//     // update column style
//     this.$refs.laneRow.$el.childNodes.forEach((el, index) => {
//       if (index !== this.lanes.length - 1) {
//         el.style.width = `${this.lanes[index].width}%`
//       }
//     })
//   }
// }
// endResize() {
//   this.isResizing = false;
//   this.resizingColIndex = null;
//   document.removeEventListener('mousemove', this.onMouseMove);
//   document.removeEventListener('mouseup', this.endResize);
// }



//     let activeLaneIndex = null
//     let startX = null


//     return {
//       containerRef,
//       lanes,
//       startResize,
//       resizeHandler,
//       endResize,
//     }
// }
}
</script>

<style>
.container {
  display: flex;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}

.lane {
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}
</style>
