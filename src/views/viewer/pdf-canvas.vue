<!-- 将pdf渲染成canvas, 有点复杂，放弃 -->
<script setup lang="ts">
import { onMounted, reactive, nextTick, ref } from 'vue'
import * as PDF from 'pdfjs-dist'

const pdfjsWorker = import('pdfjs-dist/build/pdf.worker.entry')

// import pdf from
const pdf = '/compressed.tracemonkey-pldi-09.pdf'
console.log('pdf', pdf)
const state = reactive<any>({
  pdfPath: pdf, //本地PDF文件地址
  pdfPages: '', //页数
  pdfWidth: '', //宽度
  pdfSrc: '', //地址
  pdfScale: 1.0 //放大倍数
})

let pdfDoc: any = ref<any>(null)
onMounted(() => {
  loadFile(state.pdfPath)
})
function loadFile(url: string) {
  PDF.GlobalWorkerOptions.workerSrc = pdfjsWorker
  PDF.getDocument(url).promise.then((p: any) => {
    pdfDoc.value = p
    const { numPages } = p
    state.pdfPages = numPages
    nextTick(() => {
      renderPage(1) //从第一页开始渲染
    })
  })
}
function renderPage(num: number) {
  pdfDoc.value.getPage(num).then((page: any) => {
    const canvas: any = document.getElementById(`pdfCanvas${num}`)
    const ctx = canvas?.getContext('2d') || {}
    const dpr = window.devicePixelRatio || 1
    const bsr =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1
    const ratio = dpr / bsr
    const viewport = page.getViewport({ scale: state.pdfScale })
    canvas.width = viewport.width * ratio
    canvas.height = viewport.height * ratio
    canvas.style.width = '100%'
    canvas.style.height = '100%'
    state.pdfWidth = `${viewport.width}px`
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
    //将PDF页面渲染到canvas上下文中
    const renderContext = {
      canvasContext: ctx,
      viewport
    }
    // page.render()：该函数返回一个当PDF页面成功渲染到界面上时解析的promise，我们可以使用成功回调来渲染文本图层。
    page.render(renderContext)
    //   .promise.then(() => {
    //     // page.getTextContent()：该函数的成功回调会返回PDF页面上的文本片段。
    //     return page.getTextContent()
    //   })
    //   .then((textContent) => {
    //     // 创建文本图层div
    //     const textLayerDiv = document.createElement('div')
    //     textLayerDiv.setAttribute('class', 'textLayer')
    // 将文本图层div添加至每页pdf的div中
    // PDF.pageDiv?.appendChild(textLayerDiv)
    // var textLayer = new TextLayerBuilder({
    //   textLayerDiv: textLayerDiv,
    //   pageIndex: page.pageIndex,
    //   viewport: viewport
    // })
    // textLayer.setTextContent(textContent)
    // textLayer.render()
    //   })
    // TextLayerBuilder：该类的实例有两个重要的方法。setTextContent()用于设置page.getTextContent()函数返回的文本片段；render()用于渲染文本图层。

    if (state.pdfPages > num) {
      renderPage(num + 1)
    }
  })
}
</script>

<template>
  <div id="pdf-container">
    <canvas v-for="page in state.pdfPages" :key="page" :id="`pdfCanvas${page}`" style="border-bottom: 1px solid #d4d2d2" />
  </div>
</template>

<style lang="less" scoped></style>
