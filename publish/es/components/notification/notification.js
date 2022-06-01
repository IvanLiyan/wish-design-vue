import _defineProperty from 'babel-runtime/helpers/defineProperty';
import { getPrefix } from '@wish/wt-vue/es/utils/config';
import Icon from '@wish/wt-vue/es/components/icon';

var iconTypeMap = {
  success: 'check-circle',
  info: 'alert-circle',
  warning: 'alert-triangle',
  error: 'x-circle'
};

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('transition', { attrs: { "name": _vm.prefix + "-fade" } }, [_c('div', { directives: [{ name: "show", rawName: "v-show", value: _vm.visible, expression: "visible" }], class: [_vm.prefix, _vm.computedClass], style: _vm.positionStyle, on: { "mouseenter": _vm.clearTimer, "mouseleave": _vm.startTimer } }, [_c('Icon', { attrs: { "name": _vm.iconName, "color": "#fff", "width": 20, "height": 20 } }), _vm._v(" "), _c('span', { directives: [{ name: "show", rawName: "v-show", value: _vm.message, expression: "message" }], class: _vm.prefix + "-content" }, [_vm._v(_vm._s(_vm.message))])], 1)]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtNotification',
  components: {
    Icon: Icon
  },

  data: function data() {
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
      useHTMLString: false,
      position: 'top-right',
      prefixCls: getPrefix()
      // iconPrefixCls: getIconPrefix(),
    };
  },


  computed: {
    prefix: function prefix() {
      return this.prefixCls + '-notification';
    },
    iconName: function iconName() {
      return this.type && iconTypeMap[this.type] ? iconTypeMap[this.type] : '';
    },
    computedClass: function computedClass() {
      // const onRight = this.position.indexOf('right') > -1;
      // const onTop = this.position.indexOf('top') > -1;

      // const posHorizontalClass = onRight ? 'right' : 'center';
      // const postVertivalClass = onTop ? 'top' : 'bottom';
      var typeClass = this.type ? this.prefix + '-' + this.type : '';
      return [this.className, this.position, typeClass];
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
    }
  }
};