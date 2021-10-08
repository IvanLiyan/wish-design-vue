import Vue from 'vue';
export declare class MenuItem extends Vue {
  static install (vue: any): void;
  static name: string

  icon?: string
  disabled?: boolean
  name: string
}

export default MenuItem;
