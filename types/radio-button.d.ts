import Vue from 'vue';

export declare class RadioButton extends Vue {
  static install (vue: any): void;
  static name: string

  checked?: boolean
  name?: string
  value?: any
  disabled?: boolean
  size?: 'small' | 'normal' | 'large'
}

export default RadioButton;
