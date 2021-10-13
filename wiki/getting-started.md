# 如何使用
## NPM 安装
使用 mnpm 的方式安装。
```
mnpm i @wish/wd-vue
```

在项目代码中引入组件并使用 WDUI 2.0 样式
```
// 引入 WDUI 2.0 样式
import '@wish/wd-vue/lib/theme2/index.css'

// 引入组件库
import Vue from 'vue'
import WD from '@wish/wd-vue'

Vue.use(WD)

// or
import '@wish/wd-vue/lib/theme2/button.css'
import Button from '@wish/wd-vue/lib/button.js'
Vue.component(Button.name, Button)
```


在项目代码中引入组件并使用 WDUI 1.0 样式，只需要将上文的 `theme2` 更改为 `theme-chalk`。
```
// 引入 WDUI 1.0 样式
import '@wish/wd-vue/lib/theme-chalk/index.css'

// 引入组件库
import Vue from 'vue'
import WD from '@wish/wd-vue'

Vue.use(WD)

// or
import '@wish/wd-vue/lib/theme-chalk/button.css'
import Button from '@wish/wd-vue/lib/button.js'
Vue.component(Button.name, Button)
```
## CDN
目前已接入 [BURST](https://static.sankuai.com/public) 系统，可通过以下地址引入
```
<!-- 引入 theme2 样式 -->
<link rel="stylesheet" href="https://static.meituan.net/bs/@wish/wd-vue/latest/theme2/index.css">
<!-- 引入组件库 -->
<script src="https://static.meituan.net/bs/@wish/wd-vue/latest/index.js"></script>
```
也可将路径中的 `latest` 改为具体的版本号，如: `0.3.8` 来锁定版本，避免将来 wd-vue  升级时受到非兼容性更新的影响。

**注：需要通过 CDN 的方式将 Vue 提前引入**

## 开发调试
启动调试，访问 [localhost:8081](http://localhost:8081) 查看效果
```
npm start
```
启动单元测试，查看单元测试结果
```
npm run unit
// or
npm run unit:watch
```
## 构建部署
```
npm run build
```
编译后文件会放在`lib`文件夹中

## 按需加载
**注意，按需加载时样式文件会存在重复的样式，可使用 cssmin 来消除重复**

你可以手动通过以下写法来实现按需加载
```
import '@wish/wd-vue/lib/theme2/button.css'
import Button from '@wish/wd-vue/lib/button.js'
```
如果使用`babel`,也可以通过 [babel-plugin-component](https://github.com/ElementUI/babel-plugin-component) 插件来实现按需加载
在 `.babelrc` 中加入这个插件
```
{
  "plugins": [
    [
      "component",
      {
        "libraryName": "@wish/wd-vue",
        "styleLibraryName": "theme2"
      }
    ]
  ]
}
```
之后你仍可以这样写，达到按需加载
```
import { Button } from '@wish/wd-vue'
```

## 兼容性
现代浏览器及 IE 10+。

对于 IE 系列浏览器，需要提供相应的 Polyfill 支持，建议使用 [babel-preset-env](https://babeljs.io/docs/en/babel-polyfill) 来解决浏览器兼容问题。
