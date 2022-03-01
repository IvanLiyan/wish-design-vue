import _Promise from 'babel-runtime/core-js/promise';
import { isString } from '@wish/wt-vue/es/utils/type';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

function noop() {}
var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('form', _vm._b({ class: _vm.classes, attrs: { "autocomplete": _vm.autocomplete } }, 'form', _vm.$attrs, false), [_c('h3', { class: _vm.prefix + "-title" }, [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtForm',
  props: {
    /**
     * 表单标题
     */
    title: String,
    /**
     * 表单数据对象
     */
    model: {
      type: Object
    },
    /**
     * 校验规则
     */
    rules: {
      type: Object
    },

    /**
     * 是否显示校验信息
     */
    showMessage: {
      type: Boolean,
      default: true
    },
    /**
     * 是否禁用该表单内的所有组件
     */
    disabled: Boolean, // use in form-item HOC

    /**
     * 是否在 rules 属性改变后立即触发一次验证
     */
    validateOnRuleChange: {
      type: Boolean,
      default: true
    },

    autocomplete: {
      type: String,
      validator: function validator(value) {
        return ['on', 'off'].indexOf(value) > -1;
      },

      default: 'off'
    }
  },
  provide: function provide() {
    return { form: this };
  },

  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  data: function data() {
    return {
      fields: []
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('form');
    },
    classes: function classes() {
      var prefix = this.prefix;

      return [prefix];
    }
  },
  watch: {
    rules: function rules() {
      if (this.validateOnRuleChange) {
        this.validate().catch(function (e) {});
      }
    }
  },
  created: function created() {
    var _this = this;

    this.$on('addFormItem', function (field) {
      if (field && field.prop) _this.fields.push(field);
      return false;
    });
    this.$on('removeFormItem', function (field) {
      if (field.prop) _this.fields.splice(_this.fields.indexOf(field), 1);
      return false;
    });
  },

  methods: {
    resetFields: function resetFields(props) {
      var fields = props && props.length ? isString(props) ? this.fields.filter(function (field) {
        return props === field.prop;
      }) : this.fields.filter(function (field) {
        return props.indexOf(field.prop) > -1;
      }) : this.fields;
      fields.forEach(function (field) {
        field.resetField();
      });
    },

    /**
     * 校验所有field
     */
    validate: function validate(callback) {
      var _this2 = this;

      var callbackFn = callback || noop;
      return new _Promise(function (resolve, reject) {
        // props undefined 为所有field
        _this2.validateFields(undefined, function (valid, errors) {
          callbackFn(valid, errors);
          valid ? resolve() : reject(errors);
        });
      });
    },
    validateFields: function validateFields(props) {
      var fields = props && props.length ? isString(props) ? this.fields.filter(function (field) {
        return props === field.prop;
      }) : this.fields.filter(function (field) {
        return props.indexOf(field.prop) > -1;
      }) : this.fields;
      if (props && props.length && !fields.length) {
        throw new Error('[warn]: must call validateField with valid prop string!');
      }

      // run validate
      var valid = true;
      var errors = {};
      if (!fields.length) {
        return valid;
      }
      fields.forEach(function (field) {
        field.validate('', function (error) {
          if (error) {
            valid = false;
            errors[field.prop] = error;
            errors.$$wt = true;
          }
        });
      });
      console.log('errors', errors);
      return valid;
    },
    clearValidate: function clearValidate() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var fields = props.length ? isString(props) ? this.fields.filter(function (field) {
        return props === field.prop;
      }) : this.fields.filter(function (field) {
        return props.indexOf(field.prop) > -1;
      }) : this.fields;
      fields.forEach(function (field) {
        field.clearValidate();
      });
    }
  }
};