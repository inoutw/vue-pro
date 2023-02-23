<template>
    <v-stage :config="stageSize">
      <v-layer>
        <v-rect v-for="(cell, index) in cells" :key="index" :config="cell" />
      </v-layer>
    </v-stage>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { Stage, Layer, Rect } from "vue-konva";
  
  export default {
    components: {
      Stage,
      Layer,
      Rect,
    },
    setup() {
      const stageSize = {
        width: 400,
        height: 300,
      };
  
      const cellSize = {
        width: stageSize.width / 4,
        height: stageSize.height / 3,
      };
  
      const cells = ref([]);
  
      const createCells = () => {
        const rows = 3;
        const columns = 4;
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < columns; j++) {
            const x = j * cellSize.width;
            const y = i * cellSize.height;
            const fill = "white";
            const stroke = "black";
            const strokeWidth = 2;
  
            // 设置相邻格子共用边线的颜色
            const topColor = i > 0 ? cells.value[(i - 1) * columns + j].stroke : stroke;
            const rightColor = j < columns - 1 ? cells.value[i * columns + j + 1].stroke : stroke;
            const bottomColor = i < rows - 1 ? cells.value[(i + 1) * columns + j].stroke : stroke;
            const leftColor = j > 0 ? cells.value[i * columns + j - 1].stroke : stroke;
  
            cells.value.push({
              x,
              y,
              width: cellSize.width,
              height: cellSize.height,
              fill,
              stroke: "white",
              strokeWidth,
              shadowColor: "black",
              shadowBlur: 5,
              shadowOffset: { x: 5, y: 5 },
              shadowOpacity: 0.5,
              listening: false,
              // 设置相邻格子共用边线的颜色
              perfectDrawEnabled: false,
              strokeScaleEnabled: false,
              strokeHitEnabled: false,
              dashEnabled: false,
              lineJoin: "round",
              lineCap: "round",
              dash: [0, 0],
              sceneFunc(context, shape) {
                context.beginPath();
                context.moveTo(shape.x(), shape.y());
                context.lineTo(shape.x() + shape.width(), shape.y());
                context.strokeStyle = topColor;
                context.stroke();
  
                context.beginPath();
                context.moveTo(shape.x() + shape.width(), shape.y());
                context.lineTo(shape.x() + shape.width(), shape.y() + shape.height());
                context.strokeStyle = rightColor;
                context.stroke();
  
                context.beginPath();
                context.moveTo(shape.x() + shape.width(), shape.y() + shape.height());
          context.lineTo(shape.x(), shape.y() + shape.height());
          context.strokeStyle = bottomColor;
          context.stroke();

          context.beginPath();
          context.moveTo(shape.x(), shape.y() + shape.height());
          context.lineTo(shape.x(), shape.y());
          context.strokeStyle = leftColor;
          context.stroke();
        },
      });
    }
  }
};

onMounted(() => {
  createCells();
});

return {
  stageSize,
  cells,
};
},
};
</script>
  