<template>
  <wt-submenu v-bind="$attrs" :name="item[itemKey]"
    :disabled="item.disabled"
    :tooltip="item.tooltip"
    :tooltip-props="tooltipProps"
    :enabled-tooltip="item.enabledTooltip"
  >
    <i :class="item.icon" v-if="item.icon" slot="icon"></i>
    <span slot="title">
      <slot name="title" :item="item">{{ item.title }}</slot>
    </span>
    <component :item="child"
      v-for="child in item.children"
      :key="child[itemKey]"
      :item-key="itemKey"
      :tooltip-props="tooltipProps"
      :is="child.children ? 'submenu' : 'menu-item'"
    >
      <template v-if="$scopedSlots.title" slot="title" slot-scope="scope">
        <slot v-bind="scope" name="title"></slot>
      </template>
      <template v-if="$scopedSlots.item" slot="item" slot-scope="scope">
        <slot v-bind="scope" name="item"></slot>
      </template>
      <template v-if="$scopedSlots.item" slot slot-scope="scope">
        <slot v-bind="scope" name="item"></slot>
      </template>
    </component>
  </wt-submenu>
</template>
<script>
import MenuItem from './menu-item.vue';
import WtSubmenu from '@components/submenu';

export default {
  name: 'Submenu',
  components: {
    MenuItem,
    WtSubmenu,
  },
  inheritAttrs: false,
  props: {
    item: {
      type: Object,
      required: true,
    },
    itemKey: String,
    tooltipProps: {
      type: Object,
    },
  },
};
</script>
