<script setup lang="ts">
import { ref } from 'vue'
//引入VueOfficeDocx组件
import VueOfficeDocx from '@vue-office/docx'
//引入相关样式
import '@vue-office/docx/lib/index.css'

const docxSrc = ref<string>('http://192.168.53.219/file/20231023/a612c6e045b74af1be9a83f28a675a80.docx')
// const docxSrc = ref<string>('http://static.shanhuxueyuan.com/test6.docx')

const rendered = () => {
  console.log('渲染完成')
}
</script>
<template>
  <div class="viewer">
    <vue-office-docx :src="docxSrc" style="height: 100vh" @rendered="rendered" />
  </div>
</template>
<style lang="less" scoped></style>
