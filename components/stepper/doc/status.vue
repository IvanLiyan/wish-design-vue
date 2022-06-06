<template>
  <div>
    <wt-stepper :active="1">
      <wt-step title="已完成" />
      <wt-step status="cancel" title="撤销" />
      <wt-step title="步骤 3" />
    </wt-stepper>
    <br />
    <wt-stepper :active="1">
      <wt-step title="已完成" />
      <wt-step status="error" title="失败" />
      <wt-step title="步骤 3" />
    </wt-stepper>
  </div>
</template>
