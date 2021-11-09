<style lang="scss">
  .demo-button{
    .wt-btn + .wt-btn{
      margin-left: 10px;
    }
  }
  
  .demo-btn-group {
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .wt-btn + .wt-btn{
      margin-left: 0px;
    }
  }
  

 
</style>

# Button / 按钮

按钮用于触发某一行为动作。按钮上显示的文案(button label)需和这一行为动作相一致。

## 基础样式

根据按钮的组成，分为文字按钮，图标文字按钮，图标按钮

:::include(src="./doc/base.vue")
:::

## 状态

:::include(src="./doc/status.vue")
:::

## 类型

根据按钮的类型，分为主按钮、次级按钮、三级按钮、幽灵按钮、虚线按钮、文字按钮、链接按钮、强调按钮组。

> 幽灵与次级按钮相似，区别：幽灵按钮背景色是透明，次级按钮背景色是白色。

> 链接和文字按钮很相似，链接按钮没有边距宽度。

:::include(src="./doc/types.vue")
:::

## 强调按钮

有不同的颜色来表示三种不同的强调含义。

:::include(src="./doc/emphasize.vue")
:::

## 按钮组合

一组相关联的操作聚合在一起成为按钮组，方便快捷操作。

:::include(src="./doc/group.vue")
:::

<!-- > 文字按钮的形式和链接的形式非常像但用法不同,请参考 [链接/Link <i class="wticon wticon-link-o"></i>](/components/link) -->

### 异步按钮

点击后按钮进入 loading 状态，当异步结束后恢复正常

:::include(src="./doc/async-loading.vue")
:::

## API

<api-doc name="Button" :doc="require('./api.json')"></api-doc>

## show all, for UI check

:::include(src="./doc/show.vue")
:::
