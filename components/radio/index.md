<style lang="scss">
  .demo-input-container,.demo-input-group{
    display:flex;
    justify-content: center;
    margin-bottom:20px;
    &>div{
        margin-right:10px;
        &:last-child{
            margin-right:0;
        }
    }
  }
  .demo-input-group{
      justify-content: start;
  }
</style>

# 单选框 / Radio

用于多个选项（一般一组不超过 5 个）的选择输入，状态的切换。

基本使用，可自定义内置标题，占位符，图标，标签，提示和验证。

:::include(src="./doc/base-radio.vue")
:::
