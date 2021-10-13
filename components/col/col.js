import {
  CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

export default {
  name: 'WdCol',

  props: {
    span: {
      type: Number,
      default: 24,
    },
    tag: {
      type: String,
      default: 'div',
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object],
    xxl: [Number, Object],
  },
  inject: {
    row: {
      default: undefined,
    },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  computed: {
    prefix () {
      return this.config.getPrefixCls('col');
    },
    gutter () {
      return this.row ? this.row.gutter : 0;
    },
  },
  render (h) {
    const classList = [];
    const style = {};

    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px';
      style.paddingRight = style.paddingLeft;
    }

    ['span', 'offset', 'pull', 'push'].forEach(prop => {
      if (this[prop] || this[prop] === 0) {
        classList.push(
          prop !== 'span'
            ? `${this.prefix}-${prop}-${this[prop]}`
            : `${this.prefix}-${this[prop]}`,
        );
      }
    });

    ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(size => {
      if (typeof this[size] === 'number') {
        classList.push(`${this.prefix}-${size}-${this[size]}`);
      } else if (typeof this[size] === 'object') {
        const props = this[size];
        Object.keys(props).forEach(prop => {
          classList.push(
            prop !== 'span'
              ? `${this.prefix}-${size}-${prop}-${props[prop]}`
              : `${this.prefix}-${size}-${props[prop]}`,
          );
        });
      }
    });

    return h(this.tag, {
      class: [this.prefix, classList],
      style,
    }, this.$slots.default);
  },
};
