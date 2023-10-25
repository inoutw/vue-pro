<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { renderAsync } from 'docx-preview'

const docData = ref()
const fileSrc = 'http://192.168.53.219/file/20231023/a612c6e045b74af1be9a83f28a675a80.docx'
function fetchDocx(src, options) {
  return fetch(src, options).then((res) => {
    if (res.status !== 200) {
      return Promise.reject(res)
    }
    return res
  })
}
async function getBlob(data) {
  let blob
  if (data instanceof Blob) {
    blob = data
  } else if (data instanceof Response) {
    blob = await data.blob()
  } else if (data instanceof ArrayBuffer) {
    blob = new Blob([data])
  }
  return blob
}
const domRef = ref<any>(null)
onMounted(() => {
  const targetHtml = document.getElementById('container')
  fetchDocx(fileSrc).then((res) => {
    getBlob(res).then((resBlob) => {
      docData.value = resBlob
      renderAsync(docData.value, targetHtml, targetHtml, {}).then((x) => console.log('docx: finished'))
    })
  })
})
</script>
<template>
  <div id="container" ref="domRef"></div>
</template>
<style lang="less" scoped>
#container {
  text-align: start;
}
</style>
