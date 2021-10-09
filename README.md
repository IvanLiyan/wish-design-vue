# vue-component
vue、component

babel-cli、webpack、webpack-cli -g


# 脚本作用

0、npm run clean ———— 删除 lib es dist test/**/coverage 文件

1、npm run build:file ———— 生成src入口文件index.js

2、npm run build:component ———— 生成lib下对应组件js文件

3、npm run build:common ———— 生成lib下**.common.js文件

4、npm run build:utils ———— 将src中除了index.js的文件夹拷贝到lib下

5、npm run build:index ———— 将src中的index文件构建压缩生成lib下的index.js文件

6、npm run build:es ———— 将component和src下的相关主要文件编译后生成到es文件目录下

7、npm run build:css ———— 生成components下主题(theme-chalk、theme2)的index.scss

8、npm run build:theme ———— 将components下主题文件编译成css文件，并输出到lib下生成对应的主题文件(theme-chalk、theme2)

9、npm run build:types ———— 生成types下的**.d.ts文件

10、npm run copy:types ———— 将types下所有的d.ts文件拷贝到lib下

11、npm run release ———— 改变发布版本号，然后publish发布到对应npm

12、npm run start ———— 本地启动组件web服务

11、npm run build:deploy ———— 0 操作后，构建部署服务（用于生产）













