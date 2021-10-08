import Vue from 'vue';
import {
  PopperPlacement,
  getPopupContainer
} from './popper'
import { FormControlComponent } from './form';

export interface Formatter {
  (labels: string[], values: any[]): string
}

export interface LoadDataResolve {
  (data: any[]): void
}

export interface LoadData {
  (item: any, resolve: LoadDataResolve): void
}

export interface FilterMethod {
  (query: string, item: any): boolean
}

export interface RemoteMethod {
  (query: string): boolean
}

export declare class Cascader extends Vue implements FormControlComponent {
  static install (vue: any): void;
  static name: string
  visible: boolean
  defaultVisible: boolean
  value: any[]
  data: any[]

  noDataText: string
  props: object

  changeOnSelect: boolean
  expandTrigger: string
  separator: string
  filterable: boolean

  formatter: Formatter
  loadData: LoadData
  debounce: number

  filterMethod: FilterMethod
  remote: boolean
  remoteMethod: RemoteMethod
  noMatchText: string
  loading: boolean
  loadingText: string
  disabled: boolean
  clearable: boolean
  size: string
  placeholder: string
  popperClass: string

  placement: PopperPlacement

  appendToContainer: boolean
  getPopupContainer: getPopupContainer

  focus (): void;
  blur (): void;
}

export default Cascader;
