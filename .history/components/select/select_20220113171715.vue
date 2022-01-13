<template>
  <div class="wt-select">
    <div class="select" name="" id="" placeholder="选择国家" @click="clickSelect">
      <div class="option-wrapper" v-if="showOption">
        <div class="option" value="1">中国</div>
        <div class="option" value="2">美国</div>
        <div class="option" value="3">英国</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'WtSelect',
  data() {
    return {
      showOption: false,
    };
  },
  methods: {
    clickSelect() {
      this.showOption = true;
    },
  },
};
</script>
<style lang="scss" scoped>
.wt-select {
  height: 400px;
}
.select {
  position: relative;
  width: 240px;
  height: 36px;
  background: #ffffff;
  border: 0.5px solid #bfcdd4;
  box-sizing: border-box;
  border-radius: 2px;
  .option-wrapper {
    position: relative;
    bottom: -40px;
    left: 0;
    width: 240px;
    box-shadow: 0px 3px 1px -2px rgba(25, 42, 50, 0.2), 0px 2px 2px rgba(25, 42, 50, 0.14),
      0px 1px 5px rgba(25, 42, 50, 0.12);
    border-radius: 2px;
    .option {
      background: #fff;
      color: #0e161c;
      width: 240px;
      height: 36px;
      padding: 8px 16px;
      &:hover {
        background: #e5ecff;
      }
    }
  }
}
</style>
