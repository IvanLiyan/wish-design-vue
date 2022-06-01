import _extends from 'babel-runtime/helpers/extends';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import AsyncValidator from 'async-validator';
import { getPropByPath } from '@wish/wt-vue/es/utils/util';
import { hasProps } from '@wish/wt-vue/es/utils/vnode';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: _vm.classes }, [_c('div', { class: _vm.prefix + "-content" }, [_vm._t("default"), _vm._v(" "), _c('transition', { attrs: { "name": "fade-in" }, on: { "after-leave": _vm.handleAfterLeave } }, [_vm.showError ? _c('div', { class: (_obj = {}, _obj[_vm.prefix + "-error-tip"] = true, _obj) }, [_vm._t("error", function () {
    return [[_vm._v(_vm._s(_vm.validateMessage))]];
  }, { "message": _vm.validateMessage })], 2) : _vm._e()]), _vm._v(" "), _vm.helperPlacement !== 'right' ? _c('transition', { attrs: { "name": "fade-in" }, on: { "after-leave": _vm.handleAfterLeave } }, [_vm.helper || _vm.$slots.helper ? _c('div', { class: _vm.prefix + "-helper" }, [_vm._t("helper", function () {
    return [_vm._v(_vm._s(_vm.helper))];
  })], 2) : _vm._e()]) : _vm._e()], 2)]);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtFormItem',
  props: {
    prop: {
      type: String
    },
    span: {
      type: Number,
      default: 24
    },
    offset: {
      type: Number
    },

    required: {
      type: Boolean,
      default: false
    },
    rules: {
      type: [Object, Array]
    },
    error: {
      type: String
    },
    validateStatus: {
      type: String
    },
    showMessage: {
      type: Boolean
    },

    helper: {
      type: String
    },
    helperPlacement: {
      type: String,
      default: 'bottom',
      validator: function validator(v) {
        return ['right', 'bottom'].indexOf(v) > -1;
      }
    },
    validatePlacement: {
      type: String,
      default: 'bottom'
    },
    useHtmlMessage: Boolean,
    labelPosition: {
      type: String
    }
  },
  provide: function provide() {
    return {
      formItem: this
    };
  },
  data: function data() {
    return {
      validateState: this.error ? 'error' : '',
      validateMessage: this.error || '',
      validateDisabled: false,
      isFadeIn: false
    };
  },

  computed: {
    isRequired: function isRequired() {
      var rules = this.getRules();
      if (rules.length) {
        return rules.some(function (rule) {
          return rule.required;
        });
      }
      return false;
    },
    prefix: function prefix() {
      return this.config.getPrefixCls('form-item');
    },
    isNested: function isNested() {
      return this.formItem && this.form === this.formItem.form;
    },
    needShowError: function needShowError() {
      return hasProps(this, 'showMessage') ? this.showMessage : this.form.showMessage;
    },
    showError: function showError() {
      return this.validateMessage && this.needShowError;
    },
    classes: function classes() {
      var _ref;

      var isFadeIn = this.isFadeIn,
          validateState = this.validateState,
          prefix = this.prefix,
          span = this.span,
          offset = this.offset;

      var error = isFadeIn && validateState !== 'warning' || validateState === 'error';
      return _ref = {}, _defineProperty(_ref, prefix, true), _defineProperty(_ref, 'span-' + span, true), _defineProperty(_ref, 'offset-' + offset, true), _defineProperty(_ref, prefix + '-required', this.required || this.isRequired), _defineProperty(_ref, prefix + '-error', error), _defineProperty(_ref, prefix + '-warning', validateState === 'warning'), _defineProperty(_ref, prefix + '-validating', this.validateState === 'validating'), _defineProperty(_ref, prefix + '-error-' + this.validatePlacement, isFadeIn), _defineProperty(_ref, prefix + '-' + this.$labelPosition, this.$labelPosition), _ref;
    },

    fieldValue: {
      cache: false,
      get: function get() {
        var model = this.form.model;
        if (!model || !this.prop) {
          return;
        }

        var path = this.prop;
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.');
        }

        return getPropByPath(model, path).v;
      }
    },
    realLabelWidth: function realLabelWidth() {
      return this.labelWidth || this.labelWidth === 0 ? this.labelWidth : this.form.labelWidth;
    },
    $labelPosition: function $labelPosition() {
      return this.labelPosition || this.form.labelPosition;
    },
    labelStyles: function labelStyles() {
      var style = {};
      if (this.$labelPosition === 'top') {
        return style;
      }
      var labelWidth = this.realLabelWidth;
      if (labelWidth) {
        style.width = labelWidth + 'px';
      }
      return style;
    },

    // contentStyles() {
    //   const style = {};
    //   if (this.$labelPosition === 'top') {
    //     return style;
    //   }
    //   if ((this.form.inline || this.isNested) && !this.label && !this.$slots.label) {
    //     return style;
    //   }
    //   const labelWidth = this.realLabelWidth;
    //   if (labelWidth) {
    //     style.marginLeft = `${labelWidth}px`;
    //   }
    //   return style;
    // },
    isStatusControl: function isStatusControl() {
      return 'validateStatus' in this.$options.propsData;
    },
    state: function state() {
      return this.isStatusControl ? this.validateStatus : this.validateState;
    }
  },
  watch: {
    error: function error(val) {
      this.validateMessage = val;
      this.validateState = val === '' ? '' : 'error';
    },
    validateStatus: function validateStatus(val) {
      this.validateState = val;
    },
    showError: function showError(n) {
      if (n) {
        this.isFadeIn = true;
      }
    }
  },
  inject: {
    form: {
      default: undefined
    },
    formItem: {
      default: undefined
    },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  mounted: function mounted() {
    if (this.prop) {
      this.form.$emit('addFormItem', this);

      Object.defineProperty(this, 'initialValue', {
        value: this.fieldValue
      });
      this.$on('formBlur', this.onFieldBlur);
      this.$on('formChange', this.onFieldChange);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.form.$emit('removeFormItem', this);
  },

  methods: {
    getRules: function getRules() {
      var formRules = this.form.rules;
      var selfRules = this.rules;

      formRules = formRules ? formRules[this.prop] : [];

      var rules = [].concat(selfRules || formRules || []);
      if (this.required && rules.every(function (rule) {
        return !rule.required;
      })) {
        rules.push({ required: true, message: '必填' });
      }
      return rules;
    },
    getFilteredRule: function getFilteredRule(trigger) {
      var rules = this.getRules();

      return rules.filter(function (rule) {
        return !trigger || !rule.trigger || rule.trigger.indexOf(trigger) > -1;
      });
    },
    validate: function validate(trigger) {
      var _this = this;

      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      var rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) {
        callback();
        return;
      }

      var isWeak = rules.some(function (rule) {
        return rule.isWeak;
      }); // 兼容优选组件库，true 表示可以校验失败，不阻塞正常流程。
      this.validateState = 'validating';

      var descriptor = {};
      descriptor[this.prop] = rules;

      var validator = new AsyncValidator(descriptor);
      var model = _extends({}, this.form.model);

      model[this.prop] = this.fieldValue;

      validator.validate(model, function (errors) {
        _this.validateState = !errors ? 'success' : isWeak ? 'warning' : 'error';
        _this.validateMessage = errors ? errors[0].message : '';

        callback(isWeak ? '' : _this.validateMessage);
      });
      this.validateDisabled = false;
    },
    resetField: function resetField() {
      this.validateState = '';
      this.validateMessage = '';

      var model = this.form.model;
      // const value = this.fieldValue;
      var path = this.prop;
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.');
      }

      var prop = getPropByPath(model, path);
      this.validateDisabled = true;
      // if (Array.isArray(value)) {
      //   prop.o[prop.k] = [].concat(this.initialValue);
      // } else {
      //   prop.o[prop.k] = this.initialValue;
      // }
      prop.o[prop.k] = this.initialValue;
    },
    clearValidate: function clearValidate() {
      this.validateState = '';
      this.validateMessage = '';
      this.validateDisabled = false;
    },
    onFieldBlur: function onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange: function onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }

      this.validate('change');
    },
    handleAfterLeave: function handleAfterLeave() {
      this.isFadeIn = false;
    }
  }
};