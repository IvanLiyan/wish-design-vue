<template>
  <wt-menu
    v-model="activeName"
    @select="handleSelect"
    @update:expandedNames="handleUpdate"
  >
    <wt-submenu name="1">
      <wt-icon slot="icon" name="home" :stroke-width="1" :width="18" :height="18" />
      <span slot="title">一级菜单</span>
      <wt-menu-item name="1-1">
        二级菜单
      </wt-menu-item>
      <wt-menu-item name="1-2">
        二级菜单
      </wt-menu-item>
    </wt-submenu>
    <wt-submenu name="2">
      <wt-icon slot="icon" name="clock" :stroke-width="1" :width="18" :height="18" />
      <span slot="title">一级菜单</span>
      <wt-menu-item name="2-1">
        二级菜单
      </wt-menu-item>
      <wt-menu-item name="2-2">
        二级菜单
      </wt-menu-item>
    </wt-submenu>
    <wt-submenu name="3">
      <wt-icon slot="icon" name="bell" :stroke-width="1" :width="18" :height="18" />
      <span slot="title">一级菜单</span>
      <wt-menu-item name="3-1">
        二级菜单
      </wt-menu-item>
      <wt-menu-item name="3-2" disabled>
        二级菜单(禁用)
      </wt-menu-item>
    </wt-submenu>
  </wt-menu>
</template>
<script>
export default {
  data () {
    return {
      activeName: '2-1',
    };
  },
  methods: {
    handleSelect () {
      console.log('handleSelect');
    },
    handleUpdate (name) {
      console.log('handleUpdate:Name', name);
    },
  },
};
</script>
