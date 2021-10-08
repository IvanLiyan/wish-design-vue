import Vue from 'vue';
import {
  PopperPlacement,
  PopperTrigger,
  getPopupContainer
} from './popper'

export declare class Popover extends Vue {
  static install (vue: any): void;
  static name: string

  transition?: string
  disabled?: string
  defaultVisible?: string
  size?: 'small' | 'normal'
  title?: string
  content?: string
  popperClass?: string | any[] | { [key: string]: any }

  visible?: boolean
  appendToContainer?: boolean
  getPopupContainer?: getPopupContainer
  placement?: PopperPlacement
  trigger?: PopperTrigger
  showArrow?: boolean
  openDelay?: number
  closeDelay?: number

  updatePopper (): void
}

export default Popover;
