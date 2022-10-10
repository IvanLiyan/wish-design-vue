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
.tooltip-wrapper {
  display: flex;
  justify-content: space-around;
}
.tooltip-align-wrapper {
  display: flex;
  flex-direction: column;
}
.tooltip-align-wrapper span {
  margin: 10px 0;
}
.flex-line {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
</style>
# 文字提示 / Tooltip
<span>{{ $t('tooltip.component_desc')}}</span>

## <span>{{ $t('tooltip.module1.title1')}}</span>
:::include(src="./doc/base.vue")
:::

## <span>{{ $t('tooltip.module2.title1')}}</span>
#### <span>{{ $t('tooltip.module2.subtitle1')}}</span>
:::include(src="./doc/position.vue")
:::

#### <span>{{ $t('tooltip.module2.subtitle2')}}</span>
:::include(src="./doc/custom.vue")
:::

## API
<api-doc name="Tooltip" :doc="require('./api.json')"></api-doc>

<!-- ## Test
:::include(src="./doc/test.vue")
::: -->
