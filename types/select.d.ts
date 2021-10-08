import Vue from 'vue';
import {
  getPopupContainer
} from './popper'
import {
  FormControlComponent
} from './form';
export interface QueryChangeHandler {
  (query: string): void
}
export declare class Select extends Vue implements FormControlComponent {
  static install (vue: any): void;
  static name: string

  value?: any

  size?: 'small' | 'normal' | 'large'

  icon?: string

  disabled?: boolean

  clearable?: boolean

  filterable?: boolean
  debounce?: number
  autoClearQuery?: boolean

  filterMethod?: QueryChangeHandler

  remote?: boolean
  remoteMethod?: QueryChangeHandler

  multiple?: boolean

  name?: string

  placeholder?: string

  noMatchText?: string

  loading?: boolean
  loadingText?: string

  noDataText?: string

  collapseTags?: boolean

  popperClass?: string
  appendToContainer?: boolean
  getPopupContainer?: getPopupContainer
  defaultVisible: boolean
  defaultActiveFirstOption?: boolean

  focus (): void;
  blur (): void;
}

export default Select;
