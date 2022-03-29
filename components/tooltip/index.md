<style lang="scss">
.demo-tooltip {
  .mtd-tooltip + .mtd-tooltip {
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

    .left .mtd-tooltip-rel,
    .right .mtd-tooltip-rel {
      padding: 8px 10px;
    }
  }
}
</style>
# 文字提示 / Tooltip
用于缩略信息的完整展示，不承载复杂文本和操作，通过鼠标移入显示、移出消失的方式查看。

## 基础样式
:::include(src="./doc/base.vue")
:::

## 类型与用法
### 大小 <design-tag></design-tag>
:::include(src="./doc/size.vue")
:::

### 颜色 <design-tag></design-tag>
:::include(src="./doc/color.vue")
:::

### 位置 <design-tag></design-tag>
:::include(src="./doc/position.vue")
:::

## API
<api-doc name="Tooltip" :doc="require('./api.json')"></api-doc>
