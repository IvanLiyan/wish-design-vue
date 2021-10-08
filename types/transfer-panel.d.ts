import Vue from 'vue';

export declare class TransferPanel extends Vue {
  static install (vue: any): void;
  static name: string

  data: any[]
  placeholder: string
  title: string
  filterable: boolean
  format: {
    noChecked?: string
    hasChecked?: string
  }
  filterMethod (query: string, item: any): boolean
  defaultChecked: string[]
  props?: object
  noMatchText: string
  noDataText: string
}

export default TransferPanel;
