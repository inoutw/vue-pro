<template>
  <div>
    Click on canvas to create a cirlce.
    <a href="./circle">Reload the page</a>. Circles should stay here.
    <v-stage ref="stage" :config="stageSize" @click="handleClick">
      <v-layer ref="layer">
        <v-circle
          v-for="item in list"
          :key="item.id"
          :config="{
            x: item.x,
            y: item.y,
            radius: item.radius,
            fill: 'red'
          }"
        ></v-circle>
      </v-layer>
      <v-layer ref="dragLayer"></v-layer>
    </v-stage>
  </div>
</template>

<script lang="js">
const width = window.innerWidth
const height = window.innerHeight

export default {
  data() {
    return {
      list: [{ x: 100, y: 100, radius: 50, fill: 'blue' }],
      stageSize: {
        width: width,
        height: height
      }
    }
  },
  methods: {
    handleClick(evt) {
      const stage = evt.target.getStage()
      const pos = stage.getPointerPosition()
      const radius = Math.max(Math.random().toFixed(2) * 50, 10)
      this.list.push({ ...pos, radius })

      this.save()
    },

    load() {
      const data = localStorage.getItem('storage') || '[]'
      this.list = JSON.parse(data)
    },

    save() {
      localStorage.setItem('storage', JSON.stringify(this.list))
    }
  },
  mounted() {
    this.load()
  }
}
</script>
