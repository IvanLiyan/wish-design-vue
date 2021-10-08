import Vue from 'vue';

export declare class TabPane extends Vue {
  static install (vue: any): void;
  static name: string

  label?: string

  closable?: boolean

  addable?: boolean

  value?: any

  icon?: string

  lazy?: boolean
}

export default TabPane;
