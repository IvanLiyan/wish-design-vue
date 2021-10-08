import Vue from 'vue';

export type TabPosition = 'top' | 'left'

export type Size = 'small' | 'normal' | 'large'

export declare class Tabs extends Vue {
  static install (vue: any): void;
  static name: string

  type?: string

  lineSize?: number

  closable?: boolean

  addable?: boolean

  value?: any

  tabPosition?: TabPosition

  size?: Size

  verticalHeightNumber?: number

  tabComponent?: any
}

export default Tabs;
