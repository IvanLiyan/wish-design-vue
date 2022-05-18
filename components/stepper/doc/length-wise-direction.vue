<template>
  <div style="height: 700px; width: 200px; text-align: left">
    <div style="height: 350px">
      <p>1、带任务状态纵向流程；</p>
      <wt-stepper :active="1" direction="vertical" :space="100">
        <wt-step title="步骤 1" description="这是描述这是描述这是描述这是描述这是描述这是描述这是描述" />
        <wt-step title="步骤 2" description="这是描述这是描述这是描述这是描述这是描述这是描述这是描述" />
        <wt-step title="步骤 3" description="这是描述这是描述这是描述这是描述这是描述这是描述这是描述" />
      </wt-stepper>
    </div>
    <div style="height: 350px">
      <p>2、无状态纵向多条步骤条；</p>
      <wt-stepper :active="1" direction="vertical" :space="100" dot>
        <wt-step title="步骤 1" description="这是描述这是描述这是描述这是描述这是描述这是描述这是描述" />
        <wt-step title="步骤 2" description="这是描述这是描述这是描述这是描述这是描述这是描述这是描述" />
        <wt-step title="步骤 3" description="这是描述这是描述这是描述这是描述这是描述这是描述这是描述" />
      </wt-stepper>
    </div>
    <!-- <div style="height: 350px;">
      <p>2、无状态纵向多条步骤条；</p>
      <wt-stepper :active="1" direction="vertical" :space="100" dot size="small">
        <wt-step
          title="步骤1111111"
          description="这是描述这是描述这是描述这是描述这是描述这是描述这是描述"></wt-step>
        <wt-step
          title="步骤 2"
          description="这是描述这是描述这是描述这是描述这是描述这是描述这是描述"></wt-step>
        <wt-step
          title="步骤 3"
          description="这是描述这是描述这是描述这是描述这是描述这是描述这是描述"></wt-step>
      </wt-stepper>
    </div> -->
  </div>
</template>
