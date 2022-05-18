<style lang='scss'>
  .demo-dialog-btn-groups{
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
</style>

# Dialog / 对话框

用于打断用户操作的信息提示/输入

## 基础样式

按照结构分为图标层，标题层，内容层，和操作层

:::include(src="./doc/base.vue")
:::

## 类型与用法

### 结果提示

用于必须打断用户操作的重要提醒，可以是成功或是失败、警告等
:::include(src="./doc/type.vue")
:::

### 异步关闭

当按钮触发的操作需要和后端进行校验时会出现 loading 状态
:::include(src="./doc/async-close.vue")
:::

### 自定义内容

可以嵌入自定义内容
:::include(src="./doc/custom.vue")
:::

## API

<api-doc name="Dialog" :doc="require('./api.json')"></api-doc>
<api-doc name="Confirm" :doc="require('../confirm/api.json')"></api-doc>
