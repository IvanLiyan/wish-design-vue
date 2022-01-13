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
select,
option {
  /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
  border: none;
  outline: none;
  /*很关键：将默认的select选择框样式清除*/
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  /*将背景改为红色*/
  background: #fff;
  /*加padding防止文字覆盖*/
  padding-right: 0.14rem;
}
/*清除ie的默认选择框样式清除，隐藏下拉箭头*/
select::-ms-expand {
  display: none;
}
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
