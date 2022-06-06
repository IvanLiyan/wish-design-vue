<template>
  <div>
    <wt-badge style="padding: 2px;" :value="12" class="example-badge">
      <span>系统通知</span>
    </wt-badge>

    <span class="example-badge" style="display: inline-block;">
    <span style="display: inline-block;padding: 2px;vertical-align: middle;">系统通知</span>
    <wt-badge :value="12" style="vertical-align: middle; line-height: 1;" />
  </span>

    <wt-badge :value="12" class="example-badge">
      <i class="wticon wticon-bell-o" style="font-size: 34px;color: #808AB1;"></i>
    </wt-badge>

    <span style="display: inline-block;">
    <span style="display: inline-block;vertical-align: middle;">
      <i class="wticon wticon-bell-o" style="font-size: 34px;color: #808AB1;"></i>
    </span>
    <wt-badge :value="12" style="vertical-align: middle;" />
  </span>
  </div>
</template>
<style lang="scss">
  .example-badge {
    margin-right: 80px;
    vertical-align: middle;
  }
</style>
