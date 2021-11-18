<style lang="scss">
  .demo-radio-container,.demo-input-group{
    display:flex;
    justify-content: center;
    margin-bottom:20px;
    label{
        margin-right:10px;
        &:last-child{
            margin-right:0;
        }
    }
  }
 
</style>

# 单选框 / Radio

用于多个选项（一般一组不超过 5 个）的选择输入，状态的切换。

:::include(src="./doc/status-radio.vue")
:::

:::include(src="./doc/horizontal-radio.vue")
:::

:::include(src="./doc/vertical-radio.vue")
:::

### show all for qa test

:::include(src="./doc/show.vue")
:::

## API

<api-doc name="Radio" :doc="require('./api.json')"></api-doc>

<api-doc name="RadioGroup" :doc="require('../radio-group/api.json')"></api-doc>
