<template>
  <div>
    <wt-badge style="padding: 2px;" :value="8" class="example-badge">
      <span>系统通知</span>
    </wt-badge>
    <wt-badge style="padding: 2px;" :value="100" class="example-badge" :max="99">
      <span>系统通知</span>
    </wt-badge>
    <wt-badge :value="12" class="example-badge">
      <i class="wticon wticon-bell-o" style="font-size: 34px;color: #808AB1;"></i>
    </wt-badge>
    <wt-badge :value="100" class="example-badge" :max="99">
      <i class="wticon wticon-bell-o" style="font-size: 34px;color: #808AB1;"></i>
    </wt-badge>
  </div>
</template>
<style lang="scss">
  .example-badge {
    margin-right: 80px;
    vertical-align: middle;
  }
</style>
