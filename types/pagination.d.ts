import Vue from 'vue';

export declare class Pagination extends Vue {
  static install (vue: any): void;
  static name: string

  size?: string
  unborder?: boolean
  simple?: boolean
  currentPage?: number
  pageSize?: number
  pageSizeOptions?: number[]
  showSizeChanger?: boolean
  showQuickJumper?: boolean
  total?: number
  showTotal?: boolean
  pagerCount?: number
  selectClass?: string
}

export default Pagination;
