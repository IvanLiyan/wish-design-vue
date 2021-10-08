import Vue from 'vue';

export interface Thresholds {
  value: number[],
  color?: string[]
}

export interface formatTooltip {
  (value: string): string
}

export declare class Slider extends Vue {
  static install (vue: any): void;
  static name: string

  min?: number
  max?: number
  value?: number
  size?: string
  range?: boolean
  disabled?: boolean
  steps?: number[]
  thresholds?: Thresholds[]
  fixedValue?: number

  formatTooltip?: formatTooltip
  vertical?: boolean
}

export default Slider;
