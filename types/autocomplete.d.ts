import Vue from 'vue';
import {
  PopperPlacement,
  getPopupContainer
} from './popper'
import { FormControlComponent } from './form';

export declare class Autocomplete extends Vue implements FormControlComponent {
  static install (vue: any): void;
  static name: string

  value: string | number

  data: string[]

  size: 'small' | 'normal' | 'large'

  clearable: boolean

  disabled: boolean

  filterMethod: (value: any, option: any) => Boolean

  getPopupContainer?: getPopupContainer
  placement?: PopperPlacement

  focus (): void;
  blur (): void;
}

export default Autocomplete;
