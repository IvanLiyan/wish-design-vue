import Vue from 'vue';
export declare class Rate extends Vue {
  static install (vue: any): void;
  static name: string

  value: number
  count: number
  color: string | { [value: number]: string }
  disabled: boolean
  voidColor?: string
  disabledVoidColor?: string

  icon: string | { [value: number]: string }
  voidIcon?: string
  disabledVoidIcon?: string
  allowHalf?: boolean
  allowClear?: boolean
  texts?: string[]
  tooltipProps?: object
}

export default Rate;
