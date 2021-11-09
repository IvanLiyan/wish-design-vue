'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = createHoc;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function noop() {}

function createHoc() {
  var controlComponent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function (Component) {
    var definedProps = (0, _extends3.default)({}, controlComponent.props);
    var modelProp = void 0;
    var model = void 0;
    if (controlComponent.model) {
      if (controlComponent.model === true || Component.model) {
        model = (0, _extends3.default)({
          prop: 'value',
          event: 'input'
        }, Component.model);
      } else {
        model = controlComponent.model;
      }
      modelProp = model.prop;
      if (!definedProps[modelProp]) {
        definedProps[modelProp] = {};
      }
    }
    var WrappedComponent = Component;
    while (WrappedComponent.WrappedComponent) {
      WrappedComponent = WrappedComponent.WrappedComponent;
    };

    return (0, _extends3.default)({}, controlComponent, {
      props: definedProps,
      model: model,
      name: controlComponent.name || 'wrapper-' + Component.name,
      WrappedComponent: WrappedComponent,
      inheritAttrs: false,
      render: function render(h) {
        var _this = this;

        var childrens = (0, _keys2.default)(this.$slots).map(function (name) {
          var slot = _this.$slots[name];
          if (name === 'default') {
            return slot;
          }
          return h('template', { attrs: { slot: name }, slot: name }, slot);
        });
        var mapStateToProps = options.mapStateToProps || noop;
        var mapToLisenter = options.mapMethodToListener || noop;
        var getScopedSlots = options.getScopedSlots;
        var getKey = options.key || noop;
        var _props = mapStateToProps(this);
        var on = mapToLisenter(this);

        // 注入 v-model 绑定的属性
        if (modelProp && !_props.hasOwnProperty(modelProp)) {
          _props[modelProp] = this[modelProp];
        }

        var scopedSlots = getScopedSlots ? getScopedSlots(this, this.$scopedSlots) : this.$scopedSlots;
        var attrs = (0, _extends3.default)({}, this.$attrs, _props);
        return h(Component, {
          ref: options.withRef ? 'wrappedInstance' : undefined,
          key: getKey(attrs),
          attrs: attrs,
          on: (0, _extends3.default)({}, this.$listeners, on),
          scopedSlots: scopedSlots
        }, childrens);
      }
    });
  };
}