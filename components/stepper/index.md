# 步骤条 / Stepper

用于展示多步任务，可根据实际应用场景设定步骤，步骤不得少于 2 步。

## 基础样式

:::include(src="./doc/base.vue")
:::

## 类型与用法

### 含状态步骤条

:::include(src="./doc/status.vue")
:::

### 有描述的步骤条

每个步骤有其对应的步骤状态描述。
:::include(src="./doc/desc.vue")
:::

### 自定义步骤条的间距

通过 space 自定义步骤条的间距。
:::include(src="./doc/space.vue")
:::

### 纵向步骤条

多适用于任务条数较多，状态流程较长，同时描述的信息较多等场景展示。
:::include(src="./doc/length-wise-direction.vue")
:::

## API

<api-doc name="Stepper" :doc="require('./api.json')"></api-doc>
<api-doc name="Step" :doc="require('./../step/api.json')"></api-doc>
