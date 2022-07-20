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
    // 是否将弹出框插入至容器元素中
    appendToContainer: {
      type: Boolean,
      default: true,
    },
    getPopupContainer: Function,
    // 是否需要遮罩层
    mask: {
      type: Boolean,
      default: true,
    },
    // 是否显示关闭按钮，同时是否支持 esc 关闭
    closable: {
      type: Boolean,
      default: true,
    },
    // 点击蒙层是否允许关闭
    maskClosable: {
      type: Boolean,
      default: false,
    },
    // 是否显示，支持 v-model
    visible: Boolean,
    // 是否在关闭时销毁 Modal 里的子元素
    destroyOnClose: Boolean,
    // 是否在 Modal 出现时将 body 滚动锁定
    lockScroll: {
      type: Boolean,
      default: true,
    },
    // 位置
    placement: {
      type: String,
      validator(v) {
        return ['top', 'center'].indexOf(v) > -1;
      },
      default: 'center',
    },
    // 宽度
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
      dialogVisible: true, // 对话框显隐
      wrapVisible: this.visible, // 对话框容器显隐
      zIndex: 2000, // z-index层数
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('dialog');
    },
    // 对话框宽度
    dialogWidth() {
      return this.width ? (isNumber(this.width) ? `${this.width}px` : this.width) : undefined;
    },
    // 获取容器元素
    getContainer() {
      return this.getPopupContainer || this.config.getPContainer || getConfig().getPopupContainer;
    },
  },
  watch: {
    // 对话框显示隐藏
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
    /**
     * 初始化对话框
     */
    init() {
      if (this.visible) {
        this.openDialog();
      }
    },
    /**
     * 销毁对话框
     */
    destroy() {
      this.closeDialog(this);
      const parentNode = this.$el.parentNode;
      parentNode && parentNode.removeChild(this.$el);
    },
    /**
     * 创建对话框
     */
    createDialog() {
      if (this.appendToContainer) {
        const parent = this.getContainer();
        parent.appendChild(this.$el);
      }
      return true;
    },
    /**
     * 显示对话框
     */
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
    /**
     * 关闭对话框
     */
    closeDialog() {
      PopupManage.close(this);
      if (this.lockScroll) {
        unlock(document.body);
      }
    },
    /**
     * 触发事件通知
     */
    close() {
      this.$emit('close');
      this.$emit('input', false);
    },
    /**
     * 已关闭 Dialog 的回调事件
     */
    handleAfterLeave() {
      if (this.destroyOnClose) {
        this.dialogVisible = false;
      }
      this.wrapVisible = false;
      this.$emit('closed');
    },
    /**
     * 打开弹出框时触发
     */
    handleAfterEnter() {
      this.$emit('opened');
    },
    /**
     * 判断蒙层是否关闭
     */
    handleMaskClick() {
      this.maskClosable && this.visible && this.close();
    },
    /**
     * 对话框关闭事件
     */
    handleClose() {
      this.visible && this.close();
    },
    /**
     * 蒙层点击事件
     */
    handleWrapClick(event) {
      if (hasClass(event.target, `${this.prefix}-wrapper`)) {
        this.handleMaskClick(event);
      }
    },
    /**
     * 点击遮罩层或右上角叉的事件
     */
    handleEscClose(e) {
      this.visible && this.closable && this.close();
    },
  },
};
</script>
