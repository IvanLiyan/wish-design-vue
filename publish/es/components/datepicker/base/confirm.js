import WtButton from '@wish/wt-vue/es/components/button';
import Locale from '@wish/wt-vue/es/mixins/locale';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: [_vm.prefix + '-confirm'] }, [_vm._t("default", function () {
    return [_c('wt-button', { attrs: { "size": "small", "type": "primary" }, on: { "click": _vm.handleSuccess } }, [_vm._v("\n      " + _vm._s(_vm.labels.ok) + "\n    ")])];
  })], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  components: { WtButton: WtButton },
  mixins: [Locale],
  props: {
    isTime: {
      type: Boolean,
      default: false
    },
    timeDisabled: {
      type: Boolean,
      default: false
    },
    showBtnNow: {
      type: Boolean,
      default: true
    }
  },
  inject: {
    'CalendarPicker': {
      default: ''
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
      return this.config.getPrefixCls('picker');
    },
    timeClasses: function timeClasses() {
      return this.prefix + '-confirm-time';
    },

    // 渲染按钮文字
    labels: function labels() {
      var _this = this;

      var labels = ['time', 'now', 'ok'];
      var values = [this.isTime ? 'selectDate' : 'selectTime', 'now', 'ok'];
      return labels.reduce(function (obj, key, i) {
        obj[key] = _this.t('el.datepicker.' + values[i]);
        return obj;
      }, {});
    }
  },
  methods: {
    // 确认
    handleSuccess: function handleSuccess() {
      this.$emit('confirm');
    },
    handleToggleTime: function handleToggleTime() {
      if (this.timeDisabled) return;
      this.$emit('toggle');
      if (this.CalendarPicker) {
        this.CalendarPicker.$emit('focus-input');
      }
    }
  }
};