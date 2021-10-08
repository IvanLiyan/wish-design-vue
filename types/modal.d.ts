import Vue, { Component } from 'vue';
import {
  getPopupContainer
} from './popper'

export declare class Modal extends Vue {
  static install (vue: any): void;
  static name: string
  static COMPONENT: Component;

  appendToContainer?: boolean
  getPopupContainer?: getPopupContainer
  enableClickThrough?: boolean
  mask?: boolean
  closable?: boolean
  maskClosable?: boolean
  fullscreen?: boolean
  visible?: boolean
  destroyOnClose?: boolean
  lockScroll?: boolean
  title?: string
  placement?: 'top' | 'center'
  width?: string | number
}

export default Modal;
