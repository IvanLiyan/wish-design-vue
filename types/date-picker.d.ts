import Vue from 'vue'
import {
  PopperPlacement,
  PopperTrigger,
  getPopupContainer
} from './popper'
import { FormControlComponent } from './form'

export type DatePickerType = 'date' | 'daterange' | 'datetime' | 'datetimerange' | 'year' | 'month' | 'monthrange'

export interface ICell {
  desc: string;
  selected: boolean;
  range: boolean;
  disabled: boolean;
  date?: Date; // 仅当 type = 'weekLabel' 时为空
}
export interface IDateCell extends ICell {
  type: 'prevMonth' | 'monthDay' | 'nextMonth' | 'today' | 'weekLabel';
  today: boolean;
}

export interface IMonthCell extends ICell {
  date: Date;
}
export interface IYearCell extends ICell {
  date: Date;
}

export interface DatePickerShort<T = any> {
  text: string;
  value: () => T;
  onClick: Function;
}

export interface DatePickerOptions {
  disabledDate?: (d: Date) => boolean;
  shortcuts?: DatePickerShort[];
}

export declare class Picker extends Vue implements FormControlComponent {
  format?: string
  readonly?: boolean
  disabled?: boolean
  clearable?: boolean
  confirm?: boolean
  open?: boolean
  splitPanels?: boolean
  startDate?: Date
  size?: string
  placeholder?: string
  placement?: PopperPlacement
  name?: string

  value?: Date | Date[] | string | string[]

  options?: DatePickerOptions

  icon?: string
  appendToContainer?: boolean
  getPopupContainer?: getPopupContainer

  invalid?: boolean
  loading?: boolean
  genre?: string
  popperClass?: string

  focus (): void;
  blur (): void;
}

export declare class CDatePicker extends Picker {
  static install (vue: any): void;
  static name: string

  type?: DatePickerType
  multiple?: boolean
  showWeekNumbers?: boolean
}

type TDatePicker = CDatePicker & {
  RangeDatePickerPanel: any;
}
export declare const DatePicker: TDatePicker;

export default DatePicker;
