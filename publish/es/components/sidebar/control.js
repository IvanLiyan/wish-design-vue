import createHoc from '@wish/wt-vue/es/utils/hoc';

function isControlled(context, propName) {
  return propName in context.$options.propsData;
}

export default function (name, component) {
  return createHoc({
    model: true,
    name: name,
    props: {
      collapse: Boolean,
      activeKey: [String, Number],
      defaultActiveKey: [String, Number],
      expandKeys: Array,
      defaultExpandKeys: Array
    },
    data: function data() {
      return {
        isCollapseControlled: isControlled(this, 'collapse'),
        isActiveControlled: isControlled(this, 'activeKey'),
        isExpandControlled: isControlled(this, 'expandKeys'),
        state: {
          collapse: false,
          activeKey: this.defaultActiveKey || '',
          expandKeys: this.defaultExpandKeys || []
        }
      };
    },

    computed: {
      _collapse: function _collapse() {
        return this.isCollapseControlled ? this.collapse : this.state.collapse;
      },
      _activeKey: function _activeKey() {
        return this.isActiveControlled ? this.activeKey : this.state.activeKey;
      },
      _expandKeys: function _expandKeys() {
        return this.isExpandControlled ? this.expandKeys : this.state.expandKeys;
      }
    },
    methods: {
      updateStateCollapse: function updateStateCollapse(v) {
        this.state.collapse = v;
      },
      updateActiveKey: function updateActiveKey(k) {
        this.state.activeKey = k;
      },
      updateExpandKeys: function updateExpandKeys(ks) {
        this.state.expandKeys = ks;
      }
    }
  }, {
    mapStateToProps: function mapStateToProps(context) {
      return {
        collapse: context._collapse,
        activeKey: context._activeKey,
        expandKeys: context._expandKeys
      };
    },
    mapMethodToListener: function mapMethodToListener(context) {
      // warning 动态 lisenter 会造成监听错误
      var lisenter = {};
      if (!context.isCollapseControlled) {
        lisenter['update:collapse'] = context.updateStateCollapse;
      }
      if (!context.isActiveControlled) {
        lisenter['input'] = context.updateActiveKey;
      }
      if (!context.isExpandControlled) {
        lisenter['update:expandKeys'] = context.updateExpandKeys;
      }
      return lisenter;
    }
  })(component);
}