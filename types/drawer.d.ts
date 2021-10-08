import Vue, { Component } from 'vue';
import { getPopupContainer } from './popper';

type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom';

export declare class Drawer extends Vue {
  static install (vue: any): void;
  static name: string
  static COMPONENT: Component;

  visible?: boolean;
  title?: string;
  width?: string | number;
  height?: string | number;
  closable?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  lockScroll?: boolean;
  placement?: DrawerPlacement;
  getPopupContainer?: getPopupContainer;
  appendToContainer?: boolean;
  destroyOnClose?: boolean;
}
export default Drawer;
