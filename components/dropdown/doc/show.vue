<template>
  <div>
    <h4>default</h4>
    <div class="demo-container">
      <wt-dropdown trigger="click" placement="right">
        <wt-button type="text">
          <span style="margin-right: 4px">hover</span>
        </wt-button>
        <wt-dropdown-menu slot="dropdown">
          <wt-dropdown-menu-item>网络</wt-dropdown-menu-item>
          <wt-dropdown-menu-item>存储</wt-dropdown-menu-item>
          <wt-dropdown-menu-item>数据库</wt-dropdown-menu-item>
          <wt-dropdown-menu-item disabled>计算</wt-dropdown-menu-item>
        </wt-dropdown-menu>
      </wt-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // value1: true,
      // value2: false,
    };
  },
  methods: {
    handleClick: function (e) {
      console.log('handleClick', e);
    },
    handleClose: function (e) {
      console.log('handleClose', e);
    },
  },
};
</script>
