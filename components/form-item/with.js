import createHoc from '@/utils/hoc';
import { hasProps } from '@/utils/vnode';
/**
 *
 * @param {string} name
 * @param {VueComponent} Component
 * @param {Object} options
 * @param {boolean} options.blur 是否需要 blur 事件
 */
export default function (name, Component, options = {}) {
  return createHoc(
    {
      name: name,
      model: true,
      props: {
        formNoValidate: Boolean,
        disabled: Boolean,
      },
      inject: {
        formItem: {
          default: undefined,
        },
        form: {
          default: undefined,
        },
      },
      data() {
        return {
          options,
        };
      },
      computed: {
        invalid() {
          if ('invalid' in this.$attrs) {
            return this.$attrs.invalid;
          }
          return this.formItem && this.formItem.state === 'error';
        },
        hasProp() {
          return this.formItem && this.formItem.prop;
        },
        loading() {
          // 未来往下注入 validating 属性
          if (options.noLoading || 'loading' in this.$attrs) {
            return this.$attrs.loading;
          }
          return this.formItem && this.formItem.state === 'validating';
        },
        _disabled() {
          if (hasProps(this, 'disabled')) {
            return this.disabled;
          }
          return (this.form || {}).disabled;
        },
      },
      methods: {
        ...options.methods,
        _handleBlur(...args) {
          this.$emit('blur', ...args);
          if (!this.formNoValidate && !options.blur && this.hasProp) {
            this.$nextTick(() => {
              this.formItem && this.formItem.$emit('formBlur');
            });
          }
        },
        _handleChange(...args) {
          this.$emit('change', ...args);
          if (!this.formNoValidate && this.hasProp) {
            this.formItem && this.formItem.$emit('formChange');
          }
        },
      },
    },
    {
      ...options,
      mapStateToProps(context) {
        return {
          invalid: context.invalid,
          loading: context.loading,
          disabled: context._disabled,
        };
      },
      mapMethodToListener(context) {
        return {
          blur: context._handleBlur,
          change: context._handleChange,
        };
      },
    },
  )(Component);
}
