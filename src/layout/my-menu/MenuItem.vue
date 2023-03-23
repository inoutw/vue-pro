<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const $router = useRouter()

const props = defineProps({
  menuData: {
    type: Array as any
  },
  collapse: {
    type: Boolean,
    default: false
  },
  activeMenu: {
    type: String,
    default: ''
  }
})

watch(
  () => props.activeMenu,
  (val) => {},
  {
    immediate: true
  }
)

// const activeMenu = ref('')

const selectMenuItem = (menu) => {
  /* if (menu?.children?.length) {
    activeMenu.value = menu.path
  } else {
    let findMenu = props.menuData.find((v) => {
      if (v.children) {
        return v.children.some((s) => {
          return s.path === menu.path
        })
      }
      return false
    })
  } */
  $router.push(menu)
}
</script>
<template>
  <ul class="menu">
    <template v-for="menu in menuData" :key="menu.path">
      <el-popover
        popper-class="menuPopover"
        placement="bottom-start"
        :width="238"
        trigger="click"
        :offset="5"
        v-if="!menu.meta?.hidden && menu?.children?.length"
      >
        <template #reference>
          <li :class="['menu-item', activeMenu === menu.path && 'is-active', !collapse && 'collapse']" @click="selectMenuItem(menu)">
            <div class="left-content">
              <div class="menuIcon">
                <component class="menuIcon" v-if="menu.meta?.icon" :is="menu.meta?.icon"></component>
              </div>
              <span :class="['text', collapse && 'showText']">{{ menu.meta?.title }}</span>
            </div>
            <div class="right-content" v-if="collapse">
              <el-icon><ArrowRight /></el-icon>
            </div>
          </li>
        </template>
        <li
          :class="['menu-item', activeMenu === childMenu.path && 'is-active', !collapse && 'collapse']"
          v-for="childMenu in menu.children"
          :key="childMenu.path"
          @click="selectMenuItem(childMenu)"
        >
          <div class="left-content">
            <div class="menuIcon">
              <component class="menuIcon" v-if="childMenu.meta?.icon" :is="childMenu.meta?.icon"></component>
            </div>
            <span style="opacity: 1; font-size: 14px" :class="['text']">{{ childMenu.meta?.title }}</span>
          </div>
        </li>
      </el-popover>

      <li
        :class="['menu-item', activeMenu === menu.path && 'is-active', !collapse && 'collapse']"
        v-if="!menu.meta?.hidden && !menu?.children?.length"
        @click="selectMenuItem(menu)"
      >
        <div class="left-content">
          <div class="menuIcon">
            <component class="menuIcon" v-if="menu.meta?.icon" :is="menu.meta?.icon"></component>
          </div>
          <span :class="['text', collapse && 'showText']">{{ menu.meta?.title }}</span>
        </div>
      </li>
    </template>
  </ul>
</template>
<style lang="less" scoped>
.menu {
  font-size: 16px;
  overflow: hidden;

  &-item {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    box-sizing: border-box;
    cursor: pointer;
    .left-content {
      display: flex;
      align-items: center;
      .menuIcon {
        color: #ccc;
        width: 22px;
        height: 22px;
      }
      .text {
        color: #000;
        margin-left: 20px;
        opacity: 1;
        white-space: nowrap;
        transition: opacity 0.2s linear;
      }
      .showText {
        opacity: 1;
      }
    }

    .el-icon {
      color: #ccc;
    }
  }
  .collapse {
    // justify-content: center;
  }
  &-item:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
  .is-active {
    color: #fff;
    border-radius: 4px;
    background-color: #00000033;
    .el-icon {
      color: #fff;
    }
  }
}
</style>
