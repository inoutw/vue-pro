<script lang="ts" setup>
import { ref, reactive } from 'vue'

const pdfViewer = '/pdfjs/web/viewer.html'

const props = defineProps({
  src: {
    type: String,
    default: ''
  }
})

const iframeRef = ref()
</script>
<template><iframe ref="iframeRef" :src="`${pdfViewer}?file=${encodeURIComponent(src)}`" width="100%" height="100%"></iframe></template>
<style lang="less" scoped>
iframe {
  border: 0;
}
</style>
