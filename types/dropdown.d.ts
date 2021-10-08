import Vue from 'vue';
import {
  PopperPlacement,
  PopperTrigger,
  getPopupContainer
} from './popper'

export declare class Dropdown extends Vue {
  static install (vue: any): void;
  static name: string

  visible?: boolean
  trigger?: PopperTrigger
  placement?: PopperPlacement
  appendToContainer?: boolean
  getPopupContainer?: getPopupContainer

  popperClass: string
  showArrow: boolean
  disabled: boolean
}

export default Dropdown;
