import Vue from 'vue';

export declare class Switch extends Vue {
  static install (vue: any): void;
  static name: string

  value?: any
  trueValue?: any
  falseValue?: any

  actived?: boolean
  disabled?: boolean
  size?: string
  loading?: boolean
  name?: string
}

export default Switch;
