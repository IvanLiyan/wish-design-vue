import Vue from 'vue'

export interface ValidateSource {
  [field: string]: any;
}

interface validator {
  (rule: FormRule, value: any, callback: (error: string | string[] | void) => void, source: ValidateSource): boolean
}

export type FormRule = {
  trigger?: 'change' | 'blur'
  enum?: string
  len?: number
  max?: number
  min?: number
  message?: string
  pattern?: RegExp
  required?: boolean
  type?: string
  whitespace?: boolean

  transform?: (value: any) => any
  validator?: validator
  asyncValidator?: (rule: FormRule, value: any, callback: (error: string | string[] | void) => void, source: ValidateSource) => void
}

export type FormRules = { [key: string]: FormRule | FormRule[] }

export declare class Form extends Vue {
  static install (vue: any): void;
  static name: string

  model?: object
  rules?: FormRules
  labelWidth?: Number
  labelPosition?: 'right' | 'top'
  showMessage?: boolean
  inline?: boolean
  autocomplete?: 'on' | 'off'

  validate (callback?: (isValid: boolean, errors?: { [key: string]: string }) => void): Promise<any>
  validateField (prop: string, callback?: (error: string | string[] | void) => void): void
  validateFields (prop: string | string[], callback?: (error: string | string[] | void) => void): void

  resetFields (props?: string | string[]): void
  clearValidate (props?: string | string[]): void
}

export interface FormControlComponent {
  focus (): void;
  blur (): void;
}

export default Form;
