<template>
  <v-stage :config="{ width: 500, height: 200 }">
    <v-layer>
      <v-rect :config="{ width: 500, height: 200, fill: '#f0f0f0' }"></v-rect>
      <v-group v-for="(item, index) in dataList" :key="index" :x="20" :y="40 + index * 30">
        <v-text :config="{ text: item.name, fontSize: 16 }"></v-text>
        <v-text :config="{ text: item.age, x: 120, fontSize: 16 }"></v-text>
        <v-text :config="{ text: item.city, x: 220, fontSize: 16 }"></v-text>
      </v-group>
      <v-line :config="{ points: [20, 30, 480, 30], stroke: 'black', strokeWidth: 2 }"></v-line>
      <v-line :config="{ points: [20, 60, 480, 60], stroke: 'black', strokeWidth: 2 }"></v-line>
      <v-line :config="{ points: [20, 90, 480, 90], stroke: 'black', strokeWidth: 2 }"></v-line>
    </v-layer>
  </v-stage>
</template>
<script lang="ts">
export default {
  data() {
    return {
      dataList: [
        { name: 'John', age: 25, city: 'New York' },
        { name: 'Jane', age: 32, city: 'Los Angeles' },
        { name: 'Bob', age: 47, city: 'Chicago' }
      ]
    }
  }
}
</script>
