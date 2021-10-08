import Vue from 'vue';
import { ButtonHtmlType } from './button';

export declare class IconButton extends Vue {
  static install (vue: any): void;
  static name: string

  icon?: string
  disabled?: boolean
  htmlType?: ButtonHtmlType
  size?: 'small' | 'normal' | 'large'
  type?: 'secondary'
}

export default IconButton;
