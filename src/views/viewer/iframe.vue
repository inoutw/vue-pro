<script setup lang="ts">
import { ref } from 'vue'
// https://stackoverflow.com/questions/27957766/how-do-i-render-a-word-document-doc-docx-in-the-browser-using-javascript
</script>
<template>
  <div class="viewer">
    <iframe
      width="1920"
      height="1080"
      src="https://view.officeapps.live.com/op/embed.aspx?url=http://static.shanhuxueyuan.com/test6.docx"
    ></iframe>

    <iframe
      src="https://view.officeapps.live.com/op/embed.aspx?src=http://remote.url.tld/path/to/document.doc"
      width="1366px"
      height="623px"
      frameborder="0"
      >This is an embedded <a target="_blank" href="http://office.com">Microsoft Office</a> document, powered by
      <a target="_blank" href="http://office.com/webapps">Office Online</a>.</iframe
    >
  </div>
</template>
<style lang="less" scoped></style>
