# @ContextLogic/wt-vue

## 全局安装 babel-cli、webpack、webpack-cli

## Dev

### Suggestion Dev Env
- node.js: v16.17.0
- npm: 8.15.0

### Dev Steps

```bash
npm run node-i # 安装项目依赖
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

#### If you get an error about `FsEvents` after running `npm start`, please run `npm install watchman`

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

## 版本记录

#### 0.0.2-alpha.41
·修复了Tab组件的bug
·新增了Datepicker的API - value-format

#### 0.0.2-alpha.42
·新增了Table的demo - 自定义单元格 CustomCell

#### 0.0.2-alpha.43
·Pagination组件集成进Table组件 - 可通过API实现使用Table组件内的分页

#### 0.0.2-alpha.45
·Table组件内置Pagination位置设为text-right

#### 0.0.2-alpha.47
·Layout 组件去除API —— direction
·Menu 翻译
·Stepper 翻译
·Dialog 翻译

#### 0.0.2-alpha.49
·更新了Sidebar的UI

#### 0.0.2-alpha.50
·修复了`<select />`的双层边框bug
·修复了`<timeline />`圆点的位置
·校准了`<timeline />`在normal状态下的圆点颜色

#### 0.0.2-alpha.51
·修复了`<wt-table />`内置pagination的api缺失问题
