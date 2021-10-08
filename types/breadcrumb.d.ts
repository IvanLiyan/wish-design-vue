import Vue from 'vue';

export declare class Breadcrumb extends Vue {
  static install (vue: any): void;
  static name: string

  separator?: string

  separatorClass?: string

  size?: 'small' | 'normal' | 'large'
}

export default Breadcrumb;
