<template>
  <div>
    <transition name="fade-in">
      <div v-show="visible"
        :class="mask ? `${prefix}-mask`: `${prefix}-wrapper`"
        :style="{ 'z-index': zIndex }"
        @click="handleMaskClick"
      ></div>
    </transition>
    <transition :name="`fade-in-${placement}`"
      @after-leave="handleAfterLeave"
    >
      <drawer
        v-show="visible"
        v-if="drawVisible"
        v-bind="$attrs"
        :placement="placement"
        :closable="closable"
        :z-index="zIndex"
        @close="handleClickClose"
      >
        <slot slot="title" name="title" v-if="$slots.title"></slot>
        <slot></slot>
      </drawer>
    </transition>
  </div>
</template>
<script>
import { lock, unlock } from '@/utils/lock-scroll';
import { PopupManage } from '@/utils/popper';
import Drawer from './inside';
import {
  CONFIG_PROVIDER,
  getPrefixCls,
  getConfig,
} from '@/utils/config';

export default {
  name: 'WtDrawer',
  components: {
    Drawer,
  },
  inheritAttrs: false,
  model: {
    prop: 'visible',
  },
  props: {
    placement: {
      type: String,
      default: 'right',
      validator: p => {
        return ['left', 'right', 'top', 'bottom'].indexOf(p) > -1;
      },
    },
    visible: Boolean,
    closable: {
      type: Boolean,
      default: true,
    },
    appendToContainer: {
      type: Boolean,
      default: true,
    },
    mask: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: true,
    },
    lockScroll: {
      type: Boolean,
      default: true,
    },
    getPopupContainer: Function,
    destroyOnClose: {
      type: Boolean,
      default: false,
    },
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  data () {
    return {
      drawVisible: this.visible,
      zIndex: 2000,
    };
  },
  computed: {
    getContainer () {
      return this.getPopupContainer || this.config.getPContainer || getConfig().getPopupContainer;
    },
    prefix () {
      return this.config.getPrefixCls('drawer');
    },
  },
  watch: {
    visible (val) {
      val ? this.openDrawer() : this.closeDrawer();
    },
  },
  created () {
    this.$on('esc', this.handleEscClose);
  },
  mounted () {
    this.init();
  },
  activated () {
    this.init();
  },
  deactivated () {
    this.destroy();
    this._modal = undefined;
  },
  beforeDestroy () {
    this.destroy();
  },
  methods: {
    init () {
      if (this.visible) {
        this.openDrawer();
      }
    },
    destroy () {
      this.closeDrawer(this);
      const parentNode = this.$el.parentNode;
      parentNode && parentNode.removeChild(this.$el);
    },
    createDrawer () {
      if (this.appendToContainer) {
        const parent = this.getContainer();
        parent.appendChild(this.$el);
      }
      return true;
    },
    openDrawer () {
      this.drawVisible = true;
      this.zIndex = PopupManage.nextZIndex();
      PopupManage.open(this);
      if (!this._drawer) {
        this._drawer = this.createDrawer();
      }
      if (this.lockScroll) {
        lock(document.body);
      }
      this.$emit('open');
    },
    closeDrawer () {
      PopupManage.close(this);
      if (this.lockScroll) {
        unlock(document.body);
      }
      this._drawer = false;
    },
    handleAfterLeave () {
      if (this.destroyOnClose) {
        this.drawVisible = false;
      }
    },
    handleMaskClick () {
      if (this.maskClosable) {
        this.handleClickClose();
      }
    },
    handleClickClose () {
      this.$emit('input', false);
      this.$emit('close');
    },
    handleEscClose (e) {
      this.visible && this.closable && this.handleClickClose();
    },
  },
};
</script>
