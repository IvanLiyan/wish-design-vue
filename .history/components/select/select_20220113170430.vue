<template>
  <div class="wt-select">
    <select class="select" name="" id="" placeholder="选择国家">
      <option class="option" value="1">中国</option>
      <option class="option" value="2">美国</option>
      <option class="option" value="3">英国</option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'WtSelect',
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
}
.option {
  border: none;
  outline: none;
  appearance: none;
  background: green;
  color: green;
  width: 240px;
  height: 36px;
  padding: 8px 16px;
  &:hover {
    background: green;
  }
}
</style>
