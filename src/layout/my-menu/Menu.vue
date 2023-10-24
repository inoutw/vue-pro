<script lang="ts" setup>
import { ref, computed, unref, useAttrs } from 'vue'
import MenuItem from './MenuItem.vue'
import { useRouter } from 'vue-router'

const { currentRoute } = useRouter()

const attrs = useAttrs()

const activeMenu = computed(() => {
  const { path } = unref(currentRoute)
  return path
})

defineProps({
  menuData: Array,
  collapse: {
    type: Boolean,
    default: false
  }
})
</script>
<template>
  <div class="left-bar">
    <div :class="['logo', collapse && 'logo-collapse']">
      <!-- <template v-if="collapse">
        <div class="logo-box"></div>
        <div class="logo-text"></div>
      </template> -->
      <div class="logo-box1"></div>
      <div class="logo-text">Vue Demostration</div>
    </div>
    <div class="menu-list">
      <div class="top-menu"><MenuItem :menuData="menuData" :activeMenu="activeMenu" :collapse="collapse" /></div>
      <el-divider />
      <div class="bottom-menu"><MenuItem :menuData="bottomMenu" :activeMenu="activeMenu" :collapse="collapse" /></div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.left-bar {
  height: 100%;
  background: #fff;
  box-shadow: 0 0 60px 10px #00000052;
  .el-divider--horizontal {
    border-top-color: #ccc;
    margin: 10px 0;
  }

  .logo {
    height: 64px;
    width: 256px;
    display: flex;
    align-items: center;
    .logo-box {
      width: 46px;
      height: 46px;
      margin: 2px 8px 0 20px;
      background: url('@assets/images/logo/logo.png') no-repeat center/contain;
    }
    .logo-text {
      width: 100%;
      height: 22px;
      font-size: 16px;
      font-weight: 600;
      background: url('@assets/images/logo/text-logo.png') no-repeat center/contain;
    }
    .logo-box1 {
      // margin: 0 16px 0 14px;
      width: 0px;
      height: 30px;

      background: url('@assets/images/logo/mini-logo.png') no-repeat center/contain;
    }
  }
  .menu-list {
    padding: 0 8px;
    height: calc(100% - 64px);
    display: flex;
    flex-direction: column;
    .top-menu {
      flex-basis: 90%;
    }
    .bottom-menu {
      flex-basis: 10%;
    }
  }
}
</style>
