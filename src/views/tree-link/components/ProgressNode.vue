<template>
    <div class="nodeElement">
      <el-image :src="url" class="icon"></el-image>
      <div class="notation">
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </template>
   
  <script>
  export default {
    name: "Node",
    inject: ["getGraph", "getNode"],
    props: {
      // item: {},
    },
    data() {
      return {
        item: {},
        url: require("../../assets/vue.svg"),
      };
    },
    mounted() {
      const node = this.getNode();
      const { item } = node.getData();
      this.item = item;
      // 监听数据改变事件
      node.on("change:data", ({ current }) => {
        console.log("----,", current);
      });
    },
    methods: {},
  };
  </script>
  <style lang="less" scoped>
  .nodeElement {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 200px;
    height: 32px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.08);
    .icon {
      display: inline-flex;
      flex-grow: 0;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      background-color: rgba(229, 238, 255, 0.85);
      border-radius: 4px 0 0 4px;
    }
    .notation {
      display: inline-flex;
      align-items: center;
      width: 166px;
      padding: 0 9px;
      user-select: none;
   
      & > * {
        flex-grow: 1;
      }
   
      .name {
        overflow-x: hidden;
        color: rgba(0, 0, 0, 0.65);
        font-size: 12px;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: middle;
      }
   
      .statusIcon {
        display: inline-flex;
        flex-grow: 0;
        align-items: center;
        font-size: 14px;
        transform: translateZ(0);
      }
    }
  }
  </style>