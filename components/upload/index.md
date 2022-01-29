# 上传 / Upload
通过选择和拖拽方式,将文件上传至服务端。

## 基础样式
通过 slot 你可以传入自定义的上传按钮类型和文字提示。可通过设置`before-remove`来阻止文件移除操作。
:::include(src="./doc/base.vue")
:::

## 类型与用法
### 类型
通过 slot 你可以传入自定义的上传按钮类型和文字提示。可通过设置`before-remove`来阻止文件移除操作。
:::include(src="./doc/type.vue")
:::

### 单一上传方式
历史上传的文件，会被最近一次上传的文件进行更替。
:::include(src="./doc/only-base.vue")
:::

### 用户头像上传
点击上传图像，图片回显，最近一次上传的图片将会替换历史图片。
:::include(src="./doc/only-img.vue")
:::

### 照片墙
使用 `list-type` 属性来设置文件列表的样式。
:::include(src="./doc/picture-list.vue")
:::

### 拖拽上传
把文件拖入指定区域，完成上传，同样支持点击上传。
:::include(src="./doc/drag.vue")
:::

### 手动上传
选择文件，通过手动触发上传按钮上传文件，适合批量上传文件。
:::include(src="./doc/hand.vue")
:::

## API
<api-doc name="Upload" :doc="require('./api.json')"></api-doc>
