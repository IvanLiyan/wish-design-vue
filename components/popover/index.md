<style lang="scss">
.demo-popover {
  .mtd-popover + .mtd-popover {
    margin-left: 15px;
  }
  .box {
    width: 500px;
    margin: 0 auto;
    .top {
      text-align: center;
    }

    .left {
      float: left;
      width: 60px;
    }

    .right {
      float: right;
      width: 60px;
    }

    .bottom {
      clear: both;
      text-align: center;
    }

    .item {
      margin: 4px;
      display: inline-block;
    }

    .left .mtd-popover-rel,
    .right .mtd-popover-rel {
      padding: 8px 10px;
    }
  }
}
.demo-popover-content{
  max-width: 160px;
}
</style>

# 弹出框 / Popover
用于鼠标点击或 hover 时，弹出的气泡式非模态浮层，在内容较少、操作较轻时使用。

## 基础样式
:::include(src="./doc/base.vue")
:::
> 如果承载的内容较多，操作较重时，建议使用 [对话框 /ModalDialog <i class="mtdicon mtdicon-link-o"></i>](/components/modal)

## 类型与用法
根据场景预留空间与信息重要程度，弹出框中文字大小分为：小号、默认
### 大小 <design-tag></design-tag>
:::include(src="./doc/size.vue")
:::

### 位置 <design-tag></design-tag>
:::include(src="./doc/position.vue")
:::

### 内容展示
弹出框可承载多种类型的内容
:::include(src="./doc/content.vue")
:::

## API
<api-doc name="Popover" :doc="require('./api.json')"></api-doc>
