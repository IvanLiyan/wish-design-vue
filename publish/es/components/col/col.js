import _Object$keys from 'babel-runtime/core-js/object/keys';
import _typeof from 'babel-runtime/helpers/typeof';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

export default {
  name: 'WtCol',

  props: {
    span: {
      type: Number,
      default: 24
    },
    tag: {
      type: String,
      default: 'div'
    },
    offset: Number,
    pull: Number,
    push: Number,
    xs: [Number, Object],
    sm: [Number, Object],
    md: [Number, Object],
    lg: [Number, Object],
    xl: [Number, Object],
    xxl: [Number, Object]
  },
  inject: {
    row: {
      default: undefined
    },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('col');
    },
    gutter: function gutter() {
      return this.row ? this.row.gutter : 0;
    }
  },
  render: function render(h) {
    var _this = this;

    var classList = [];
    var style = {};

    if (this.gutter) {
      style.paddingLeft = this.gutter / 2 + 'px';
      style.paddingRight = style.paddingLeft;
    }

    ['span', 'offset', 'pull', 'push'].forEach(function (prop) {
      if (_this[prop] || _this[prop] === 0) {
        classList.push(prop !== 'span' ? _this.prefix + '-' + prop + '-' + _this[prop] : _this.prefix + '-' + _this[prop]);
      }
    });

    ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach(function (size) {
      if (typeof _this[size] === 'number') {
        classList.push(_this.prefix + '-' + size + '-' + _this[size]);
      } else if (_typeof(_this[size]) === 'object') {
        var props = _this[size];
        _Object$keys(props).forEach(function (prop) {
          classList.push(prop !== 'span' ? _this.prefix + '-' + size + '-' + prop + '-' + props[prop] : _this.prefix + '-' + size + '-' + props[prop]);
        });
      }
    });

    return h(this.tag, {
      class: [this.prefix, classList],
      style: style
    }, this.$slots.default);
  }
};