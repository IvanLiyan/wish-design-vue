<template>
  <div>
    <wt-button type="text" class="example-badge">
      <wt-badge slot="icon" dot>
        <i class="wticon wticon-theme"></i>
      </wt-badge>
      主题
    </wt-button>

    <wt-badge value="12" class="example-badge">
      <wt-button icon="wticon wticon-cart-o">
        购物车
      </wt-button>
    </wt-badge>
  </div>
</template>

<style lang="scss">
  .example-badge {
    margin-right: 80px;
    vertical-align: middle;
  }
</style>
