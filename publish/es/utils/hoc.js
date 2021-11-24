import _Object$keys from 'babel-runtime/core-js/object/keys';
import _extends from 'babel-runtime/helpers/extends';
function noop() {}

export default function createHoc() {
  var controlComponent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return function (Component) {
    var definedProps = _extends({}, controlComponent.props);
    var modelProp = void 0;
    var model = void 0;
    if (controlComponent.model) {
      if (controlComponent.model === true || Component.model) {
        model = _extends({
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
    }

    return _extends({}, controlComponent, {
      props: definedProps,
      model: model,
      name: controlComponent.name || 'wrapper-' + Component.name,
      WrappedComponent: WrappedComponent,
      inheritAttrs: false,

      render: function render(h) {
        var _this = this;

        var childrens = _Object$keys(this.$slots).map(function (name) {
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
        var attrs = _extends({}, this.$attrs, _props);
        return h(Component, {
          ref: options.withRef ? 'wrappedInstance' : undefined,
          key: getKey(attrs),
          attrs: attrs,
          on: _extends({}, this.$listeners, on),
          scopedSlots: scopedSlots
        }, childrens);
      }
    });
  };
}