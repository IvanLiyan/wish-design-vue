import createHoc from '@/utils/hoc';

function isControlled (context, propName) {
  return propName in context.$options.propsData;
}

export default function (name, component) {
  return createHoc({
    model: true,
    name,
    props: {
      collapse: Boolean,
      activeKey: [String, Number],
      defaultActiveKey: [String, Number],
      expandKeys: Array,
      defaultExpandKeys: Array,
    },
    data () {
      return {
        isCollapseControlled: isControlled(this, 'collapse'),
        isActiveControlled: isControlled(this, 'activeKey'),
        isExpandControlled: isControlled(this, 'expandKeys'),
        state: {
          collapse: false,
          activeKey: this.defaultActiveKey || '',
          expandKeys: this.defaultExpandKeys || [],
        },
      };
    },
    computed: {
      _collapse () {
        return this.isCollapseControlled ? this.collapse : this.state.collapse;
      },
      _activeKey () {
        return this.isActiveControlled ? this.activeKey : this.state.activeKey;
      },
      _expandKeys () {
        return this.isExpandControlled ? this.expandKeys
          : this.state.expandKeys;
      },
    },
    methods: {
      updateStateCollapse (v) {
        this.state.collapse = v;
      },
      updateActiveKey (k) {
        this.state.activeKey = k;
      },
      updateExpandKeys (ks) {
        this.state.expandKeys = ks;
      },
    },
  }, {
    mapStateToProps (context) {
      return {
        collapse: context._collapse,
        activeKey: context._activeKey,
        expandKeys: context._expandKeys,
      };
    },
    mapMethodToListener (context) {
      // warning 动态 lisenter 会造成监听错误
      const lisenter = {};
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
    },
  })(component);
}
