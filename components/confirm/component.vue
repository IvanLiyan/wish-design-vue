<template>
  <mtd-modal :visible="modalVisible"
    :mask-closable="maskClosable"
    :placement="placement" :closable="closable"
    :class="{
      [`${prefix}-wrapper`]: true,
      [`${className}`]: className,
      [`${prefix}-wrapper-${type}`]: type,
    }" :width="width"
    @input="handleVisibleChange"
    :title="type ? undefined : title"
    :append-to-container="false"
    @closed="destroyElement"
  >
    <div :class="{
      [prefix]: true,
      [`${prefix}-typed`]: type,
    }">
      <span v-if="type"
        :class="`${prefix}-icon ${prefix}-${type}`">
        <i :class="icon"></i>
      </span>
      <div :class="`${prefix}-right`">
        <div v-if="type && title" :class="`${prefix}-title`">
          {{ title }}</div>
        <slot>
          <div v-if="!dangerouslyUseHTMLString"
            :class="`${prefix}-message`">{{ message }}</div>
          <div v-else v-html="message" :class="`${prefix}-message`"></div>
        </slot>
      </div>
    </div>
    <div slot="footer" :class="`${prefix}-footer`">
      <mtd-button v-bind="cancelButtonProps"
        v-if="showCancelButton"
        :loading="cancelButtonLoading"
        @click="handleCancel" ref="cancel">
        {{ cancelButtonText }}
      </mtd-button>
      <mtd-button v-bind="okProps" v-if="showOkButton"
        :loading="okButtonLoading"
        @click="handleOk" ref="ok">
        {{ okButtonText }}
      </mtd-button>
    </div>
  </mtd-modal>
</template>
<script>
import Modal from '@components/modal';
import Button from '@components/button';
import { isPromise } from '@/utils/type';
import {
  getPrefix,
  getIconPrefix,
} from '@/utils/config';

const ICONS = {
  'success': 'success-circle',
  'info': 'info-circle',
  'warning': 'warning-circle',
  'error': 'error-circle',
};

export default {
  name: 'MtdConfirm',

  components: {
    MtdModal: Modal,
    MtdButton: Button,
  },
  data () {
    return {
      modalVisible: true,
      type: '',
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
      dangerouslyUseHTMLString: false,
      prefixCls: getPrefix(),
      iconPrefixCls: getIconPrefix(),
    };
  },
  computed: {
    prefix () {
      return `${this.prefixCls}-confirm`;
    },
    okProps () {
      return {
        type: 'primary',
        ...this.okButtonProps, // 如果在 template 中写 type 的优先级更高
      };
    },
    icon () {
      const { iconPrefixCls } = this;
      return `${iconPrefixCls} ${iconPrefixCls}-${ICONS[this.type]}`;
    },
  },
  watch: {
    modalVisible: function (n) {
      this.$emit('input', n);
    },
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$refs.ok) {
        this.$refs.ok.focus();
      } else if (this.$refs.cancel) {
        this.$refs.cancel.focus();
      };
    });
  },
  methods: {
    destroyElement () {
      const parent = this.$el.parentNode;
      // tofix test error.
      if (parent) {
        parent.removeChild(this.$el);
      }
      this.$destroy(true);
    },
    handleCancel () {
      this.callbackWrapper(this.onCancel, { action: 'cancel' }, 'cancelButtonLoading');
    },
    handleVisibleChange (v) {
      if (!v) {
        // 参照 ant-design 的处理逻辑，目前点击蒙层、x、esc 触发的关闭不会被阻止
        this.onCancel && this.onCancel({ action: 'close' });
      }
      this.modalVisible = v;
    },
    handleOk () {
      this.callbackWrapper(this.onOk, { action: 'confirm' }, 'okButtonLoading');
    },
    close () {
      this.modalVisible = false;
    },
    callbackWrapper (fn, params, prop) {
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
