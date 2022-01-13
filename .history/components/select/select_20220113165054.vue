<template>
  <div class="wt-select">
    <div class="select" name="" id="" placeholder="选择国家" @click="showOptions">
      <div class="option" value="1">中国</div>
      <div class="option" value="2">美国</div>
      <div class="option" value="3">英国</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WtSelect',
  data() {
    return {
      showFlag: false,
    };
  },
  methods: {
    showOptions() {
      this.showFlag = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.select {
  position: relative;
  border: none;
  outline: none;
  appearance: none;
  width: 240px;
  height: 36px;
  background: #ffffff;
  border: 0.5px solid #bfcdd4;
  box-sizing: border-box;
  border-radius: 2px;
  .option {
    position: absolute;
    bottom: 0;
    left: 0;
    border: none;
    outline: none;
    appearance: none;
    background: #ffffff;
    width: 240px;
    height: 36px;
    padding: 8px 16px;
  }
}
</style>
