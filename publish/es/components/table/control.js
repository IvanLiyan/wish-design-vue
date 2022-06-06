import _extends from 'babel-runtime/helpers/extends';
import createHoc from '@wish/wt-vue/es/utils/hoc';
import { getRowIdentity } from './src/utils';

var DEFAULT_TREE_FIELDNAME = {
  children: 'children',
  isLeaf: 'isLeaf'
};

export default function (name, Component) {
  return createHoc({
    name: name,
    props: {
      sortOrder: Object,
      loadedKeys: Array,
      defaultExpandAll: {
        type: Boolean,
        default: false
      },
      data: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      expandRowKeys: {
        type: Array,
        default: function _default() {
          return [];
        }
      },
      tree: Boolean,
      treeFieldNames: Object,
      rowKey: [String, Function]
    },
    data: function data() {
      return {
        state: {
          sortOrder: {},
          loadedKeys: [],
          expandRowKeys: []
        }
      };
    },

    computed: {
      isSortControlled: function isSortControlled() {
        return 'sortOrder' in this.$options.propsData;
      },
      _sortOrder: function _sortOrder() {
        return this.isSortControlled ? this.sortOrder : this.state.sortOrder;
      },
      isLoadedKeyControlled: function isLoadedKeyControlled() {
        return 'loadedKeys' in this.$options.propsData;
      },
      _loadedKeys: function _loadedKeys() {
        return this.isLoadedKeyControlled ? this.loadedKeys : this.state.loadedKeys;
      },
      table: function table() {
        return this.$refs.wrappedInstance;
      },
      isExpandedControlled: function isExpandedControlled() {
        return 'expandRowKeys' in this.$options.propsData;
      },
      _expandRowKeys: function _expandRowKeys() {
        return this.isExpandedControlled ? this.expandRowKeys : this.state.expandRowKeys;
      },
      TREE_FIELD_NAMES: function TREE_FIELD_NAMES() {
        return _extends({}, DEFAULT_TREE_FIELDNAME, this.treeFieldNames || {});
      }
    },
    watch: {
      data: {
        immediate: true,
        handler: function handler(value, oldValue) {
          var _this = this;

          var cachedRowKeys = void 0;
          if (!this.isExpandedControlled && this.defaultExpandAll) {
            if (this.tree) {
              this.state.expandRowKeys = this.reduceTreeData(this.data, []);
              cachedRowKeys = this.state.expandRowKeys;
            } else {
              this.state.expandRowKeys = this.data.map(function (item, index) {
                return getRowIdentity(item, _this.rowKey, index);
              });
            }
          }
          if (this.tree && this.$attrs['load-data'] && !this.isLoadedKeyControlled && this.data !== oldValue) {
            cachedRowKeys = this.reduceTreeData(this.data, []).reduce(function (map, key) {
              map[key] = true;
              return map;
            }, {});
            this.state.loadedKeys = this.state.loadedKeys.filter(function (key) {
              return cachedRowKeys[key];
            });
          }
        }
      }
    },
    methods: {
      handleUpdateOrder: function handleUpdateOrder(v) {
        if (!this.isSortControlled) {
          this.state.sortOrder = v;
        }
        this.$emit('update:sortOrder', v);
      },
      handleLoadedKeys: function handleLoadedKeys(keys) {
        if (!this.isLoadedKeyControlled) {
          this.state.loadedKeys = keys;
        }
        this.$emit('update:loadedKeys', keys);
      },
      handleExpand: function handleExpand(keys) {
        if (!this.isExpandedControlled) {
          this.state.expandRowKeys = keys;
        }
        this.$emit('update:expandRowKeys', keys);
      },
      reduceTreeData: function reduceTreeData(data, expandRowKeys) {
        var _this2 = this;

        var children = this.TREE_FIELD_NAMES.children;

        return data.reduce(function (keys, item) {
          if (item[children] && item[children].length) {
            var key = getRowIdentity(item, _this2.rowKey);
            keys.push(key);
            _this2.reduceTreeData(item[children], keys);
          }
          return keys;
        }, expandRowKeys);
      },

      // public methods
      doReflow: function doReflow() {
        this.$refs.wrappedInstance.doReflow();
      },
      scrollTo: function scrollTo() {
        var _table;

        (_table = this.table).scrollTo.apply(_table, arguments);
      },


      // 兼容 element，会触发相关事件，后续拆分到兼容包中
      clearSelection: function clearSelection() {
        this.table.store.clearSelection();
      },
      toggleRowSelection: function toggleRowSelection(row, selected) {
        this.table.store.toggleRowSelection(row, selected);
      },
      toggleAllSelection: function toggleAllSelection(selected) {
        this.table.store.toggleAllSelection(selected);
      },
      toggleRowExpansion: function toggleRowExpansion(row, expanded, $index) {
        this.table.store.toggleRowExpansion(row, $index, expanded);
      },
      setCurrentRow: function setCurrentRow() {}
    }
  }, {
    withRef: true,
    mapStateToProps: function mapStateToProps(context) {
      return {
        data: context.data,
        rowKey: context.rowKey,
        tree: context.tree,
        treeFieldNames: context.TREE_FIELD_NAMES,
        expandRowKeys: context._expandRowKeys,
        sortOrder: context._sortOrder,
        loadedKeys: context._loadedKeys
      };
    },
    mapMethodToListener: function mapMethodToListener(context) {
      return {
        'update:sortOrder': context.handleUpdateOrder,
        'update:loadedKeys': context.handleLoadedKeys,
        'update:expandRowKeys': context.handleExpand
      };
    }
  })(Component);
}