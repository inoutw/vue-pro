<script setup lang="ts">
import layout from './layout/index.vue'
</script>

<template>
  <div class="app">
    <layout></layout>
  </div>
</template>

<style>
html,
body,
#app {
  font-family: 'SourceHanSansCN-Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1920px;
  width: 100%;
  /* width: auto; */
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
}
</style>
