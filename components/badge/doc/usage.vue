<template>
  <div>
    <wt-badge class="example-badge" :value="20">
      <span>待办事项</span>
    </wt-badge>

    <span class="example-badge" style="display: inline-block;">
      <span>待办事项</span>
      <wt-badge :value="12" />
    </span>

    <wt-badge class="example-badge" dot>
      <span>待办事项</span>
    </wt-badge>

    <span class="example-badge" style="display: inline-block;">
      <span>待办事项</span>
      <wt-badge dot />
    </span>
  </div>
</template>
