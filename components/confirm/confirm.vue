<template>
  <wt-dialog
    :visible="modalVisible"
    :mask-closable="maskClosable"
    :placement="placement"
    :closable="closable"
    :class="{
      [`${prefix}-wrapper`]: true,
      [`${className}`]: className,
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
      }"
    >
      <span :class="`${prefix}-icon ${prefix}-${type}`" v-if="isConfirmType">
        <wt-icon :name="icon" :width="48" :height="48" :color="iconColor" />
      </span>
      <div :class="{ [`${prefix}-content-${type}`]: type }">
        <div v-if="type && title" :class="`${prefix}-title`">
          {{ title }}
        </div>
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
        v-if="showCancelButton"
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
      modalVisible: true,
      type: 'default',
      title: '',
      message: '',
      width: '',
      className: '',
      closable: true,
      placement: undefined,
      okButtonText: '确定',
      cancelButtonText: '取消',
      okButtonProps: {},
      cancelButtonProps: {},
      okButtonLoading: false,
      cancelButtonLoading: false,
      showOkButton: true,
      showCancelButton: false,
      maskClosable: false,
      onOk: null,
      onCancel: null,
      useHTMLString: false,
      prefixCls: getPrefix(),
      iconPrefixCls: getIconPrefix(),
    };
  },
  computed: {
    prefix() {
      return `${this.prefixCls}-confirm`;
    },
    okProps() {
      return {
        type: 'primary',
        ...this.okButtonProps, // 如果在 template 中写 type 的优先级更高
      };
    },
    icon() {
      return `${ICONS[this.type].name}`;
    },
    iconColor() {
      return `${ICONS[this.type].color}`;
    },
    isConfirmType() {
      if (this.type === 'success' || this.type === 'info' || this.type === 'warning' || this.type === 'error') {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    modalVisible: function (n) {
      this.$emit('input', n);
    },
  },
  mounted() {
    // this.$nextTick(() => {
    //   console.log(33333, this.$refs.ok);
    //   if (this.$refs.ok) {
    //     this.$refs.ok.focus();
    //   } else if (this.$refs.cancel) {
    //     this.$refs.cancel.focus();
    //   }
    // });
  },
  methods: {
    destroyElement() {
      const parent = this.$el.parentNode;
      // tofix test error.
      if (parent) {
        parent.removeChild(this.$el);
      }
      this.$destroy(true);
    },
    handleCancel() {
      this.callbackWrapper(this.onCancel, { action: 'cancel' }, 'cancelButtonLoading');
    },
    handleVisibleChange(v) {
      if (!v) {
        // 参照 ant-design 的处理逻辑，目前点击蒙层、x、esc 触发的关闭不会被阻止
        this.onCancel && this.onCancel({ action: 'close' });
      }
      this.modalVisible = v;
    },
    handleOk() {
      this.callbackWrapper(this.onOk, { action: 'confirm' }, 'okButtonLoading');
    },
    close() {
      this.modalVisible = false;
    },
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
