# @wish/wd-vue

## 全局安装 babel-cli、webpack、webpack-cli

## 开发

### 开发步骤

需要 Node.js 版本大于 8+,并有全局装有 NPM。
在 clone 完仓库后，运行

```bash
npm # 安装项目依赖
```

#### 常用 NPM Script 命令

```bash
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

todo: Icon 自定义组件集成支持 ,待 UI 提供设计 icon

todo 未支持按需加载，若支持需要 lib 里面以组件文件夹形式存放组件相关内容
// rate、transfer、autocomplete、color-picker、picker、popconfirm、anchor、affix、config-provider

// announcement-alert
