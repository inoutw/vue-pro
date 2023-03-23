<script lang="ts" setup>
import { ref, computed, provide, onMounted, nextTick } from 'vue'
import Menu from './my-menu/Menu.vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuTree } from '../store/menu-store'

const route = useRoute()
const isRouterAlive = ref(true)
const stateMenu = useMenuTree()
console.log('stateMenu', stateMenu)
const collapse = ref<boolean>(false)

const asideWidth = ref('256px')
const menuMoveEnter = (e) => {
  // asideWidth.value = '256px'
  // collapse.value = true
  // store.setCollapse(collapse.value)
}

const menuMoveLeave = (e) => {
  // asideWidth.value = '56px'
  // collapse.value = false
  // store.setCollapse(collapse.value)
}
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}
provide('reload', reload)
</script>
<template>
  <div class="layout">
    <el-container class="container">
      <el-aside
        :class="[collapse && 'boxShadow', 'tree-el-aside']"
        @mouseenter.prevent="menuMoveEnter"
        @mouseleave.prevent="menuMoveLeave"
        :width="asideWidth"
      >
        <Menu :menuData="stateMenu.menuTree" :collapse="collapse" />
      </el-aside>
      <el-container class="main-container">
        <!-- <el-header><Header /></el-header> -->
        <el-main>
          <router-view v-slot="{ Component }" v-if="route.meta.keepAlive">
            <transition name="router-fade" mode="out-in">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
          <router-view v-else-if="isRouterAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<style lang="less" scoped>
html,
body,
#app {
  font-family: 'SourceHanSansCN-Regular';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  max-width: 1920px;
  /* width: auto; */
  height: 100%;
}
.app {
  width: 100%;
  height: 100%;
}
.layout {
  height: 100%;
  .el-container,
  .el-aside {
    height: 100%;
    box-sizing: border-box;
    box-shadow: unset;
    position: fixed;
  }
  .boxShadow {
    box-shadow: 0 0 20px 6px #2e2e2e52;
  }
  .el-header {
    height: 64px;
    padding: 0;
    border-bottom: 1px solid #d4d8e4;
  }
  :deep(.tree-el-aside) {
    transition: width 0.2s ease-in, box-shadow 0.2s;
    overflow: hidden;
    z-index: 99;
    position: fixed;
  }
  .el-main {
    background: #f8f8f8;
    padding: 0;
  }
}
.main-container {
  position: absolute;
  left: 56px;
  right: 0;
}
</style>
