import Vue from 'vue';

export type ListSize = 'small' | 'normal' | 'large'
export declare class List extends Vue {
  static install (vue: any): void;
  static name: string

  size?: ListSize
  loading?: boolean
}

export default List;
