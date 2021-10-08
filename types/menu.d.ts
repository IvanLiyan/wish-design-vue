import Vue from 'vue';
export declare class Menu extends Vue {
  static install (vue: any): void;
  static name: string

  mode: 'inline' | 'horizontal' | 'vertical'
  theme: 'dark' | 'light'

  activeName?: string
  accordion?: boolean
  collapse?: boolean
  indent?: number
  baseIndent?: number
  expandedNames?: string[]
  defaultExpandedNames?: string[]
  lazy?: boolean
}

export default Menu;
