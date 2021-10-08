import { Picker } from './date-picker'

export type TimePickerType = 'time' | 'timerange'

export declare class TimePicker extends Picker {
  static install (vue: any): void;
  static name: string

  type?: TimePickerType
  timePickerOptions?: object
  steps?: number[]
  popperClass?: string
}

export default TimePicker;
