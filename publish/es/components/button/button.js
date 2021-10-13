import _Promise from 'babel-runtime/core-js/promise';
import _extends from 'babel-runtime/helpers/extends';
import { isPromise, isArray } from '@wish/wd-vue/es/utils/type';
import { hasProps } from '@wish/wd-vue/es/utils/vnode';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wd-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c(_vm.tag, _vm._g(_vm._b({ tag: "component", class: [_vm.prefix, _vm.type ? _vm.prefix + "-" + _vm.type : '', _vm.size ? _vm.prefix + "-" + _vm.size : '', (_obj = {}, _obj[_vm.prefix + "-dashed"] = _vm.dashed, _obj[_vm.prefix + "-disabled"] = _vm.disabled, _obj[_vm.prefix + "-loading"] = _vm._loading, _obj[_vm.prefix + "-clicked"] = _vm.clicked, _obj[_vm.prefix + "-ghost"] = _vm.ghost, _obj[_vm.prefix + "-round"] = _vm.round, _obj[_vm.prefix + "-circle"] = _vm.circle, _obj)], attrs: { "href": _vm.href, "to": _vm.to, "type": _vm.htmlType, "disabled": _vm.disabled || _vm._loading } }, 'component', _vm.$attrs, false), _vm.listen), [_vm._loading ? _c('i', { class: _vm.prefix + "-before " + _vm.prefix + "-spin" }) : _vm._e(), !_vm._loading && (_vm.icon || _vm.$slots.icon) ? _c('span', { class: _vm.prefix + "-before" }, [_vm._t("icon", function () {
    return [_c('i', { class: _vm.icon })];
  })], 2) : _vm._e(), _c('span', [_vm._t("default")], 2)]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WdButton',
  inheritAttrs: false,
  props: {
    href: String,
    to: [String, Object],
    ghost: Boolean,
    disabled: Boolean,
    size: String,
    htmlType: {
      type: String,
      default: 'button'
    },
    loading: Boolean,
    icon: String,
    type: String,
    dashed: Boolean,
    circle: Boolean,
    round: Boolean
  },
  data: function data() {
    return {
      clicked: false,
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
    tag: function tag() {
      if (this.to !== undefined) {
        return 'router-link';
      } else if (this.href !== undefined) {
        return 'a';
      } else {
        return 'button';
      }
    },
    _loading: function _loading() {
      return hasProps(this, 'loading') ? this.loading : this.innerLoading;
    }
  },
  beforeDestroy: function beforeDestroy() {
    clearTimeout(this.timeout);
  },

  methods: {
    handleClick: function handleClick(e) {
      var _this = this;

      clearTimeout(this.timeout);
      this.clicked = true;
      this.timeout = setTimeout(function () {
        _this.clicked = false;
      }, 500);

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
    },
    focus: function focus() {
      this.$el.focus();
    },
    blur: function blur() {
      this.$el.blur();
    }
  }
};