import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _Object$assign from 'babel-runtime/core-js/object/assign';
import _defineProperty from 'babel-runtime/helpers/defineProperty';
import _extends from 'babel-runtime/helpers/extends';
import WtLoading from '@wish/wt-vue/es/components/loading';
import Menu from './menu';
// import { isDef } from '@wish/wt-vue/es/utils/type';
import { DEFAULT_FIELD_NAMES, FILTERED_NODE_KEY } from './util.js';
import { escapeRegexpString } from '@wish/wt-vue/es/utils/util';
import _scrollIntoView from '@wish/wt-vue/es/utils/scroll-into-view';
import { CONFIG_PROVIDER, getPrefixCls } from '@wish/wt-vue/es/utils/config';

function linkedToArray(node) {
  var result = [];
  var n = node;
  var i = 0;
  while (n) {
    result[i] = n;
    i++;
    n = n.$parent;
  }
  return result.reverse();
}

function defaultFilter(filter, items, fieldNames) {
  return items.some(function (option) {
    return new RegExp(escapeRegexpString(filter), 'i').test(option[fieldNames.label]);
  });
}

var __vue_render__ = function __vue_render__() {
  var _obj;
  var _vm = this;var _h = _vm.$createElement;var _c = _vm._self._c || _h;return _c('div', { class: (_obj = {}, _obj[_vm.prefix] = true, _obj[_vm.prefix + "-filtered"] = !!_vm.filter, _obj) }, [_vm.loading ? _c('div', { class: _vm.mp + "-loading", style: { width: _vm.menuWidth } }, [_vm._t("loading", function () {
    return [_c('wt-loading', { attrs: { "message": _vm.loadingText } })];
  })], 2) : _vm._l(_vm.showNodes, function (nodes, index) {
    return _c('Menu', { key: index, ref: "menus", refInFor: true, attrs: { "nodes": nodes, "value": _vm.value[index], "no-data-text": _vm.noDataText, "no-match-text": _vm.noMatchText, "filtered": !!_vm.filter, "menu-width": _vm.menuWidth }, on: { "expand": _vm.handleExpand, "select": _vm.handleSelect, "click": _vm.handleClick, "checked": _vm.handleChecked, "mouseleave": _vm.handleMouseLeave }, scopedSlots: _vm._u([{ key: "default", fn: function fn(ref) {
          var node = ref.node;
          var data = ref.data;
          return [_vm._t("default", function () {
            return [_c('span', [_vm._v(_vm._s(node.label))])];
          }, { "node": node, "data": data })];
        } }], null, true) });
  })], 2);
};
var __vue_staticRenderFns__ = [];

export default {
  render: __vue_render__,

  staticRenderFns: __vue_staticRenderFns__,

  name: 'WtCascaderMenus',
  components: {
    Menu: Menu,
    WtLoading: WtLoading
  },
  inheritAttrs: false,
  props: {
    data: Array,
    // 单选时当前选中项
    value: {
      type: Array, // 展开值
      default: function _default() {
        return [];
      }
    },
    expandedValue: {
      type: Array, // 展开值
      default: function _default() {
        return [];
      }
    },
    noDataText: {
      type: String,
      default: '暂无数据'
    },
    expandTrigger: {
      type: String,
      default: 'click',
      validator: function validator(v) {
        return ['click', 'hover'].indexOf(v) > -1;
      }
    },
    props: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    loadData: Function,
    loading: Boolean,
    loadingText: String,
    filterable: Boolean,
    filterParent: Boolean, // 是否要过滤掉 父节点
    filter: String,
    filterMethod: {
      type: Function,
      default: defaultFilter
    },
    noMatchText: {
      type: String,
      default: '暂无搜索结果'
    },
    menuWidth: String,
    multiple: Boolean,
    checkedValues: {
      // 二维数组，内部每一个数组表示一个链路
      type: Array, // 展开值
      default: function _default() {
        return [];
      }
    },
    checkStrictly: Boolean,
    checkedStrategy: String,
    changeOnSelect: Boolean,
    expandableOnDisabled: {
      // see: https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/9014200
      type: Boolean,
      default: false
    },
    disabledStrictly: {
      type: Boolean,
      default: true
    }
  },
  provide: function provide() {
    return {
      menus: this
    };
  },

  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls: getPrefixCls
      }
    }
  },
  data: function data() {
    return {
      checkedNodes: [],
      unmatchedValues: []
    };
  },

  computed: {
    prefix: function prefix() {
      return this.config.getPrefixCls('cascader-menus');
    },
    mp: function mp() {
      return this.config.getPrefixCls('cascader-menu');
    },
    fieldNames: function fieldNames() {
      return _extends({}, DEFAULT_FIELD_NAMES, this.props);
    },
    root: function root() {
      return this.buildNodes(this.createNodes(this.data));
    },
    menuNodes: function menuNodes() {
      return this.buildMenuNodes(this.root, []);
    },
    flattenNodes: function flattenNodes() {
      // 扁平化对象，仅当 filterable 时生效，格式为 [[...parentNode, childrenNode]]
      if (this.filterable) {
        return this.getFlattenNodes(this.root);
      }
      return [];
    },
    filteredNodes: function filteredNodes() {
      var _this = this;

      // 搜索结果
      var fieldNames = this.fieldNames;

      return this.flattenNodes.filter(function (nodes) {
        var paths = nodes.map(function (node) {
          return node.data;
        });
        return _this.filterMethod(_this.filter, paths, fieldNames);
      }).map(function (nodes) {
        var labels = nodes.map(function (n) {
          return n.label;
        }).join(' / ');
        var values = nodes.map(function (n) {
          return n.value;
        });
        var node = nodes[nodes.length - 1];
        var disabled = node.disabled;

        return _defineProperty({
          label: labels,
          value: values,
          isLeaf: true,
          disabled: disabled,
          checked: node.checked,
          data: node.data,
          nodes: nodes
        }, FILTERED_NODE_KEY, true);
      });
    },
    showNodes: function showNodes() {
      if (this.filterable && this.filter) {
        return [this.filteredNodes];
      } else {
        return this.menuNodes;
      }
    },
    showCheckbox: function showCheckbox() {
      return this.multiple;
    }
  },
  methods: {
    createNodes: function createNodes(data, parent) {
      var _this2 = this;

      var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var fieldNames = this.fieldNames,
          loadData = this.loadData;

      return data.map(function (item, i) {
        var disabledField = fieldNames.disabled;

        var node = {
          $parent: parent,
          $index: i,
          level: level,
          data: item,

          value: item[fieldNames.value],
          label: item[fieldNames.label],
          isLeaf: item[fieldNames.isLeaf],
          disabled: disabledField in item ? item[disabledField] : !_this2.disabledStrictly ? false : parent && parent.disabled,
          loading: item[fieldNames.loading],

          selected: false,
          checked: false,
          hasChildrenChecked: false,
          indeterminate: false
        };
        var children = item[fieldNames.children];
        children = children && children.length ? children : undefined;
        _Object$assign(node, {
          children: children ? _this2.createNodes(children, node, level + 1) : undefined,
          hasChildren: !!children || loadData && !node.isLeaf
        });
        return node;
      });
    },
    buildNodes: function buildNodes(nodes) {
      var _this3 = this;

      if (!this.multiple) {
        return nodes;
      }
      var checkedNodes = [];
      this.unmatchedValues = [];
      this.checkedValues.forEach(function (pathValue) {
        var matched = false;
        pathValue.reduce(function (items, v, i) {
          var node = items.find(function (item) {
            return item.value === v;
          });
          if (!node) return [];
          node.hasChildrenChecked = true;
          if (i === pathValue.length - 1) {
            matched = true;
            node.checked = true;
            // 计算时忽略 disabled 节点
            !node.disabled && checkedNodes.push(node);
          }
          return node.children || [];
        }, nodes);
        if (!matched) {
          _this3.unmatchedValues.push(pathValue);
        }
      });
      if (!this.checkStrictly) {
        checkedNodes.forEach(this.updateChildChecked);
        checkedNodes.forEach(this.updateParentChecked);
      }
      return nodes;
    },
    buildMenuNodes: function buildMenuNodes(nodes, menuNodes) {
      var level = menuNodes.length;
      menuNodes[level] = nodes || [];

      var value = this.expandedValue[level];

      var node = nodes.find(function (item) {
        return item.value === value;
      });
      if (node && !node.loading && node.children) {
        this.buildMenuNodes(node.children, menuNodes);
      }
      return menuNodes;
    },
    getFlattenNodes: function getFlattenNodes(nodes) {
      var _this4 = this;

      var paths = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var flatNodes = [];
      nodes.forEach(function (node) {
        var children = node.children;
        var hasChildren = children && children.length;
        var stack = paths.concat([node]);
        if (!hasChildren) {
          flatNodes.push(stack);
        } else {
          if (!_this4.filterParent) {
            flatNodes.push(stack);
          }
          flatNodes = flatNodes.concat(_this4.getFlattenNodes(children, stack));
        }
      });
      return flatNodes;
    },
    creataLoadDataCallback: function creataLoadDataCallback(data) {
      var that = this;
      return function (children) {
        data[that.fieldNames.loading] = false;
        that.$set(data, that.fieldNames.children, children);
        var parent = that.$parent;
        if (parent && parent.updatePopper) {
          parent.updatePopper();
        }
      };
    },
    updateParentChecked: function updateParentChecked(node) {
      var parent = node.$parent;

      if (parent && !parent.disabled) {
        var children = parent.children;

        var allChecked = children.every(function (child) {
          return child.checked || child.disabled;
        });

        parent.checked = allChecked;
        parent.indeterminate = !allChecked;
        this.updateParentChecked(parent);
      }
    },
    updateChildChecked: function updateChildChecked(node) {
      var _this5 = this;

      var children = node.children;

      if (children) {
        children.forEach(function (item) {
          if (!item.checked && !item.disabled) {
            item.checked = true;
            _this5.updateChildChecked(item);
          }
        });
      }
    },
    updateParentUnChecked: function updateParentUnChecked(node) {
      var parent = node.$parent;

      if (parent) {
        var children = parent.children;

        var anyChecked = children.some(function (child) {
          // 忽略 disabled 的选项
          return !child.disabled && (child.checked || child.indeterminate);
        });

        parent.checked = false;
        parent.indeterminate = anyChecked;
        this.updateParentUnChecked(parent);
      }
    },
    updateChildUnChecked: function updateChildUnChecked(node) {
      var _this6 = this;

      var children = node.children;

      if (children) {
        children.forEach(function (item) {
          if (!item.disabled) {
            item.checked = false;
            _this6.updateChildUnChecked(item);
          }
        });
      }
    },
    handleExpand: function handleExpand(node) {
      var _this7 = this;

      var handler = function handler() {
        if (!node) {
          _this7.$emit('expanded-change', [], []);
          return;
        }
        if (node.hasChildren) {
          if (!node.children && !node.loading) {
            // 动态加载
            var data = node.data;

            _this7.$set(data, _this7.fieldNames.loading, true);
            _this7.loadData(data, _this7.creataLoadDataCallback(data));
          }

          var _getValue = _this7.getValue(node),
              values = _getValue.values,
              nodes = _getValue.nodes;

          _this7.$emit('expanded-change', values, nodes);
        }
      };
      if (this.expandTrigger === 'hover') {
        this.timer = setTimeout(handler, 150);
      } else {
        handler();
      }
    },
    handleMouseLeave: function handleMouseLeave() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    handleSelect: function handleSelect(node) {
      var _getValue2 = this.getValue(node),
          values = _getValue2.values,
          nodes = _getValue2.nodes;

      this.$emit('select', values, nodes);
    },
    handleClick: function handleClick(node) {
      var _getValue3 = this.getValue(node),
          values = _getValue3.values,
          nodes = _getValue3.nodes;

      this.$emit('click', values, nodes);
    },
    handleChecked: function handleChecked(node, _ref2) {
      var _this8 = this;

      var checked = _ref2.checked;

      var nextCheckedValues = [].concat(_toConsumableArray(this.checkedValues));

      var _getValue4 = this.getValue(node),
          nodes = _getValue4.nodes,
          values = _getValue4.values;

      var checkedPaths = [];
      if (this.checkStrictly) {
        if (checked) {
          nextCheckedValues.push(values);
        } else {
          nextCheckedValues = nextCheckedValues.filter(function (checkedValues) {
            return checkedValues.length !== values.length || checkedValues.some(function (v, i) {
              return v !== values[i];
            });
          });
        }
        checkedPaths = nextCheckedValues.map(function (checkedValue) {
          return _this8.getPathByValue(_this8.root, checkedValue);
        });
      } else {
        var lastNode = nodes[nodes.length - 1];
        lastNode.checked = checked;
        if (checked) {
          this.updateParentChecked(lastNode);
          this.updateChildChecked(lastNode);
        } else {
          this.updateParentUnChecked(lastNode);
          this.updateChildUnChecked(lastNode);
        }
        var checkedNodes = this.getCheckedNode(this.root);
        checkedPaths = checkedNodes.map(function (node) {
          return linkedToArray(node);
        });
        nextCheckedValues = checkedNodes.map(function (node) {
          var paths = linkedToArray(node);
          var values = paths.map(function (node) {
            return node.value;
          });
          return values;
        });
      }
      nextCheckedValues = [].concat(_toConsumableArray(this.unmatchedValues), _toConsumableArray(nextCheckedValues));
      this.$emit('update:checkedValues', nextCheckedValues, checkedPaths);
      // todo reset nodes
    },
    getNodes: function getNodes(values) {
      var nodes = [];
      values.reduce(function (items, v, i) {
        var node = items.find(function (item) {
          return item.value === v;
        });
        if (!node) return [];
        nodes.push(node);
        return node.children || [];
      }, this.root);
      return nodes;
    },
    getPathByValue: function getPathByValue(nodes, pathValue) {
      var paths = [];
      pathValue.reduce(function (items, v, i) {
        var node = (items || []).find(function (item) {
          return item.value === v;
        });
        node && paths.push(node);
        return node && node.children;
      }, nodes);
      return paths;
    },
    getValue: function getValue(node) {
      var nextValue = void 0;
      var nodes = void 0;
      if (node[FILTERED_NODE_KEY]) {
        var value = node.value,
            ns = node.nodes;

        nextValue = value;
        nodes = ns;
      } else {
        nodes = linkedToArray(node);
        nextValue = nodes.map(function (node) {
          return node.value;
        });
      }
      return {
        nodes: nodes,
        values: nextValue
      };
    },
    setValue: function setValue(node) {
      var nextValue = void 0;
      var nodes = void 0;
      if (node[FILTERED_NODE_KEY]) {
        var value = node.value,
            ns = node.nodes;

        nextValue = value;
        nodes = ns;
      } else {
        nodes = linkedToArray(node);
        nextValue = nodes.map(function (node) {
          return node.value;
        });
      }
      this.$emit('input', nextValue);
      this.$emit('expand', nextValue, nodes);
    },
    scrollIntoView: function scrollIntoView() {
      var _this9 = this;

      // scroll all
      (this.$refs.menus || []).forEach(function (menu) {
        var el = menu.$el;
        _scrollIntoView(el, el.getElementsByClassName(_this9.mp + '-item-active')[0]);
      });
    },
    getCheckedNode: function getCheckedNode(nodes) {
      var checkedStrategy = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.checkedStrategy;

      var checkedNodes = [];
      function flatChecked(node) {
        var children = node.children,
            checked = node.checked;

        if (checked) {
          checkedNodes.push(node);
        }
        children && children.forEach(flatChecked);
      }
      nodes.forEach(flatChecked);
      if (checkedStrategy === 'children') {
        return checkedNodes.filter(function (node) {
          return !node.children;
        });
      } else if (checkedStrategy === 'parent') {
        return checkedNodes.filter(function (node) {
          var $parent = node.$parent;

          return !$parent || node.disabled || !$parent.checked;
        });
      }
      return checkedNodes;
    }
  }
};