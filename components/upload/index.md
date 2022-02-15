# Upload / 上传
<span>{{$t('upload.componnent_desc')}}</span>

## <span>{{$t('upload.module1.title')}}</span>
:::include(src="./doc/base.vue")
:::

## <span>{{$t('upload.module2.title')}}</span>
:::include(src="./doc/file.vue")
:::

## <span>{{$t('upload.module3.title')}}</span>
:::include(src="./doc/picture.vue")
:::

## API
<api-doc name="Upload" :doc="require('./api.json')"></api-doc>
