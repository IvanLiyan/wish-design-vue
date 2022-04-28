import createHoc from '@/utils/hoc';
import { getRowIdentity } from './src/utils';

const DEFAULT_TREE_FIELDNAME = {
  children: 'children',
  isLeaf: 'isLeaf',
};

export default function (name, Component) {
  return createHoc({
    name: name,
    props: {
      sortOrder: Object,
      loadedKeys: Array,
      defaultExpandAll: {
        type: Boolean,
        default: false,
      },
      data: {
        type: Array,
        default: function () {
          return [];
        },
      },
      expandRowKeys: {
        type: Array,
        default: function () {
          return [];
        },
      },
      tree: Boolean,
      treeFieldNames: Object,
      rowKey: [String, Function],
    },
    data () {
      return {
        state: {
          sortOrder: {},
          loadedKeys: [],
          expandRowKeys: [],
        },
      };
    },
    computed: {
      isSortControlled () {
        return 'sortOrder' in this.$options.propsData;
      },
      _sortOrder () {
        return this.isSortControlled ? this.sortOrder : this.state.sortOrder;
      },
      isLoadedKeyControlled () {
        return 'loadedKeys' in this.$options.propsData;
      },
      _loadedKeys () {
        return this.isLoadedKeyControlled ? this.loadedKeys : this.state.loadedKeys;
      },
      table () {
        return this.$refs.wrappedInstance;
      },
      isExpandedControlled () {
        return 'expandRowKeys' in this.$options.propsData;
      },
      _expandRowKeys () {
        return this.isExpandedControlled ? this.expandRowKeys : this.state.expandRowKeys;
      },
      TREE_FIELD_NAMES () {
        return {
          ...DEFAULT_TREE_FIELDNAME,
          ...(this.treeFieldNames || {}),
        };
      },
    },
    watch: {
      data: {
        immediate: true,
        handler (value, oldValue) {
          let cachedRowKeys;
          if (!this.isExpandedControlled && this.defaultExpandAll) {
            if (this.tree) {
              this.state.expandRowKeys = this.reduceTreeData(this.data, []);
              cachedRowKeys = this.state.expandRowKeys;
            } else {
              this.state.expandRowKeys = this.data.map((item, index) => {
                return getRowIdentity(item, this.rowKey, index);
              });
            }
          }
          if (this.tree && this.$attrs['load-data'] &&
            !this.isLoadedKeyControlled &&
            this.data !== oldValue
          ) {
            cachedRowKeys = this.reduceTreeData(this.data, []).reduce(function (map, key) {
              map[key] = true;
              return map;
            }, {});
            this.state.loadedKeys = this.state.loadedKeys.filter(function (key) {
              return cachedRowKeys[key];
            });
          }
        },
      },
    },
    methods: {
      handleUpdateOrder (v) {
        if (!this.isSortControlled) {
          this.state.sortOrder = v;
        }
        this.$emit('update:sortOrder', v);
      },
      handleLoadedKeys (keys) {
        if (!this.isLoadedKeyControlled) {
          this.state.loadedKeys = keys;
        }
        this.$emit('update:loadedKeys', keys);
      },
      handleExpand (keys) {
        if (!this.isExpandedControlled) {
          this.state.expandRowKeys = keys;
        }
        this.$emit('update:expandRowKeys', keys);
      },
      reduceTreeData (data, expandRowKeys) {
        const { children } = this.TREE_FIELD_NAMES;
        return data.reduce((keys, item) => {
          if (item[children] && item[children].length) {
            const key = getRowIdentity(item, this.rowKey);
            keys.push(key);
            this.reduceTreeData(item[children], keys);
          }
          return keys;
        }, expandRowKeys);
      },
      // public methods
      doReflow () {
        this.$refs.wrappedInstance.doReflow();
      },
      scrollTo (...args) {
        this.table.scrollTo(...args);
      },

      // 兼容 element，会触发相关事件，后续拆分到兼容包中
      clearSelection () {
        this.table.store.clearSelection();
      },
      toggleRowSelection (row, selected) {
        this.table.store.toggleRowSelection(row, selected);
      },
      toggleAllSelection (selected) {
        this.table.store.toggleAllSelection(selected);
      },
      toggleRowExpansion (row, expanded, $index) {
        this.table.store.toggleRowExpansion(row, $index, expanded);
      },
      setCurrentRow () {

      },
    },
  }, {
    withRef: true,
    mapStateToProps (context) {
      return {
        data: context.data,
        rowKey: context.rowKey,
        tree: context.tree,
        treeFieldNames: context.TREE_FIELD_NAMES,
        expandRowKeys: context._expandRowKeys,
        sortOrder: context._sortOrder,
        loadedKeys: context._loadedKeys,
      };
    },
    mapMethodToListener (context) {
      return {
        'update:sortOrder': context.handleUpdateOrder,
        'update:loadedKeys': context.handleLoadedKeys,
        'update:expandRowKeys': context.handleExpand,
      };
    },
  })(Component);
}
