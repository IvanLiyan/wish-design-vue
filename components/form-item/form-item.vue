<template>
  <div :class="classes">
    <label :class="`${prefix}-label`" :for="labelFor" :style="labelStyles" v-if="label || $slots.label"
      ><slot name="label">{{ label }}{{ labelSuffix }}</slot>
    </label>
    <div :class="`${prefix}-content`">
      <slot></slot>
      <transition name="fade-in" @after-leave="handleAfterLeave">
        <div
          :class="{
            [`${prefix}-error-tip`]: true,
          }"
          v-if="showError"
        >
          <slot :message="validateMessage" name="error">
            <!-- <div v-if="useHtmlMessage" v-html="validateMessage"></div> -->
            <template>{{ validateMessage }}</template>
          </slot>
        </div>
      </transition>
      <transition v-if="helperPlacement !== 'right'" name="fade-in" @after-leave="handleAfterLeave">
        <div :class="`${prefix}-helper`" v-if="helper || $slots.helper">
          <slot name="helper">{{ helper }}</slot>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import AsyncValidator from 'async-validator';
import { getPropByPath } from '@/utils/util';
import { hasProps } from '@/utils/vnode';
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

export default {
  name: 'WtFormItem',
  props: {
    label: {
      type: String,
      default: '',
    },
    labelWidth: {
      type: Number,
    },
    prop: {
      type: String,
    },
    required: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: [Object, Array],
    },
    error: {
      type: String,
    },
    validateStatus: {
      type: String,
    },
    showMessage: {
      type: Boolean,
    },
    labelFor: {
      type: String,
    },
    helper: {
      type: String,
    },
    helperPlacement: {
      type: String,
      default: 'bottom',
      validator(v) {
        return ['right', 'bottom'].indexOf(v) > -1;
      },
    },
    validatePlacement: {
      type: String,
      default: 'bottom',
    },
    useHtmlMessage: Boolean,
    labelPosition: {
      type: String,
    },
  },
  provide() {
    return {
      formItem: this,
    };
  },
  data() {
    return {
      validateState: this.error ? 'error' : '',
      validateMessage: this.error || '',
      validateDisabled: false,
      isFadeIn: false,
    };
  },
  computed: {
    isRequired() {
      const rules = this.getRules();
      if (rules.length) {
        return rules.some((rule) => {
          return rule.required;
        });
      }
      return false;
    },
    prefix() {
      return this.config.getPrefixCls('form-item');
    },
    isNested() {
      return this.formItem && this.form === this.formItem.form;
    },
    needShowError() {
      return hasProps(this, 'showMessage') ? this.showMessage : this.form.showMessage;
    },
    showError() {
      return this.validateMessage && this.needShowError;
    },
    classes() {
      const { isFadeIn, validateState, prefix } = this;
      const error = (isFadeIn && validateState !== 'warning') || validateState === 'error';
      return {
        [prefix]: true,
        [`${prefix}-required`]: this.required || this.isRequired,
        [`${prefix}-error`]: error,
        [`${prefix}-warning`]: validateState === 'warning',
        [`${prefix}-validating`]: this.validateState === 'validating',
        [`${prefix}-error-${this.validatePlacement}`]: isFadeIn,
        [`${prefix}-${this.$labelPosition}`]: this.$labelPosition,
      };
    },
    fieldValue: {
      cache: false,
      get() {
        const model = this.form.model;
        if (!model || !this.prop) {
          return;
        }

        let path = this.prop;
        if (path.indexOf(':') !== -1) {
          path = path.replace(/:/, '.');
        }

        return getPropByPath(model, path).v;
      },
    },
    realLabelWidth() {
      return this.labelWidth || this.labelWidth === 0 ? this.labelWidth : this.form.labelWidth;
    },
    $labelPosition() {
      return this.labelPosition || this.form.labelPosition;
    },
    labelStyles() {
      const style = {};
      if (this.$labelPosition === 'top') {
        return style;
      }
      const labelWidth = this.realLabelWidth;
      if (labelWidth) {
        style.width = `${labelWidth}px`;
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
    isStatusControl() {
      return 'validateStatus' in this.$options.propsData;
    },
    state() {
      return this.isStatusControl ? this.validateStatus : this.validateState;
    },
    labelSuffix() {
      return this.form.labelSuffix;
    },
  },
  watch: {
    error(val) {
      this.validateMessage = val;
      this.validateState = val === '' ? '' : 'error';
    },
    validateStatus(val) {
      this.validateState = val;
    },
    showError(n) {
      if (n) {
        this.isFadeIn = true;
      }
    },
  },
  inject: {
    form: {
      default: undefined,
    },
    formItem: {
      default: undefined,
    },
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  mounted() {
    if (this.prop) {
      this.form.$emit('addFormItem', this);

      Object.defineProperty(this, 'initialValue', {
        value: this.fieldValue,
      });
      this.$on('formBlur', this.onFieldBlur);
      this.$on('formChange', this.onFieldChange);
    }
  },
  beforeDestroy() {
    this.form.$emit('removeFormItem', this);
  },
  methods: {
    getRules() {
      let formRules = this.form.rules;
      const selfRules = this.rules;

      formRules = formRules ? formRules[this.prop] : [];

      const rules = [].concat(selfRules || formRules || []);
      if (this.required && rules.every((rule) => !rule.required)) {
        rules.push({ required: true, message: '必填' });
      }
      return rules;
    },
    getFilteredRule(trigger) {
      const rules = this.getRules();

      return rules.filter((rule) => !trigger || !rule.trigger || rule.trigger.indexOf(trigger) > -1);
    },
    validate(trigger, callback = function () {}) {
      const rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) {
        callback();
        return;
      }

      const isWeak = rules.some((rule) => rule.isWeak); // 兼容优选组件库，true 表示可以校验失败，不阻塞正常流程。
      this.validateState = 'validating';

      const descriptor = {};
      descriptor[this.prop] = rules;

      const validator = new AsyncValidator(descriptor);
      const model = {
        ...this.form.model,
      };

      model[this.prop] = this.fieldValue;
      const firstFields = this.form.firstFields;

      validator.validate(model, { firstFields }, (errors) => {
        this.validateState = !errors ? 'success' : isWeak ? 'warning' : 'error';
        this.validateMessage = errors ? errors[0].message : '';

        callback(isWeak ? '' : this.validateMessage);
      });
      this.validateDisabled = false;
    },
    resetField() {
      this.validateState = '';
      this.validateMessage = '';

      const model = this.form.model;
      const value = this.fieldValue;
      let path = this.prop;
      if (path.indexOf(':') !== -1) {
        path = path.replace(/:/, '.');
      }

      const prop = getPropByPath(model, path);
      this.validateDisabled = true;
      if (Array.isArray(value)) {
        prop.o[prop.k] = [].concat(this.initialValue);
      } else {
        prop.o[prop.k] = this.initialValue;
      }
    },
    clearValidate() {
      this.validateState = '';
      this.validateMessage = '';
      this.validateDisabled = false;
    },

    onFieldBlur() {
      this.validate('blur');
    },
    onFieldChange() {
      if (this.validateDisabled) {
        this.validateDisabled = false;
        return;
      }

      this.validate('change');
    },
    handleAfterLeave() {
      this.isFadeIn = false;
    },
  },
};
</script>
