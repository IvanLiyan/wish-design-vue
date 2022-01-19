import _defineProperty from 'babel-runtime/helpers/defineProperty';
import { getPrefix, getIconPrefix } from '@wish/wt-vue/es/utils/config';

var typeMap = {
  success: 'success-circle',
  info: 'info-circle',
  warning: 'warning-circle',
  error: 'error-circle'
};

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": _vm.prefix + "-fade" } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], class: [_vm.prefix, _vm.computedClass], style: _vm.positionStyle, on: { "mouseenter": _vm.clearTimer, "mouseleave": _vm.startTimer } }, [_vm.typeIcon ? _c('i', { class: [_vm.prefix + "-icon", _vm.iconPrefixCls, _vm.typeIcon] }) : _vm._e(), _vm._v(" "), _c('div', { class: _vm.prefix + "-group" }, [_c('div', { class: _vm.prefix + "-title", domProps: { "textContent": _vm._s(_vm.title) } }), _vm._v(" "), _c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.message, expression: "message" }], class: _vm.prefix + "-content" }, [_vm._t("default", function () {
    return [!_vm.dangerouslyUseHTMLString ? _c('div', [_vm._v(_vm._s(_vm.message))]) : _c('div', { domProps: { "innerHTML": _vm._s(_vm.message) } })];
  })], 2), _vm._v(" "), _vm.showClose ? _c('div', { class: _vm.prefix + "-close " + _vm.iconPrefixCls + " " + _vm.iconPrefixCls + "-close-thick", on: { "click": function click($event) {
        $event.stopPropagation();return _vm.close.apply(null, arguments);
      } } }) : _vm._e()])])]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtNotification',

  data: function data() {
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
      iconPrefixCls: getIconPrefix()
    };
  },


  computed: {
    prefix: function prefix() {
      return this.prefixCls + '-notification';
    },
    typeIcon: function typeIcon() {
      var iconPrefixCls = this.iconPrefixCls;

      return this.icon || (this.type && typeMap[this.type] ? iconPrefixCls + '-' + typeMap[this.type] : '');
    },
    computedClass: function computedClass() {
      var posclass = this.position.indexOf('right') > -1 ? 'right' : 'left';
      var typeClass = this.type ? this.prefix + '-' + this.type : '';
      return [this.className, posclass, typeClass];
    },
    verticalProperty: function verticalProperty() {
      return (/^top-/.test(this.position) ? 'top' : 'bottom'
      );
    },
    positionStyle: function positionStyle() {
      return _defineProperty({}, this.verticalProperty, this.verticalOffset + 'px');
    }
  },

  watch: {
    closed: function closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$el.addEventListener('transitionend', this.destroyElement);
      }
    }
  },

  created: function created() {
    this.$on('esc', this.handleEsc);
  },
  mounted: function mounted() {
    this.startTimer();
  },


  methods: {
    destroyElement: function destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },
    close: function close() {
      this.closed = true;
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    },
    clearTimer: function clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer: function startTimer() {
      var _this = this;

      if (this.duration > 0) {
        // 定时关闭通知
        this.timer = setTimeout(function () {
          if (!_this.closed) {
            _this.close();
          }
        }, this.duration);
      }
    },
    handleEsc: function handleEsc(e) {
      if (!this.closed) {
        this.close();
      }
    }
  }
};