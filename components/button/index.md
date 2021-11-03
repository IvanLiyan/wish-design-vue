<style lang="scss">
  .demo-button{
    .wd-btn + .wd-btn{
      margin-left: 10px;
    }
  }
  
  .demo-btn-group {
    .wd-btn + .wd-btn{
      margin-left: 0px;
    }
  }
 
</style>

# Button / 按钮

按钮用于触发某一行为动作。
按钮上显示的文案(button label)需和这一行为动作相一致。

## 基础样式

:::include(src="./doc/base.vue")
:::

## 状态

:::include(src="./doc/status.vue")
:::

## 类型与用法

——幽灵与次级按钮相似，区别：幽灵按钮背景色是透明，次级按钮背景色是白色。

:::include(src="./doc/types.vue")
:::

## 强调按钮

:::include(src="./doc/emphasize.vue")
:::

## 按钮组合

一组相关联的操作聚合在一起成为按钮组，方便快捷操作。

:::include(src="./doc/group.vue")
:::

<!-- > 文字按钮的形式和链接的形式非常像但用法不同,请参考 [链接/Link <i class="wdicon wdicon-link-o"></i>](/components/link) -->

### 异步按钮

点击后按钮进入 loading 状态，当异步结束后恢复正常
:::include(src="./doc/async-loading.vue")
:::

## API

<api-doc name="Button" :doc="require('./api.json')"></api-doc>

## show all, for UI check

:::include(src="./doc/show.vue")
:::
