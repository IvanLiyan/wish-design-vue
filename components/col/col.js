import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WtCol',

  props: {
    // 栅格占据的列数
    span: {
      type: Number,
      default: 24,
    },
    tag: {
      type: String,
      default: 'div',
    },
    // 栅格左侧的间隔格数
    offset: Number,
    // 栅格向左移动格数
    pull: Number,
    // 栅格向右移动格数
    push: Number,
    // < 576px 响应式栅格数或者栅格属性对象
    xs: [Number, Object],
    // ≥ 576px 响应式栅格数或者栅格属性对象
    sm: [Number, Object],
    // ≥ 768px 响应式栅格数或者栅格属性对象
    md: [Number, Object],
    // ≥ 992px 响应式栅格数或者栅格属性对象
    lg: [Number, Object],
    // ≥ 1200px 响应式栅格数或者栅格属性对象
    xl: [Number, Object],
    // ≥ 1620px 响应式栅格数或者栅格属性对象
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
    prefix() {
      return this.config.getPrefixCls('col');
    },
    // 计算栅格间隔
    gutter() {
      return this.row ? this.row.gutter : 0;
    },
  },
  render(h) {
    const classList = [];
    const style = {};

    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px';
      style.paddingRight = style.paddingLeft;
    }

    ['span', 'offset', 'pull', 'push'].forEach((prop) => {
      if (this[prop] || this[prop] === 0) {
        classList.push(prop !== 'span' ? `${this.prefix}-${prop}-${this[prop]}` : `${this.prefix}-${this[prop]}`);
      }
    });

    ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach((size) => {
      if (typeof this[size] === 'number') {
        classList.push(`${this.prefix}-${size}-${this[size]}`);
      } else if (typeof this[size] === 'object') {
        const props = this[size];
        Object.keys(props).forEach((prop) => {
          classList.push(
            prop !== 'span' ? `${this.prefix}-${size}-${prop}-${props[prop]}` : `${this.prefix}-${size}-${props[prop]}`,
          );
        });
      }
    });

    return h(
      this.tag,
      {
        class: [this.prefix, classList],
        style,
      },
      this.$slots.default,
    );
  },
};
