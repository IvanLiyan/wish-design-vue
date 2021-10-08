import Vue from 'vue'

export declare class FormItem extends Vue {
  static install (vue: any): void;
  static name: string

  label?: string
  labelWidth?: number
  prop?: string
  required?: boolean
  rules?: object | any[]
  error?: string
  validateStatus?: string
  showMessage?: boolean
  labelFor?: string
  helper?: string
  helperPlacement?: string
  validatePlacement?: string
  labelPosition?: string
}

export default FormItem;
