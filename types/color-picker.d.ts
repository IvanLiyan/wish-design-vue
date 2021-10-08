import Vue from 'vue';
import { getPopupContainer, PopperPlacement, PopperTrigger } from './popper';

type ColorPickerSize = 'mini' | 'small' | 'large';

export declare class ColorPicker extends Vue {
  static install (vue: any): void;
  static name: string

  value: string;
  showAlpha: boolean;
  colorFormat: string;
  disabled: string;
  size: ColorPickerSize;
  popperClass: string;
  predefine: any[];
  showArray: boolean;
  getPopupContainer?: getPopupContainer;
  placement?: PopperPlacement;
  trigger?: PopperTrigger;
}

export default ColorPicker;
