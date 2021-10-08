import Vue from 'vue';

import {
  PopperPlacement,
  PopperTrigger,
  getPopupContainer
} from './popper'

export declare class Tooltip extends Vue {
  static install (vue: any): void;
  static name: string

  disabled?: boolean
  visible?: boolean
  defaultVisible?: boolean
  size?: 'small' | 'normal'
  content?: string
  popperClass?: string | any[] | { [key: string]: any }

  placement?: PopperPlacement
  trigger?: PopperTrigger
  showArrow?: boolean
  openDelay?: number
  closeDelay?: number

  appendToContainer?: boolean
  getPopupContainer?: getPopupContainer

  updatePopper (): void
}

export default Tooltip;
