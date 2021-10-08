import Vue, { Component } from 'vue';

export declare class TreeData {
  [key: string]: any
  title?: string
  children?: TreeData[]
  icon?: string
  isLeaf?: boolean
  id?: string
  disabled?: boolean
  disableCheckbox?: boolean
  checkable?: boolean
}

export declare class Node {
  $parent?: Node
  children?: Node[]
  disabled?: boolean
  disableCheckbox?: boolean
  checked?: boolean
  expanded?: boolean
  selected?: boolean
  checkable?: boolean
  selectable?: boolean
  indeterminate?: boolean
  level: number
  data: any
}

export type TreeDropType = 'before' | 'after' | 'inner'
export type checkedStrategy = 'all' | 'parent' | 'children'

export declare function loadData (node: Node, callback: Function): void;
export declare class Tree extends Vue {
  static install (vue: any): void;
  static name: string

  data: TreeData[]
  expandIcon: string
  checkable?: boolean
  checkedKeys: string[]
  checkStrictly: boolean
  checkedStrategy: checkedStrategy
  selectedKeys: string[]
  expandedKeys: string[]
  defaultExpandAll: boolean
  loadedKeys: string[]
  expandOnClickNode: boolean
  checkOnClickNode: boolean
  nodeKey: string
  indent: number
  disabled: boolean
  disabledStrictly?: boolean
  emptyText: string
}

export default Tree;

export declare function makeTreeNode(name: string, component: Component): Component;
