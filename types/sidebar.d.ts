import Vue from 'vue';

export interface SidebarData {
  title: string
  tooltip?: string
  disabled: boolean
  route?: string | object
  replace: boolean
  exact: boolean
  href?: string
  blank?: string
  rel?: string
  children?: SidebarData[]
}

export declare class Sidebar extends Vue {
  static install (vue: any): void;
  static name: string
  theme: string
  collapse: boolean
  activeKey: number | string
  expandKeys: string[] | number[]
  accordion: boolean
  itemKey: string
  title: string
  tooltipProps ?: object

  data: SidebarData
}

export default Sidebar;
