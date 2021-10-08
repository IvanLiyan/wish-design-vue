import Vue from 'vue';
import { FormControlComponent } from './form';

export declare class Picker extends Vue implements FormControlComponent {
  static install (vue: any): void;
  static name: string

  value: any
  valueKey: string
  disabled: boolean
  size: string
  icon: string
  placeholder: string
  clearable: boolean
  debounce: number
  filterable: boolean
  filterMethod?: () => boolean
  filterProps: any
  remote: boolean
  remoteMethod: Function
  multiple: boolean
  multipleLimit: number
  appendToContainer: boolean

  getPopupContainer: Function
  visible: boolean
  placement: string

  noMatchText: string
  noDataText: string
  maxCount: number
  reserveKeyword: boolean

  focus (): void;
  blur (): void;
}

export default Picker;
