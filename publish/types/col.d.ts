import Vue from 'vue';

export interface ResponsiveColumnProperties {
  /** Number of column the grid spans */
  span: number,

  /** Number of spacing on the left side of the grid */
  offset: number
}

export declare class Col extends Vue {
  static install (vue: any): void;
  static name: string

  span: number
  tag: string
  offset: number
  pull: number
  push: number
  xs: number | ResponsiveColumnProperties
  sm: number | ResponsiveColumnProperties
  md: number | ResponsiveColumnProperties
  lg: number | ResponsiveColumnProperties
  xl: number | ResponsiveColumnProperties
  xxl: number | ResponsiveColumnProperties
}

export default Col;
