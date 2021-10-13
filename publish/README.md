
# @wish/wd-vue
> 一套 Vue.js 的组件库. http://***/wd/vue/
## 1.0 计划
目前仍在规划中
## 支持环境
现代浏览器和 IE10 及以上
## 安装
```
npm i  @wish/wd-vue
```
## 示例
```
import Vue from 'vue'
import MTD from '@wish/wd-vue'

Vue.use(MTD)
```
引入样式
```
import '@wish/wd-vue/lib/theme2/index.css'
```

## 开发

### 开发步骤
需要 Node.js 版本大于 8+,并有全局装有 NPM。
在 clone 完仓库后，运行
```bash
npm # 安装项目依赖
```
#### 常用 NPM Script 命令
``` bash
# 启动 dev 环境服务
npm start

# 构建完整组件库
npm run build

# 运行单元测试
npm run unit

# 以 watch 方式运行单元测试
npm run unit:watch

# 语法检查
npm run lint

# 创建新的组件
npm run create <componentName> [chineseName]
```
其他 script 命令可查看 package.json 中 scripts 内容。

#### 目录结构
```
├── build # 编译配置及脚本
├── config # 项目配置
├── site # demo 项目
├── components # 组件源码
├── src # 公共模块源码
├── test # 测试相关配置及结果
├── components.json # 组件定义
├── types # ts 类型定义
└── package.json
```
