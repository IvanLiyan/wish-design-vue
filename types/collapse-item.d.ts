import Vue from 'vue'

export declare class CollapseItem extends Vue {
  static install (vue: any): void;
  static name: string

  value: any

  title?: string | number

  disabled?: boolean
}

export default CollapseItem;
