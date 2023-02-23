<script lang="ts" setup>
import { DEFAULT_ACTIVE_BORDER_COLOR, DEFAULT_CELL_HEIGHT, DEFAULT_CELL_WIDTH } from '../constant';
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
        default: DEFAULT_CELL_WIDTH
    },
    height: {
        type: Number,
        default: DEFAULT_CELL_HEIGHT
    },
    fill: {
        type: String,
        default: 'transparent'
    },
    stroke: {
        type: String,
        default: DEFAULT_ACTIVE_BORDER_COLOR
    }
})
</script>
<template>
    <v-rect :config="{x: left, y: top, width, height, fill,
              stroke,
              strokeWidth:2, ...$attrs}"></v-rect>
              {{$attrs}}
</template>