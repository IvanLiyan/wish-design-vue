<template>
  <div>
    <span class="example-badge">
      design v0.2
      <wt-badge dot class="badge-dot-center badge" />
    </span>

    <wt-badge dot class="example-badge">
      <i class="wticon wticon-bell-o" style="font-size: 34px;color: #808AB1;"></i>
    </wt-badge>

    <wt-badge style="padding: 2px;" value="new" class="example-badge">
      <div>系统通知</div>
    </wt-badge>

    <wt-badge style="padding: 2px;" value="hot" class="example-badge">
      <div>系统通知</div>
    </wt-badge>
  </div>
</template>
<style lang="scss">
  .example-badge {
    margin-right: 80px;
    vertical-align: middle;
  }
</style>
