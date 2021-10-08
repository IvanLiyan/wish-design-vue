import Vue from 'vue';

export declare class Checkbox extends Vue {
  static install (vue: any): void;
  static name: string

  size?: 'small'
  name?: string
  value?: any
  disabled?: boolean
  checked?: boolean
  indeterminate?: boolean
}

export default Checkbox;
