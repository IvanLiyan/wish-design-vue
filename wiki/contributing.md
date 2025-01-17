# 贡献指南

内网 [仓库地址](http://git.sankuai.com/v1/bj/projects/ss/repos/wt-vue/browse)

## Pull Request 规范

- fork 一份到自己的项目下，不要直接在仓库下建分支
- PR 信息以  [组件名]: [描述信息]  的形式填写，例如 Button: fix xxx bug。
- 编写组件前请先同至少两名维护成员沟通组件属性，确定属性后请先将确定的属性写入  index.md  后编写单元测试 （具体开发流程见下文）
- 如果是修复 bug 请在 commit 中给出描述信息 或 issue 地址
- 确保所有的测试都是通过的 npm run test
- 确保你的代码跑过 lint 检查 npm run lint ( lint 会在 git commit 时自动运行 )
- 合并代码必须要经过  review

## 分支管理

- 推荐使用以下命名来管理分支：
- 功能开发以 `feature/功能名` 命名
- 组件开发以 `components/组件名` 命名
- 修复 bug 以 `bugfix/bug(bugId或简短名)` 命名
- 紧急修复以 `hotfix/bug` 命名。

## 开发环境依赖

node 8+, npm 5+, 由于使用 package-lock.json 请使用 `npm install` 或者 `mnpm install` 安装依赖
查看 demo

```
npm start
```

打包代码

```
npm run build
```

## 组件开发

使用命令快速创建组件 ( 执行前请先进行 `npm install` )

```
npm run create <componentName> [chineseName]
```

## 组件开发流程

- 确定属性拆分，各组件的作用
- 确定组件属性、事件、插槽等
- 编写 demo 文档，文档应该包含: 设计场景实现的伪代码、相关组件属性、事件、插槽的定义，至少 2 名维护人员共同 review 文档， review 应该关注以下几点：
  - 场景用例是不是典型，是否覆盖到设计稿中的所有场景
  - 场景实现是不是合理
  - 属性、事件定义是不是合理，能不能清楚的描述出属性的作用
  - 与其他组件库不同的点，说明不同的原因
- 编写单元测试（先编写测试用例 review，后完善具体测试）并提交到各自仓库，相关人员 review 单元测试，review 应该关注以下几点：
  - 测试用例完整性，是否覆盖住所有对外属性
  - 测试用例的合理性，是否有漏掉某些属性场景
  - 测试用例的正确性，是否能够通过对比得出验证测试用例正确
- 开发编写 组件功能 + 样式
  - 提交组件 PR 到 develop，提交信息命名以 [组件名]: [描述信息/功能] 的形式填写
- 设计 review 交互、功能样式，开发人员 review 代码质量，通过后合并
