<template>
  <div style="width: 200px; text-align: left">
    <div style="height: 350px">
      <wt-stepper :active="1" direction="vertical" :space="100">
        <wt-step title="步骤 1" description="这是描述这是描述这是描述这是描述这是描述这是描述这是描述" />
        <wt-step title="步骤 2" description="这是描述这是描述这是描述这是描述这是描述这是描述这是描述" />
        <wt-step title="步骤 3" description="这是描述这是描述这是描述这是描述这是描述这是描述这是描述" />
      </wt-stepper>
    </div>
  </div>
</template>
