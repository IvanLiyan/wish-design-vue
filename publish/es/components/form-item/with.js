import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _extends from 'babel-runtime/helpers/extends';
import createHoc from '@wish/wt-vue/es/utils/hoc';
import { hasProps } from '@wish/wt-vue/es/utils/vnode';
/**
 *
 * @param {string} name
 * @param {VueComponent} Component
 * @param {Object} options
 * @param {boolean} options.blur 是否需要 blur 事件
 */
export default function (name, Component) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return createHoc({
    name: name,
    model: true,
    props: {
      formNoValidate: Boolean,
      disabled: Boolean
    },
    inject: {
      formItem: {
        default: undefined
      },
      form: {
        default: undefined
      }
    },
    data: function data() {
      return {
        options: options
      };
    },

    computed: {
      invalid: function invalid() {
        if ('invalid' in this.$attrs) {
          return this.$attrs.invalid;
        }
        return this.formItem && this.formItem.state === 'error';
      },
      hasProp: function hasProp() {
        return this.formItem && this.formItem.prop;
      },
      loading: function loading() {
        // 未来往下注入 validating 属性
        if (options.noLoading || 'loading' in this.$attrs) {
          return this.$attrs.loading;
        }
        return this.formItem && this.formItem.state === 'validating';
      },
      _disabled: function _disabled() {
        if (hasProps(this, 'disabled')) {
          return this.disabled;
        }
        return (this.form || {}).disabled;
      }
    },
    methods: _extends({}, options.methods, {
      _handleBlur: function _handleBlur() {
        var _this = this;

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        this.$emit.apply(this, ['blur'].concat(_toConsumableArray(args)));
        if (!this.formNoValidate && !options.blur && this.hasProp) {
          this.$nextTick(function () {
            _this.formItem && _this.formItem.$emit('formBlur');
          });
        }
      },
      _handleChange: function _handleChange() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        this.$emit.apply(this, ['change'].concat(_toConsumableArray(args)));
        if (!this.formNoValidate && this.hasProp) {
          this.formItem && this.formItem.$emit('formChange');
        }
      }
    })
  }, _extends({}, options, {
    mapStateToProps: function mapStateToProps(context) {
      return {
        invalid: context.invalid,
        loading: context.loading,
        disabled: context._disabled
      };
    },
    mapMethodToListener: function mapMethodToListener(context) {
      return {
        blur: context._handleBlur,
        change: context._handleChange
      };
    }
  }))(Component);
};