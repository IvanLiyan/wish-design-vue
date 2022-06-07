<template>
  <wt-ssubmenu v-bind="$attrs" :name="item[itemKey]"
    :disabled="item.disabled"
    :tooltip="item.tooltip"
    :tooltip-props="tooltipProps"
    :enabled-tooltip="item.enabledTooltip"
  >
    <!-- <i :class="item.icon" v-if="item.icon" slot="icon"></i> -->
    <Icon :name="item.icon" :width="17" :height="17" v-if="item.icon" slot="icon" />
    <span slot="title">
      <slot name="title" :item="item">{{ item.title }}</slot>
    </span>
    <component :item="child"
      v-for="child in item.children"
      :key="child[itemKey]"
      :item-key="itemKey"
      :tooltip-props="tooltipProps"
      :is="child.children ? 'ssubmenu' : 'smenu-item'"
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
  </wt-ssubmenu>
</template>
<script>
import SmenuItem from './menu-item.vue';
import WtSsubmenu from '@components/ssubmenu';
import Icon from '@components/icon';

export default {
  name: 'Ssubmenu',
  components: {
    SmenuItem,
    WtSsubmenu,
    Icon,
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
