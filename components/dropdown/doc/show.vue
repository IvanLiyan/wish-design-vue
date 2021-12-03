<template>
  <div>
    <h4>disabled status</h4>
    <div class="demo-container">
      <wt-dropdown disabled>
        <wt-button type="text" disabled>
          <span style="margin-right: 4px">more</span>
          <wt-icon name="chevron-down" />
        </wt-button>
        <wt-dropdown-menu slot="dropdown">
          <wt-dropdown-menu-item>网络</wt-dropdown-menu-item>
          <wt-dropdown-menu-item>存储</wt-dropdown-menu-item>
          <wt-dropdown-menu-item>数据库</wt-dropdown-menu-item>
          <wt-dropdown-menu-item disabled>计算</wt-dropdown-menu-item>
        </wt-dropdown-menu>
      </wt-dropdown>
    </div>
    <h4>Please open console panel check the trigger event response</h4>
    <div class="demo-container">
      <wt-dropdown v-model="visible" trigger="click" @change="handleChange" @clickoutside="handleClickOutside">
        <wt-button type="text">
          <span style="margin-right: 4px">more</span>
          <wt-icon name="chevron-down" />
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
      visible: false,
    };
  },
  methods: {
    handleClickOutside: function (e) {
      console.log('handleClickOutside', e);
    },
    handleChange: function (val) {
      console.log('handleChange', val);
    },
  },
};
</script>
