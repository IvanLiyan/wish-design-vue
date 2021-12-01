<template>
  <div>
    <h4>触发事件，打开控制台查看</h4>
    <div class="demo-container">
      <wt-dropdown
        v-model="visible"
        trigger="click"
        placement="right"
        @input="handleInput"
        @clickoutside="handleClickOutside"
      >
        <wt-button type="text">
          <span style="margin-right: 4px">更多</span>
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
      visible: true,
    };
  },
  methods: {
    handleInput: function (visible) {
      console.log('handleInput', visible);
    },
    handleClickOutside: function (e) {
      console.log('handleClickOutside', e);
    },
  },
};
</script>
