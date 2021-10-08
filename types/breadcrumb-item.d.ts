import Vue from 'vue';

export declare class BreadcrumbItem extends Vue {
  static install (vue: any): void;
  static name: string

  tag?: string | object
  icon?: string
}

export default BreadcrumbItem;
