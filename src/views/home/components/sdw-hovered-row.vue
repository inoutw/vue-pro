<script lang="ts" setup>
import { DEFAULT_ACTIVE_BORDER_COLOR, DEFAULT_CELL_HEIGHT, DEFAULT_CELL_WIDTH, DEFAULT_HOVER_COLOR, DEFAULT_ROW_WIDTH } from '../constant';
/**
 * 选中的高亮格子
 */
defineProps({
    top: {
        type: Number,
        default: -2000,
    },
    left: {
        type: Number,
        default: -2000
    },
    width: {
        type: Number,
        default: DEFAULT_ROW_WIDTH
    },
    height: {
        type: Number,
        default: DEFAULT_CELL_HEIGHT
    },
    fill: {
        type: String,
        default: DEFAULT_HOVER_COLOR
    },
    
})
</script>
<template>
    <v-rect :config="{x: left, y: top, width, height, fill,
              strokeWidth:0, ...$attrs}"></v-rect>
              {{$attrs}}
</template>