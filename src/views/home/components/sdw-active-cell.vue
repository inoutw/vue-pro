<script lang="ts" setup>
import {isEmpty} from 'lodash'
import { DEFAULT_ACTIVE_BORDER_COLOR, DEFAULT_CELL_HEIGHT, DEFAULT_CELL_WIDTH } from '../constant';
/**
 * 选中的高亮格子
 */
const props = defineProps({
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
        default: '#fff'
    },
    stroke: {
        type: String,
        default: DEFAULT_ACTIVE_BORDER_COLOR
    },
    cellValue: {
        type: Object,
        default: {left: 0, top: 0}
    },
    cellType: {
        type: String,
        default: ''
    }
})

</script>
<template>
    <v-rect :config="{x: left, y: top, width, height, fill,
              stroke,
              strokeWidth:2, ...$attrs}"></v-rect>
              <!--高亮格子之上的值-->
              <v-text v-if="cellType==='text' && !isEmpty(cellValue)" :config="{text: cellValue.value, x: cellValue.left+10, y: cellValue?.top+10, fontSize: 16}"></v-text>
             
</template>