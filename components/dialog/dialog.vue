<template>
  <div>
    <transition name="fade-in">
      <div
        ref="mask"
        :class="`${prefix}-mask`"
        :style="{ 'z-index': zIndex }"
        v-show="visible"
        v-if="mask"
        @click="handleMaskClick"
      ></div>
    </transition>
    <div
      v-show="wrapVisible"
      :style="{ 'z-index': zIndex }"
      :class="{
        [`${prefix}-wrapper`]: true,
        [`${prefix}-${placement}`]: placement,
      }"
      @click="handleWrapClick"
    >
      <transition name="dialog-fade" @after-enter="handleAfterEnter" @after-leave="handleAfterLeave">
        <Dialog
          v-bind="$attrs"
          :closable="closable"
          :style="{ width: dialogWidth }"
          v-show="visible"
          v-if="dialogVisible"
          @close="handleClose"
        >
          <slot name="title" v-if="$slots.title" slot="title"></slot>
          <slot></slot>
          <slot name="footer" v-if="$slots.footer" slot="footer"></slot>
        </Dialog>
      </transition>
    </div>
  </div>
</template>
<script>
import { hasClass } from '@/utils/dom';
import { lock, unlock } from '@/utils/lock-scroll';
import { PopupManage } from '@/utils/popper';
import { isNumber } from '@/utils/type';
import Dialog from './inside';
import { getConfig, CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WtDialog',
  components: {
    Dialog,
  },
  inheritAttrs: false,
  model: {
    prop: 'visible',
  },
  props: {
    appendToContainer: {
      type: Boolean,
      default: true,
    },
    getPopupContainer: Function,
    mask: {
      type: Boolean,
      default: true,
    },
    closable: {
      type: Boolean,
      default: true,
    },
    maskClosable: {
      type: Boolean,
      default: false,
    },
    visible: Boolean,
    destroyOnClose: Boolean,
    lockScroll: {
      type: Boolean,
      default: true,
    },
    placement: {
      type: String,
      validator(v) {
        return ['top', 'center'].indexOf(v) > -1;
      },
      default: 'center',
    },
    width: [String, Number],
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  data() {
    return {
      dialogVisible: true,
      wrapVisible: this.visible,
      zIndex: 2000,
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('dialog');
    },
    dialogWidth() {
      return this.width ? (isNumber(this.width) ? `${this.width}px` : this.width) : undefined;
    },
    getContainer() {
      return this.getPopupContainer || this.config.getPContainer || getConfig().getPopupContainer;
    },
  },
  watch: {
    visible(n) {
      n ? this.openDialog() : this.closeDialog();
    },
  },
  created() {
    this.$on('esc', this.handleEscClose);
  },
  mounted() {
    this.init();
  },
  activated() {
    this.init();
  },
  deactivated() {
    this.destroy();
    this._dialog = undefined;
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    init() {
      if (this.visible) {
        this.openDialog();
      }
    },
    destroy() {
      this.closeDialog(this);
      const parentNode = this.$el.parentNode;
      parentNode && parentNode.removeChild(this.$el);
    },
    createDialog() {
      if (this.appendToContainer) {
        const parent = this.getContainer();
        parent.appendChild(this.$el);
      }
      return true;
    },
    openDialog() {
      this.dialogVisible = true;
      this.wrapVisible = true;
      this.zIndex = PopupManage.nextZIndex();
      PopupManage.open(this);
      if (!this._dialog) {
        this._dialog = this.createDialog();
      }
      if (this.lockScroll) {
        lock(document.body);
      }
      this.$emit('open');
    },
    closeDialog() {
      PopupManage.close(this);
      if (this.lockScroll) {
        unlock(document.body);
      }
    },
    close() {
      this.$emit('close');
      this.$emit('input', false);
    },
    handleAfterLeave() {
      if (this.destroyOnClose) {
        this.dialogVisible = false;
      }
      this.wrapVisible = false;
      this.$emit('closed');
    },
    handleAfterEnter() {
      this.$emit('opened');
    },
    handleMaskClick() {
      this.maskClosable && this.visible && this.close();
    },
    handleClose() {
      this.visible && this.close();
    },
    handleWrapClick(event) {
      if (hasClass(event.target, `${this.prefix}-wrapper`)) {
        this.handleMaskClick(event);
      }
    },
    handleEscClose(e) {
      this.visible && this.closable && this.close();
    },
  },
};
</script>
