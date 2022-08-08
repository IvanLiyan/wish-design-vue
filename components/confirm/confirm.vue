<template>
  <wt-dialog
    :visible="modalVisible"
    :mask-closable="maskClosable"
    :closable="closable"
    :class="{
      [`${prefix}-wrapper`]: true,
      [`${prefix}-wrapper-${type}`]: type,
    }"
    :width="width"
    @input="handleVisibleChange"
    :title="type ? undefined : title"
    :append-to-container="false"
    @closed="destroyElement"
  >
    <div
      :class="{
        [prefix]: true,
        [`${prefix}-typed`]: type,
        [`${prefix}-content-${type}`]: type,
      }"
    >
      <span :class="`${prefix}-icon ${prefix}-${type}`" v-if="isConfirmType">
        <wt-icon :name="icon" :width="48" :height="48" :color="iconColor" />
      </span>
      <div :class="{ [`${prefix}-content-${type}`]: type }">
        <div v-if="type && title" :class="`${prefix}-title`">
          {{ title }}
        </div>
        <div v-else style="height: 30px; width: 100%"></div>
        <slot>
          <div v-if="!useHTMLString" :class="`${prefix}-message`">{{ message }}</div>
          <div v-else v-html="message" :class="`${prefix}-message`"></div>
        </slot>
      </div>
    </div>
    <div slot="footer" :class="{ [`${prefix}-footer`]: true, [`${prefix}-content-${type}`]: type }">
      <wt-button v-bind="okProps" v-if="showOkButton" :loading="okButtonLoading" @click="handleOk" ref="ok">
        {{ okButtonText }}
      </wt-button>
      <wt-button
        v-bind="cancelButtonProps"
        v-if="showCancelButtonFlag"
        :loading="cancelButtonLoading"
        @click="handleCancel"
        ref="cancel"
        type="secondary"
      >
        {{ cancelButtonText }}
      </wt-button>
    </div>
  </wt-dialog>
</template>
<script>
import Dialog from '@components/dialog';
import Button from '@components/button';
import { isPromise } from '@/utils/type';
import { getPrefix, getIconPrefix } from '@/utils/config';
// 结果提示icon样式
const ICONS = {
  success: {
    name: 'check-circle',
    color: '#2EAA77',
  },
  info: {
    name: 'alert-circle',
    color: '#0090D9',
  },
  warning: {
    name: 'alert-triangle',
    color: '#FFC72C',
  },
  error: {
    name: 'x-circle',
    color: '#D0000F',
  },
};

export default {
  name: 'WtConfirm',
  components: {
    WtDialog: Dialog,
    WtButton: Button,
  },

  data() {
    return {
      modalVisible: true, // 显隐confirm
      type: 'default', // confirm类型
      title: '', // 标题
      message: '', // 描述
      width: '', // 宽度
      closable: true, // 是否显示关闭按钮
      okButtonText: 'OK', // 确定按钮的文本内容
      cancelButtonText: 'Cancel', // 取消按钮的文本内容
      okButtonProps: {}, // 确定按钮的额外属性
      cancelButtonProps: {}, // 取消按钮的额外属性
      okButtonLoading: false, // 确定按钮是否loading
      cancelButtonLoading: false, // 取消按钮是否loading
      showCancelButton: null, // 是否显示取消按钮
      showOkButton: true, // 是否显示确定按钮
      maskClosable: false, // 点击蒙层是否允许关闭
      onOk: null, // 点击确认按钮后的回调
      onCancel: null, // 击取消按钮或关闭按钮后的回调
      useHTMLString: false, // 是否将 message 属性作为 HTML 片段处理
      prefixCls: getPrefix(),
      iconPrefixCls: getIconPrefix(),
    };
  },
  computed: {
    prefix() {
      return `${this.prefixCls}-confirm`;
    },
    // 确定按钮的额外属性
    okProps() {
      return {
        type: 'primary',
        ...this.okButtonProps, // 如果在 template 中写 type 的优先级更高
      };
    },
    // icon的name属性
    icon() {
      if (this.isConfirmType) {
        return `${ICONS[this.type].name}`;
      } else {
        return '';
      }
    },
    // icon的color属性
    iconColor() {
      if (this.isConfirmType) {
        return `${ICONS[this.type].color}`;
      } else {
        return '';
      }
    },
    // 是否为confirm四种结果提示类型
    isConfirmType() {
      if (this.type === 'success' || this.type === 'info' || this.type === 'warning' || this.type === 'error') {
        return true;
      } else {
        return false;
      }
    },
    // 是否显示取消按钮
    showCancelButtonFlag() {
      if (this.showCancelButton == null) {
        if (this.type === 'default') {
          return true;
        } else {
          return false;
        }
      } else if (!this.showCancelButton) {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    // 显示隐藏触发事件
    modalVisible: function (n) {
      this.$emit('input', n);
    },
  },
  methods: {
    /**
     * 销毁dom
     */
    destroyElement() {
      const parent = this.$el.parentNode;
      // tofix test error.
      if (parent) {
        parent.removeChild(this.$el);
      }
      this.$destroy(true);
    },
    /**
     * 取消按钮回调
     */
    handleCancel() {
      this.callbackWrapper(this.onCancel, { action: 'cancel' }, 'cancelButtonLoading');
    },
    /**
     * 处理confirm显示隐藏
     */
    handleVisibleChange(v) {
      if (!v) {
        // 参照 ant-design 的处理逻辑，目前点击蒙层、x、esc 触发的关闭不会被阻止
        this.onCancel && this.onCancel({ action: 'close' });
      }
      this.modalVisible = v;
    },
    /**
     * 确定按钮回调
     */
    handleOk() {
      this.callbackWrapper(this.onOk, { action: 'confirm' }, 'okButtonLoading');
    },
    /**
     * 隐藏confirm
     */
    close() {
      this.modalVisible = false;
    },
    /**
     * 回调事件处理封装
     */
    callbackWrapper(fn, params, prop) {
      const result = fn && fn(params);
      const promise = isPromise(result) ? result : Promise.resolve();
      this[prop] = true;
      const reset = () => {
        this[prop] = false;
      };
      promise.then(this.close, reset);
    },
  },
};
</script>
