<template>
  <div>
    <wt-badge class="example-badge" :value="20">
      <span>Todo</span>
    </wt-badge>

    <span class="example-badge" style="display: inline-block;">
      <span>Todo</span>
      <wt-badge :value="12" />
    </span>

    <wt-badge class="example-badge" dot>
      <span>Todo</span>
    </wt-badge>

    <span class="example-badge" style="display: inline-block;">
      <span>Todo</span>
      <wt-badge dot />
    </span>
  </div>
</template>
