import Vue from 'vue';
import { Node, TreeData } from './tree';

export declare class TreeNode extends Vue {
  static install (vue: any): void;
  static name: string

  expandIcon: string
  node: Node
  data: any
  expandOnClickNode: boolean
  checkOnClickNode: boolean
  indent: number
  loadData: Function
}

export default TreeNode;
