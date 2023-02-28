<script setup lang="ts">
import TextEditor from './text-editor.vue'
import { FieldType } from '@types/field-types';
const props = defineProps({
    field: {
        type: Object as any
    }
})
  
</script>
<template>
    <div class="editor-container">
        <text-editor :v-if="[FieldType.Text, FieldType.TextArea].includes(field.type)"></text-editor>
    </div>
</template>
<style lang="less" scoped>
    
</style>