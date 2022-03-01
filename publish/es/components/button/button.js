import _Promise from 'babel-runtime/core-js/promise';
import _extends from 'babel-runtime/helpers/extends';
import { isPromise, isArray } from '@wish/wt-vue/es/utils/type';
import { hasProps } from '@wish/wt-vue/es/utils/vnode';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';
import Icon from '@wish/wt-vue/es/components/icon';

var __vue_render__ = function __vue_render__() {
  var _obj, _obj$1;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c(_vm.tag, _vm._g(_vm._b({ tag: "component", class: [_vm.prefix, _vm.prefix + "-" + _vm.type, (_obj = {}, _obj[_vm.prefix + "-icon"] = !_vm.$slots.default && _vm.icon, _obj[_vm.prefix + "-text-icon"] = _vm.$slots.default && _vm.icon, _obj[_vm.prefix + "-disabled"] = _vm.disabled, _obj[_vm.prefix + "-loading"] = _vm._loading, _obj)], attrs: { "href": _vm.href, "to": _vm.to, "type": _vm.htmlType, "disabled": _vm.disabled || _vm._loading } }, 'component', _vm.$attrs, false), _vm.listen), [_vm._loading ? _c('i', { class: _vm.prefix + "-before " + _vm.prefix + "-spin" }) : _vm._e(), _vm._v(" "), !_vm._loading && _vm.icon ? _c('Icon', { attrs: { "name": _vm.icon, "width": 20, "height": 20 } }) : _vm._e(), _vm._v(" "), _vm.$slots.default && !_vm._loading ? _c('span', { class: [_vm.prefix + "-content", (_obj$1 = {}, _obj$1[_vm.prefix + "-link-small"] = _vm.linkSize === 'small', _obj$1)] }, [_vm._t("default")], 2) : _vm._e()], 1);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtButton',
  components: {
    Icon: Icon
  },
  inheritAttrs: false,
  props: {
    // 按钮类型
    type: {
      type: String,
      default: 'primary',
      validator: function validator(val) {
        return ['primary', 'secondary', 'third', 'ghost', 'text', 'link', 'dashed', 'success', 'warning', 'error'].includes(val);
      }
    },
    // 按钮icon
    icon: String,
    // 按钮loading状态
    loading: Boolean,
    // 按钮disabled状态
    disabled: Boolean,
    // 按钮跳转地址
    href: String,
    // 按钮跳转路由地址
    to: [String, Object],
    // 链接按钮 文字大小
    linkSize: {
      type: String,
      default: 'normal',
      validator: function validator(val) {
        return ['normal', 'small'].includes(val);
      }
    },
    // 按钮类型
    htmlType: {
      type: String,
      default: 'button'
    }
  },

  data: function data() {
    return {
      innerLoading: false
    };
  },

  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('btn');
    },
    listen: function listen() {
      return _extends({}, this.$listeners, {
        click: this.handleClick
      });
    },

    /**
     * 获取按钮标签
     */
    tag: function tag() {
      if (this.href !== undefined) {
        return 'a';
      } else {
        return 'button';
      }
    },

    /**
     * 是否loading
     */
    _loading: function _loading() {
      return hasProps(this, 'loading') ? this.loading : this.innerLoading;
    }
  },
  /**
   * 清除倒计时
   */
  beforeDestroy: function beforeDestroy() {
    clearTimeout(this.timeout);
  },

  methods: {
    /**
     * 点击按钮
     */
    handleClick: function handleClick(e) {
      var _this = this;

      clearTimeout(this.timeout);
      var onClick = this.$listeners.click;
      var handler = function handler() {
        _this.innerLoading = false;
      };
      if (isArray(onClick)) {
        var r = _Promise.all(onClick.map(function (fn) {
          return fn && fn(e);
        }));
        this.innerLoading = true;
        r.then(handler, handler);
      } else if (onClick) {
        var _r = onClick(e);
        if (isPromise(_r)) {
          this.innerLoading = true;
          _r.then(handler, handler);
        }
      }
    }
  }
};