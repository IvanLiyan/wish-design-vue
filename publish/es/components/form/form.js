import _Promise from 'babel-runtime/core-js/promise';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import { isString } from '@wish/wt-vue/es/utils/type';
import { deprecatedMethod } from '@wish/wt-vue/es/utils/console';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

function noop() {}
var __vue_render__ = function __vue_render__() {
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('form', _vm._b({ class: _vm.classes, attrs: { "autocomplete": _vm.autocomplete } }, 'form', _vm.$attrs, false), [_vm._t("default")], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtForm',
  props: {
    model: {
      type: Object
    },
    rules: {
      type: Object
    },
    labelWidth: {
      type: Number,
      default: 100
    },
    labelPosition: {
      type: String,
      validator: function validator(value) {
        return ['right', 'top'].indexOf(value) > -1;
      },

      default: 'right'
    },
    showMessage: {
      type: Boolean,
      default: true
    },
    inline: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String,
      validator: function validator(value) {
        return ['on', 'off'].indexOf(value) > -1;
      },

      default: 'off'
    },
    firstFields: {
      type: Boolean,
      default: true
    },
    validateOnRuleChange: {
      type: Boolean,
      default: true
    },
    disabled: Boolean, // use in form-item HOC
    labelSuffix: String
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

      return [prefix, prefix + '-' + this.labelPosition, _defineProperty({}, prefix + '-inline', this.inline)];
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
    validate: function validate(callback) {
      var _this2 = this;

      var callbackFn = callback || noop;
      return new _Promise(function (resolve, reject) {
        _this2.validateFields(undefined, function (valid, errors) {
          callbackFn(valid, errors);
          valid ? resolve() : reject(errors);
        });
      });
    },
    validateFields: function validateFields(props, callback) {
      var fields = props && props.length ? isString(props) ? this.fields.filter(function (field) {
        return props === field.prop;
      }) : this.fields.filter(function (field) {
        return props.indexOf(field.prop) > -1;
      }) : this.fields;
      if (props && props.length && !fields.length) {
        throw new Error('[warn]: must call validateField with valid prop string!');
      }

      var callbackFn = callback || noop;

      // run validate
      var valid = true;
      var count = 0;
      var errors = {};
      if (!fields.length) {
        callbackFn(valid);
      }
      fields.forEach(function (field) {
        field.validate('', function (error) {
          if (error) {
            valid = false;
            errors[field.prop] = error;
            errors.$$wt = true;
          }
          if (++count === fields.length) {
            // all finish
            callbackFn(valid, errors);
          }
        });
      });
    },
    validateField: function validateField(prop, cb) {
      deprecatedMethod('Form', 'validateField', 'Please replace validateField with method validateFields');
      return this.validateFields(prop, cb);
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