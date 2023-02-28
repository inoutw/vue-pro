

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElInput } from 'element-plus';
import { DEFAULT_CELL_HEIGHT, DEFAULT_CELL_WIDTH } from '../../constant';
const editorRef = ref<HTMLInputElement>();
const props = defineProps({
    placeholder: String,
    editable: {
        type: Boolean,
        default: true,
    },
    width: {
        type: Number,
        default: DEFAULT_CELL_WIDTH - 1
    },
    height: {
        type: Number,
        default: DEFAULT_CELL_HEIGHT - 2
    },
    type: {
        type: String,
        default: 'text'
    }


})
const emits = defineEmits(['change', 'blur'])

const setValue = (val: String)=>{
    state.data = val
}
const state = reactive<any>({
    data: ''
})

const updateValue = (event: any) => {
    const value = event.target.value;
    if (props.editable) {
      setValue(value);
    }
    emits('change', value)
  };

  defineExpose({setValue})
</script>
<template>
    <div class="text-editor-container">
        <el-input
            ref="editorRef"
            :type="type"
            v-model="state.data"
            :placeholder="placeholder"
            @change="updateValue"
            :disabled="!editable"
            v-bind="$attrs"
            v-on="$attrs"
            class="text-editor-input"
          />
    </div>
</template>
<style lang="less" scoped>
.text-editor-container {
    width: v-bind(width);
    height: v-bind(height);
    .text-editor-input {
        width: 100%;
        height: 100%;
    }

}
</style>