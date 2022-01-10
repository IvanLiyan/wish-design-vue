<template>
  <form v-bind="$attrs" :class="classes"
    :autocomplete="autocomplete"><slot></slot></form>
</template>
<script>
import { isString } from '@/utils/type';
import { deprecatedMethod } from '@/utils/console';
import {
  CONFIG_PROVIDER,
  getPrefixCls,
} from '@/utils/config';

function noop () {}
export default {
  name: 'WtForm',
  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
    labelWidth: {
      type: Number,
      default: 100,
    },
    labelPosition: {
      type: String,
      validator (value) {
        return ['right', 'top'].indexOf(value) > -1;
      },
      default: 'right',
    },
    showMessage: {
      type: Boolean,
      default: true,
    },
    inline: {
      type: Boolean,
      default: false,
    },
    autocomplete: {
      type: String,
      validator (value) {
        return ['on', 'off'].indexOf(value) > -1;
      },
      default: 'off',
    },
    firstFields: {
      type: Boolean,
      default: true,
    },
    validateOnRuleChange: {
      type: Boolean,
      default: true,
    },
    disabled: Boolean, // use in form-item HOC
    labelSuffix: String,
  },
  provide () {
    return { form: this };
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  data () {
    return {
      fields: [],
    };
  },
  computed: {
    prefix () {
      return this.config.getPrefixCls('form');
    },
    classes () {
      const { prefix } = this;
      return [
        prefix,
        `${prefix}-${this.labelPosition}`,
        {
          [`${prefix}-inline`]: this.inline,
        },
      ];
    },
  },
  watch: {
    rules () {
      if (this.validateOnRuleChange) {
        this.validate().catch(function (e) {});
      }
    },
  },
  created () {
    this.$on('addFormItem', field => {
      if (field && field.prop) this.fields.push(field);
      return false;
    });
    this.$on('removeFormItem', field => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1);
      return false;
    });
  },
  methods: {
    resetFields (props) {
      const fields = props && props.length
        ? (isString(props)
          ? this.fields.filter(field => props === field.prop)
          : this.fields.filter(field => props.indexOf(field.prop) > -1)
        ) : this.fields;
      fields.forEach(field => {
        field.resetField();
      });
    },
    validate (callback) {
      const callbackFn = callback || noop;
      return new Promise((resolve, reject) => {
        this.validateFields(undefined, function (valid, errors) {
          callbackFn(valid, errors);
          valid ? resolve() : reject(errors);
        });
      });
    },

    validateFields (props, callback) {
      const fields = props && props.length
        ? (isString(props)
          ? this.fields.filter(field => props === field.prop)
          : this.fields.filter(field => props.indexOf(field.prop) > -1)
        ) : this.fields;
      if (props && props.length && !fields.length) {
        throw new Error(
          '[warn]: must call validateField with valid prop string!',
        );
      }

      const callbackFn = callback || noop;

      // run validate
      let valid = true;
      let count = 0;
      const errors = {};
      if (!fields.length) {
        callbackFn(valid);
      }
      fields.forEach(field => {
        field.validate('', error => {
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

    validateField (prop, cb) {
      deprecatedMethod('Form', 'validateField', 'Please replace validateField with method validateFields');
      return this.validateFields(prop, cb);
    },
    clearValidate (props = []) {
      const fields = props.length
        ? (isString(props)
          ? this.fields.filter(field => props === field.prop)
          : this.fields.filter(field => props.indexOf(field.prop) > -1)
        ) : this.fields;
      fields.forEach(field => {
        field.clearValidate();
      });
    },
  },
};
</script>
