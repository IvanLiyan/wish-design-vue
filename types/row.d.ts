import Vue from 'vue';

export declare class Row extends Vue {
  static install (vue: any): void;
  static name: string

  tag: string
  gutter: number
  type: string
  justify: string
  align: string
}

export default Row;
