<template>
  <div class="demo-circle">
    <wt-progress :percentage="75" type="circle" />
    <wt-progress :percentage="75" type="circle" text="自定义" />
    <wt-progress :percentage="100" type="circle" status="success" />
    <wt-progress :percentage="75" type="circle" status="error" />
  </div>
</template>
