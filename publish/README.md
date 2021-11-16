# @wish/wt-vue

> 一套 Vue.js 的组件库. http://wt-vue.dev.bjs.i.wish.com/

## 1.0 计划

目前仍在规划中

## 支持环境

现代浏览器和 IE10 及以上（包含不限于：Chrome、Firefox、搜狗高速、QQ 浏览器、IE 11.0、IE 10.0）

## 安装

若没有公司镜像源需先执行 1、2 步，否则直接执行 3

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

## 示例

```
import Vue from 'vue'
import WT from '@wish/wt-vue'

Vue.use(WT)
```

引入样式

```
import '@wish/wt-vue/dist/wt-vue.min.css'
```
