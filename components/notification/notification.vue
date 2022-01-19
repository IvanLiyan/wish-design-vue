<template>
  <transition :name="`${prefix}-fade`">
    <div
      :class="[prefix, computedClass]"
      v-show="visible"
      :style="positionStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer">
      <i
        :class="[`${prefix}-icon`, iconPrefixCls, typeIcon]"
        v-if="typeIcon"></i>
      <div
        :class="`${prefix}-group`">
        <div :class="`${prefix}-title`" v-text="title"></div>
        <div :class="`${prefix}-content`" v-show="message">
          <slot>
            <div v-if="!dangerouslyUseHTMLString">{{ message }}</div>
            <div v-else v-html="message"></div>
          </slot>
        </div>
        <div
          :class="`${prefix}-close ${iconPrefixCls} ${iconPrefixCls}-close-thick`"
          v-if="showClose"
          @click.stop="close"></div>
      </div>
    </div>
  </transition>
</template>

<script>
import {
  getPrefix,
  getIconPrefix,
} from '@/utils/config';

const typeMap = {
  success: 'success-circle',
  info: 'info-circle',
  warning: 'warning-circle',
  error: 'error-circle',
};

export default {
  name: 'WtNotification',

  data () {
    return {
      visible: false,
      title: '',
      message: '',
      duration: 3000,
      type: '',
      showClose: true,
      className: '',
      icon: '',
      onClose: null,
      closed: false,
      verticalOffset: 0,
      timer: null,
      dangerouslyUseHTMLString: false,
      position: 'top-right',
      prefixCls: getPrefix(),
      iconPrefixCls: getIconPrefix(),
    };
  },

  computed: {
    prefix () {
      return `${this.prefixCls}-notification`;
    },
    typeIcon () {
      const { iconPrefixCls } = this;
      return this.icon || (this.type && typeMap[this.type]
        ? `${iconPrefixCls}-${typeMap[this.type]}` : '');
    },

    computedClass () {
      const posclass = this.position.indexOf('right') > -1
        ? 'right' : 'left';
      const typeClass = this.type
        ? `${this.prefix}-${this.type}` : '';
      return [this.className, posclass, typeClass];
    },

    verticalProperty () {
      return /^top-/.test(this.position) ? 'top' : 'bottom';
    },

    positionStyle () {
      return {
        [this.verticalProperty]: `${this.verticalOffset}px`,
      };
    },
  },

  watch: {
    closed (newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    },
  },

  created () {
    this.$on('esc', this.handleEsc);
  },

  mounted () {
    this.startTimer();
  },

  methods: {
    destroyElement () {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },

    close () {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },

    clearTimer () {
      clearTimeout(this.timer);
    },

    startTimer () {
      if (this.duration > 0) {
        // 定时关闭通知
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },

    handleEsc (e) {
      if (!this.closed) {
        this.close();
      }
    },
  },
};
</script>
