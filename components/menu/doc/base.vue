<template>
  <wt-menu v-model="activeName">
    <wt-submenu name="1">
      <wt-icon slot="icon" name="home" :stroke-width="1" :width="18" :height="18" />
      <span slot="title">Menu</span>
      <wt-menu-item name="1-1">
        Menu-Item
      </wt-menu-item>
      <wt-menu-item name="1-2">
        Menu-Item
      </wt-menu-item>
    </wt-submenu>
    <wt-submenu name="2">
      <wt-icon slot="icon" name="clock" :stroke-width="1" :width="18" :height="18" />
      <span slot="title">Menu</span>
      <wt-menu-item name="2-1">
        Menu-Item
      </wt-menu-item>
      <wt-menu-item name="2-2">
        Menu-Item
      </wt-menu-item>
    </wt-submenu>
    <wt-submenu name="3">
      <wt-icon slot="icon" name="bell" :stroke-width="1" :width="18" :height="18" />
      <span slot="title">Menu</span>
      <wt-menu-item name="3-1">
        Menu-Item
      </wt-menu-item>
      <wt-menu-item name="3-2" disabled>
        Menu-Item(Disabled)
      </wt-menu-item>
    </wt-submenu>
  </wt-menu>
</template>
<script>
export default {
  data () {
    return {
      activeName: '',
    };
  },
};
</script>
