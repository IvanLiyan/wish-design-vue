### 脚本作用

0、npm run clean ———— 初始化创建组件（更新 coponents.json、site/nav.config.json，types/wt-vue.d.ts，生成 components 下新组建的**.md,index.js、tests、**.vue、types 下的\*.d.ts、主题文件下的 scss）

1、npm run clean ———— 删除 lib es dist test/\*\*/coverage 文件

2、npm run build:srcIndex ———— 生成 src 入口文件 index.js

3、npm run build:themeIndex ———— 生成 components 下主题(theme)的 index.scss

4、npm run build:typesIndex ———— 生成 types 下的 wt-vue.d.ts 文件

5、npm run build:component ———— 生成 publish/lib 下组件对应 js 文件

6、npm run build:index ———— 将 src 中的 index 生成 publish/lib 下 index.js 文件

7、npm run build:utils ———— 将 src 中除了 index.js 的文件夹拷贝到 publish/lib 下

8、npm run build:style ———— 将 components 下主题文件编译成 css 文件，并输出到 lib 的 publish/lib/style 下生成对应的主题文件(theme),并输出 dist 下的 wt-vue.min.css

9、npm run build:es ———— 将 component 和 src 下的相关主要文件编译后生成到 publish/es 文件目录下

10、npm run copy:types ———— 将 types 下所有的 d.ts 文件拷贝到 publish/types 下

11、npm run build:distIndex ———— 将 src 中的 index 文件构建压缩生成 dis 下的 index.min.js 文件(vue-loader 编译过的，未压缩)

12、npm run release ———— 改变发布版本号，然后 publish 发布到对应 npm

13、npm run start ———— 本地启动组件 web 服务

14、npm run build:deploy ———— 0 操作后，构建部署服务（用于生产）

本地镜像模拟：docker build . --file ./docker/Dockerfile

"build": "cross-env NODE_ENV=production npm run build:all",
