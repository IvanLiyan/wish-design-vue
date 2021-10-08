import Vue from 'vue';

export declare class RadioGroup extends Vue {
  static install (vue: any): void;
  static name: string

  name?: string
  value?: any
  disabled?: boolean
  size?: 'small' | 'normal' | 'large'
}

export default RadioGroup;
