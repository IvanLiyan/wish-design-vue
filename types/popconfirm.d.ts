import Vue from 'vue';
import Popover from './popover';
export declare class Popconfirm extends Popover {
  static install (vue: any): void;
  static name: string;
  icon: string;
  message?: string;
  okButtonProps?: object;
  okButtonText: string;

  cancelButtonProps?: object;
  cancelButtonText: string;
}

export default Popconfirm;
