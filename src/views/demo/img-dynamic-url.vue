<script lang="ts" setup>
import {ref, onMounted} from 'vue'
    const imgSrc = ref('')
onMounted(()=>{
    setTimeout(() => {
        // const path = '/web/logo.svg'
        const path = '/assets/pro-dev.68d3174c.png'
        // https://172.16.0.41/assets/pro-dev.68d3174c.png
        imgSrc.value = `https://172.16.0.41${path}`
    }, 1000);
})
</script>
<template>
    <img :src="imgSrc" alt="">
</template>
<style>
img{
    width: 200px;
    height: 200px;
}
</style>