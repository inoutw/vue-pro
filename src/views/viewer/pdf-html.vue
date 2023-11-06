<script setup lang="ts">
import { ref } from 'vue'
import PdfViewer from './components/pdf-viewer.vue'
const pdfUrl = 'http://192.168.53.219/autosarfile/R20-11/en/AP/SWS/AUTOSAR_SWS_AdaptiveIntrusionDetectionSystemManager.pdf#page=10'
</script>
<template>
  <div class="viewer">
    <PdfViewer :src="pdfUrl" />
  </div>
</template>
<style lang="less" scoped>
.viewer {
  width: 70%;
  height: 100vh;
  position: absolute;
  right: 0;
  padding: 20px;
}
</style>
