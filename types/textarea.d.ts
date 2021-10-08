import Vue from 'vue';

export declare class Textarea extends Vue{
  static install (vue: any): void;
  static name: string

  disabled?: boolean
  readonly?: boolean
  invalid?: boolean
  value?: string | number

  /* Same with native input */
  row?: number
  cols?: number
  maxlength?: number
  minlength?: number
  placeholder?: string
  autoComplete?: string
  name?: string
  required?: boolean
  autofocus?: boolean
  form?: string
}

export default Textarea;
