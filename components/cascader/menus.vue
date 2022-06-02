<template>
  <div
    :class="{
      [prefix]: true,
      [`${prefix}-filtered`]: !!filter,
    }"
  >
    <div :class="`${mp}-loading`" v-if="loading" :style="{ width: menuWidth }">
      <slot name="loading"><wt-loading :message="loadingText" /></slot>
    </div>
    <template v-else>
      <Menu
        v-for="(nodes, index) in showNodes"
        ref="menus"
        :key="index"
        :nodes="nodes"
        :value="value[index]"
        :no-data-text="noDataText"
        :no-match-text="noMatchText"
        :filtered="!!filter"
        :menu-width="menuWidth"
        @expand="handleExpand"
        @select="handleSelect"
        @click="handleClick"
        @checked="handleChecked"
        @mouseleave="handleMouseLeave"
      >
        <template slot-scope="{ node, data }">
          <slot :node="node" :data="data"
            ><span>{{ node.label }}</span></slot
          >
        </template>
      </Menu>
    </template>
  </div>
</template>
<script>
import WtLoading from '@components/loading';
import Menu from './menu';
// import { isDef } from '@/utils/type';
import { DEFAULT_FIELD_NAMES, FILTERED_NODE_KEY } from './util.js';
import { escapeRegexpString } from '@/utils/util';
import scrollIntoView from '@/utils/scroll-into-view';
import { CONFIG_PROVIDER, getPrefixCls } from '@/utils/config';

function linkedToArray(node) {
  const result = [];
  let n = node;
  let i = 0;
  while (n) {
    result[i] = n;
    i++;
    n = n.$parent;
  }
  return result.reverse();
}

function defaultFilter(filter, items, fieldNames) {
  return items.some((option) => new RegExp(escapeRegexpString(filter), 'i').test(option[fieldNames.label]));
}

export default {
  name: 'WtCascaderMenus',
  components: {
    Menu,
    WtLoading,
  },
  inheritAttrs: false,
  props: {
    data: Array,
    // 单选时当前选中项
    value: {
      type: Array, // 展开值
      default() {
        return [];
      },
    },
    expandedValue: {
      type: Array, // 展开值
      default() {
        return [];
      },
    },
    noDataText: {
      type: String,
      default: '暂无数据',
    },
    expandTrigger: {
      type: String,
      default: 'click',
      validator(v) {
        return ['click', 'hover'].indexOf(v) > -1;
      },
    },
    props: {
      type: Object,
      default() {
        return {};
      },
    },
    loadData: Function,
    loading: Boolean,
    loadingText: String,
    filterable: Boolean,
    filterParent: Boolean, // 是否要过滤掉 父节点
    filter: String,
    filterMethod: {
      type: Function,
      default: defaultFilter,
    },
    noMatchText: {
      type: String,
      default: '暂无搜索结果',
    },
    menuWidth: String,
    multiple: Boolean,
    checkedValues: {
      // 二维数组，内部每一个数组表示一个链路
      type: Array, // 展开值
      default() {
        return [];
      },
    },
    checkStrictly: Boolean,
    checkedStrategy: String,
    changeOnSelect: Boolean,
    expandableOnDisabled: {
      // see: https://ones.sankuai.com/ones/product/4348/workItem/requirement/detail/9014200
      type: Boolean,
      default: false,
    },
    disabledStrictly: {
      type: Boolean,
      default: true,
    },
  },
  provide() {
    return {
      menus: this,
    };
  },
  inject: {
    config: {
      from: CONFIG_PROVIDER,
      default: {
        getPrefixCls,
      },
    },
  },
  data() {
    return {
      checkedNodes: [],
      unmatchedValues: [],
    };
  },
  computed: {
    prefix() {
      return this.config.getPrefixCls('cascader-menus');
    },
    mp() {
      return this.config.getPrefixCls('cascader-menu');
    },
    fieldNames() {
      return {
        ...DEFAULT_FIELD_NAMES,
        ...this.props,
      };
    },

    root() {
      return this.buildNodes(this.createNodes(this.data));
    },

    menuNodes() {
      return this.buildMenuNodes(this.root, []);
    },

    flattenNodes() {
      // 扁平化对象，仅当 filterable 时生效，格式为 [[...parentNode, childrenNode]]
      if (this.filterable) {
        return this.getFlattenNodes(this.root);
      }
      return [];
    },

    filteredNodes() {
      // 搜索结果
      const { fieldNames } = this;
      return this.flattenNodes
        .filter((nodes) => {
          const paths = nodes.map((node) => node.data);
          return this.filterMethod(this.filter, paths, fieldNames);
        })
        .map((nodes) => {
          const labels = nodes.map((n) => n.label).join(' / ');
          const values = nodes.map((n) => n.value);
          const node = nodes[nodes.length - 1];
          const disabled = node.disabled;

          return {
            label: labels,
            value: values,
            isLeaf: true,
            disabled: disabled,
            checked: node.checked,
            data: node.data,
            nodes: nodes,
            [FILTERED_NODE_KEY]: true,
          };
        });
    },

    showNodes() {
      if (this.filterable && this.filter) {
        return [this.filteredNodes];
      } else {
        return this.menuNodes;
      }
    },

    showCheckbox() {
      return this.multiple;
    },
  },
  methods: {
    createNodes(data, parent, level = 0) {
      const { fieldNames, loadData } = this;
      return data.map((item, i) => {
        const disabledField = fieldNames.disabled;

        const node = {
          $parent: parent,
          $index: i,
          level: level,
          data: item,

          value: item[fieldNames.value],
          label: item[fieldNames.label],
          isLeaf: item[fieldNames.isLeaf],
          disabled:
            disabledField in item ? item[disabledField] : !this.disabledStrictly ? false : parent && parent.disabled,
          loading: item[fieldNames.loading],

          selected: false,
          checked: false,
          hasChildrenChecked: false,
          indeterminate: false,
        };
        let children = item[fieldNames.children];
        children = children && children.length ? children : undefined;
        Object.assign(node, {
          children: children ? this.createNodes(children, node, level + 1) : undefined,
          hasChildren: !!children || (loadData && !node.isLeaf),
        });
        return node;
      });
    },

    buildNodes(nodes) {
      if (!this.multiple) {
        return nodes;
      }
      const checkedNodes = [];
      this.unmatchedValues = [];
      this.checkedValues.forEach((pathValue) => {
        let matched = false;
        pathValue.reduce((items, v, i) => {
          const node = items.find((item) => item.value === v);
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
          this.unmatchedValues.push(pathValue);
        }
      });
      if (!this.checkStrictly) {
        checkedNodes.forEach(this.updateChildChecked);
        checkedNodes.forEach(this.updateParentChecked);
      }
      return nodes;
    },

    buildMenuNodes(nodes, menuNodes) {
      const level = menuNodes.length;
      menuNodes[level] = nodes || [];

      const value = this.expandedValue[level];

      const node = nodes.find((item) => {
        return item.value === value;
      });
      if (node && !node.loading && node.children) {
        this.buildMenuNodes(node.children, menuNodes);
      }
      return menuNodes;
    },

    getFlattenNodes(nodes, paths = []) {
      let flatNodes = [];
      nodes.forEach((node) => {
        const children = node.children;
        const hasChildren = children && children.length;
        const stack = paths.concat([node]);
        if (!hasChildren) {
          flatNodes.push(stack);
        } else {
          if (!this.filterParent) {
            flatNodes.push(stack);
          }
          flatNodes = flatNodes.concat(this.getFlattenNodes(children, stack));
        }
      });
      return flatNodes;
    },

    creataLoadDataCallback(data) {
      const that = this;
      return function (children) {
        data[that.fieldNames.loading] = false;
        that.$set(data, that.fieldNames.children, children);
        const parent = that.$parent;
        if (parent && parent.updatePopper) {
          parent.updatePopper();
        }
      };
    },

    updateParentChecked(node) {
      const { $parent: parent } = node;
      if (parent && !parent.disabled) {
        const { children } = parent;
        const allChecked = children.every((child) => {
          return child.checked || child.disabled;
        });

        parent.checked = allChecked;
        parent.indeterminate = !allChecked;
        this.updateParentChecked(parent);
      }
    },

    updateChildChecked(node) {
      const { children } = node;
      if (children) {
        children.forEach((item) => {
          if (!item.checked && !item.disabled) {
            item.checked = true;
            this.updateChildChecked(item);
          }
        });
      }
    },

    updateParentUnChecked(node) {
      const { $parent: parent } = node;
      if (parent) {
        const { children } = parent;
        const anyChecked = children.some((child) => {
          // 忽略 disabled 的选项
          return !child.disabled && (child.checked || child.indeterminate);
        });

        parent.checked = false;
        parent.indeterminate = anyChecked;
        this.updateParentUnChecked(parent);
      }
    },

    updateChildUnChecked(node) {
      const { children } = node;
      if (children) {
        children.forEach((item) => {
          if (!item.disabled) {
            item.checked = false;
            this.updateChildUnChecked(item);
          }
        });
      }
    },

    handleExpand(node) {
      const handler = () => {
        if (!node) {
          this.$emit('expanded-change', [], []);
          return;
        }
        if (node.hasChildren) {
          if (!node.children && !node.loading) {
            // 动态加载
            const { data } = node;
            this.$set(data, this.fieldNames.loading, true);
            this.loadData(data, this.creataLoadDataCallback(data));
          }
          const { values, nodes } = this.getValue(node);
          this.$emit('expanded-change', values, nodes);
        }
      };
      if (this.expandTrigger === 'hover') {
        this.timer = setTimeout(handler, 150);
      } else {
        handler();
      }
    },

    handleMouseLeave() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },

    handleSelect(node) {
      const { values, nodes } = this.getValue(node);
      this.$emit('select', values, nodes);
    },

    handleClick(node) {
      const { values, nodes } = this.getValue(node);
      this.$emit('click', values, nodes);
    },

    handleChecked(node, { checked }) {
      let nextCheckedValues = [...this.checkedValues];
      const { nodes, values } = this.getValue(node);
      let checkedPaths = [];
      if (this.checkStrictly) {
        if (checked) {
          nextCheckedValues.push(values);
        } else {
          nextCheckedValues = nextCheckedValues.filter((checkedValues) => {
            return checkedValues.length !== values.length || checkedValues.some((v, i) => v !== values[i]);
          });
        }
        checkedPaths = nextCheckedValues.map((checkedValue) => {
          return this.getPathByValue(this.root, checkedValue);
        });
      } else {
        const lastNode = nodes[nodes.length - 1];
        lastNode.checked = checked;
        if (checked) {
          this.updateParentChecked(lastNode);
          this.updateChildChecked(lastNode);
        } else {
          this.updateParentUnChecked(lastNode);
          this.updateChildUnChecked(lastNode);
        }
        const checkedNodes = this.getCheckedNode(this.root);
        checkedPaths = checkedNodes.map((node) => {
          return linkedToArray(node);
        });
        nextCheckedValues = checkedNodes.map((node) => {
          const paths = linkedToArray(node);
          const values = paths.map((node) => node.value);
          return values;
        });
      }
      nextCheckedValues = [...this.unmatchedValues, ...nextCheckedValues];
      this.$emit('update:checkedValues', nextCheckedValues, checkedPaths);
      // todo reset nodes
    },

    getNodes(values) {
      const nodes = [];
      values.reduce((items, v, i) => {
        const node = items.find((item) => item.value === v);
        if (!node) return [];
        nodes.push(node);
        return node.children || [];
      }, this.root);
      return nodes;
    },

    getPathByValue(nodes, pathValue) {
      const paths = [];
      pathValue.reduce((items, v, i) => {
        const node = (items || []).find((item) => item.value === v);
        node && paths.push(node);
        return node && node.children;
      }, nodes);
      return paths;
    },

    getValue(node) {
      let nextValue;
      let nodes;
      if (node[FILTERED_NODE_KEY]) {
        const { value, nodes: ns } = node;
        nextValue = value;
        nodes = ns;
      } else {
        nodes = linkedToArray(node);
        nextValue = nodes.map((node) => node.value);
      }
      return {
        nodes,
        values: nextValue,
      };
    },

    setValue(node) {
      let nextValue;
      let nodes;
      if (node[FILTERED_NODE_KEY]) {
        const { value, nodes: ns } = node;
        nextValue = value;
        nodes = ns;
      } else {
        nodes = linkedToArray(node);
        nextValue = nodes.map((node) => node.value);
      }
      this.$emit('input', nextValue);
      this.$emit('expand', nextValue, nodes);
    },
    scrollIntoView() {
      // scroll all
      (this.$refs.menus || []).forEach((menu) => {
        const el = menu.$el;
        scrollIntoView(el, el.getElementsByClassName(`${this.mp}-item-active`)[0]);
      });
    },
    getCheckedNode(nodes, checkedStrategy = this.checkedStrategy) {
      const checkedNodes = [];
      function flatChecked(node) {
        const { children, checked } = node;
        if (checked) {
          checkedNodes.push(node);
        }
        children && children.forEach(flatChecked);
      }
      nodes.forEach(flatChecked);
      if (checkedStrategy === 'children') {
        return checkedNodes.filter((node) => {
          return !node.children;
        });
      } else if (checkedStrategy === 'parent') {
        return checkedNodes.filter((node) => {
          const { $parent } = node;
          return !$parent || node.disabled || !$parent.checked;
        });
      }
      return checkedNodes;
    },
  },
};
</script>
