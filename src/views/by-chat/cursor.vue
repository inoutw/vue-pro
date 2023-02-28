<script>
export default {
  mounted() {
    // 注册文本元素的mousedown事件
    this.$refs.text.on('mousedown', () => {
      // 设置文本元素的焦点状态
      this.$refs.text.focus();
      // 更新光标位置
      this.updateCursor();
    });

    // 注册舞台的mousemove事件
    this.$refs.stage.$node.on('mousemove', () => {
      // 更新光标位置
      this.updateCursor();
    });
  },
  methods: {
    // 更新光标位置
    updateCursor() {
      const textNode = this.$refs.text.$node;
      const cursorNode = this.$refs.cursor.$node;
      const pos = textNode.getAbsolutePosition();

      // 计算光标位置
      const cursorPos = {
        x: pos.x + textNode.getComputedTextLength(),
        y: pos.y
      };

      // 更新光标位置
      cursorNode.position(cursorPos);
      this.$refs.layer.$node.batchDraw();
    }
  }
}

</script>
<template>
    <div>
      <stage ref="stage">
        <layer>
          <text ref="text" text="Hello, World!" x="50" y="50" fontSize="20" fontFamily="Arial" fill="black"></text>
          <rect ref="cursor" x="50" y="50" width="2" height="20" fill="black"></rect>
        </layer>
      </stage>
    </div>
  </template>
  
<style></style>