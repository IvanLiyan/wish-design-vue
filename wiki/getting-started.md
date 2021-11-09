# 如何使用

## NPM 安装

#### 若没有公司镜像源需先执行 1、2 步，否则直接执行 3

1、安装 nrm 管理镜像源

```
npm i nrm -g
```

2、使用 nrm 添加公司的镜像源 wnpm，切换至 wnpm 源并且登陆

```
nrm add wnpm http://npm.bjs.i.wish.com/
nrm use wnpm
nrm login     -用户名：admin  密码：admin123
```

3、安装组件库

```
npm i  @wish/wt-vue
```

## 使用

1、引入 默认主题 样式

```
import '@wish/wt-vue/dist/wt-vue.min.css'
```

2、引入组件库

```
import Vue from 'vue'
import WT from '@wish/wt-vue'

Vue.use(WT)
```

3、使用组件

```
<wt-button>基础按钮</wt-button>
```
