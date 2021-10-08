import Vue from 'vue';

export declare class Transfer extends Vue {
  static install (vue: any): void;
  static name: string

  data: any[]
  titles: string[]
  operations: string[]
  filterPlaceholder: string
  filterMethod: (key: string, item: any) => boolean
  sourceDefaultChecked: any[]
  targetDefaultChecked: any[]
  value: any[]
  format: any
  filterable: boolean
  props: any
  targetOrder: string

}

export default Transfer;
