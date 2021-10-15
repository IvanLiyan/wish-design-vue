
# @wish/wd-vue
> 一套 Vue.js 的组件库. http://***/wd/vue/
## 1.0 计划
目前仍在规划中
## 支持环境
现代浏览器和 IE10 及以上
## 安装
```
若没有公司镜像源需先执行1、2步，否则直接执行3

1、安装nrm管理镜像源
npm i nrm -g

2、使用nrm添加公司的镜像源wnpm，切换至wnpm源并且登陆
nrm add wnpm http://npm.bjs.i.wish.com/
nrm use wnpm
nrm login     -用户名：admin  密码：admin123

3、安装组件库
npm i  @wish/wd-vue
```
## 示例
```
import Vue from 'vue'
import WD from '@wish/wd-vue'

Vue.use(WD)
```
引入样式
```
import '@wish/wd-vue/dist/wd-vue.min.css'
```
