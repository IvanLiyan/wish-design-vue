<template>
  <transition :name="`${prefix}-fade`">
    <div
      :class="[prefix, computedClass]"
      v-show="visible"
      :style="positionStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <Icon :name="iconName" color="#fff" :width="20" :height="20" />
      <span :class="`${prefix}-content`" v-show="message">{{ message }}</span>
    </div>
  </transition>
</template>

<script>
import { getPrefix } from '@/utils/config';
import Icon from '@components/icon';

const iconTypeMap = {
  success: 'check-circle',
  info: 'alert-circle',
  warning: 'alert-triangle',
  danger: 'x-circle',
};

export default {
  name: 'WtNotification',
  components: {
    Icon,
  },

  data() {
    return {
      visible: false,
      message: '',
      duration: 3000,
      type: 'info',
      className: '',
      onClose: null,
      closed: false,
      verticalOffset: 0,
      timer: null,
      dangerouslyUseHTMLString: false,
      position: 'top-right',
      prefixCls: getPrefix(),
      // iconPrefixCls: getIconPrefix(),
    };
  },

  computed: {
    prefix() {
      return `${this.prefixCls}-notification`;
    },
    iconName() {
      return this.type && iconTypeMap[this.type] ? iconTypeMap[this.type] : '';
    },

    computedClass() {
      // const onRight = this.position.indexOf('right') > -1;
      // const onTop = this.position.indexOf('top') > -1;

      // const posHorizontalClass = onRight ? 'right' : 'center';
      // const postVertivalClass = onTop ? 'top' : 'bottom';
      const typeClass = this.type ? `${this.prefix}-${this.type}` : '';
      return [this.className, this.position, typeClass];
    },

    verticalProperty() {
      return /^top-/.test(this.position) ? 'top' : 'bottom';
    },

    positionStyle() {
      return {
        [this.verticalProperty]: `${this.verticalOffset}px`,
      };
    },
  },

  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    },
  },

  mounted() {
    this.startTimer();
  },

  methods: {
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },

    close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },

    clearTimer() {
      clearTimeout(this.timer);
    },

    startTimer() {
      if (this.duration > 0) {
        // 定时关闭通知
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
  },
};
</script>
