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


## 脚本作用

0、npm run create ———— 初始化新组建需要创建和更新的文件（更新coponents.json、site/nav.config.json，types/wd-vue.d.ts，生成components下新组建的**.md,index.js、tests、**.vue、types下的*.d.ts、主题文件下的scss）

1、npm run clean ———— 删除 lib es dist test/**/coverage 文件

2、npm run build:srcIndex ———— 生成src入口文件index.js
3、npm run build:themeIndex ———— 生成components下主题(theme-chalk、theme2)的index.scss
4、npm run build:typesIndex ———— 生成types下的wd-vue.d.ts文件

5、npm run build:component ———— 生成publish/lib下组件对应js文件
6、npm run build:index ———— 将src中的index生成publish/lib下index.js文件
7、npm run build:utils ———— 将src中除了index.js的文件夹拷贝到publish/lib下
8、npm run build:style ———— 将components下主题文件编译成css文件，并输出到lib的publish/lib/style下生成对应的主题文件(theme-chalk、theme2),并输出dist下的wd-vue.min.css

9、npm run build:es ———— 将component和src下的相关主要文件编译后生成到publish/es文件目录下
10、npm run copy:types ———— 将types下所有的d.ts文件拷贝到publish/types下
11、npm run build:distIndex ———— 将src中的index文件构建压缩生成dis下的index.min.js文件(vue-loader编译过的，未压缩)

12、npm run release ———— 改变发布版本号，然后publish发布到对应npm

13、npm run start ———— 本地启动组件web服务

14、npm run build:deploy ———— 0 操作后，构建部署服务（用于生产）













