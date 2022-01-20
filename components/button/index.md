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
  .demo-container{
    display:flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
    &>*{
        margin-right: 30px;
        &:last-child{
            margin-right:0;
        }
    }
  }
  
</style>

# Button / 按钮

<span>{{$t('button.componnent_desc')}}</span>

## <span>{{$t('button.module1.title')}}</span>

<span>{{$t('button.module1.desc1')}}</span>

:::include(src="./doc/base.vue")
:::

## <span>{{$t('button.module2.title')}}</span>

<span>{{$t('button.module2.desc1')}}</span>

:::include(src="./doc/status.vue")
:::

## <span>{{$t('button.module3.title')}}</span>

<span>{{$t('button.module3.desc1')}}</span>

> <p>{{$t('button.module3.desc2')}}</p>

> <p>{{$t('button.module3.desc3')}}</p>

:::include(src="./doc/types.vue")
:::

## <span>{{$t('button.module4.title')}}</span>

<span>{{$t('button.module4.desc1')}}</span>

:::include(src="./doc/emphasize.vue")
:::

## <span>{{$t('button.module5.title')}}</span>

<span>{{$t('button.module5.desc1')}}</span>

:::include(src="./doc/group.vue")
:::

<!-- > 文字按钮的形式和链接的形式非常像但用法不同,请参考 [链接/Link <i class="wticon wticon-link-o"></i>](/components/link) -->

### <span>{{$t('button.module6.title')}}</span>

<span>{{$t('button.module6.desc1')}}</span>

:::include(src="./doc/async-loading.vue")
:::

## API

<api-doc name="Button" :doc="require('./api.json')"></api-doc>
