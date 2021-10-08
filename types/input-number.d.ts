import Vue from 'vue';
export type InputSize = 'small' | 'normal' | 'large'
export type InputControlsPosition = 'right' | 'default'
export interface Formatter {
  (value: string | number): string
}
export interface Parser {
  (value: string | number): string
}
export declare class InputNumber extends Vue {
  static install (vue: any): void;
  static name: string
  value?: string | number
  size?: InputSize
  disabled?: boolean
  invalid?: boolean
  max?: number
  min?: number
  precision?: number
  step?: number
  formatter?: Formatter
  parser?: Parser
  controls?: boolean
  controlsPosition: InputControlsPosition
}
export default InputNumber;
