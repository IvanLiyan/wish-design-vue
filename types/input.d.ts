import { FormControlComponent } from './form';
import Vue from 'vue';
export type InputSize = 'small' | 'normal' | 'large'
export declare class Input extends Vue implements FormControlComponent {
  static install (vue: any): void;
  static name: string

  type?: string
  size?: InputSize
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
  invalid?: boolean
  value?: string | number
  prefixIcon?: string
  suffixIcon?: string
  genre?: string

  /** Same with native input */
  maxlength?: number
  minlength?: number
  placeholder?: string
  autoComplete?: string
  name?: string
  required?: boolean
  autofocus?: boolean
  form?: string

  focus (): void;
  blur (): void;
}

export default Input;
