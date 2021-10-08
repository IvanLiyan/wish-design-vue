import Vue, { CreateElement, VNode } from 'vue'
export type Type = 'selection' | 'index' | 'expand'
export type Align = 'left' | 'center' | 'right'

export declare class Column {
  id: string
  columnKey: string
  label: string
  className: string
  labelClass: string
  prop: string
  type: Type
  context: string

  width: string
  minWidth: string

  align: string
  headerAlign: string

  renderHeaderFn: (h: CreateElement, data: any) => VNode | string
  formatter: (row: object, column: any) => any

  fixed: string | boolean

  sortable: string | boolean
  sortMethod: (row1: any, row2: any) => number
  sortOrders: string[]

  reserveSelection: boolean
  indexOfSelection: (row1: any, row2: any) => number

  expandable: (row: any) => boolean
}
export declare class TableColumn extends Vue {
  static install (vue: any): void;
  static name: string

  type?: Type
  label?: string
  className?: string
  labelClass?: string
  prop?: string
  width?: string
  minWidth?: string
  renderHeader?: (h: CreateElement, data: any) => VNode | string
  sortable?: string | boolean
  sortMethod?: (row1: any, row2: any) => number
  align?: Align
  headerAlign?: Align
  fixed?: string | boolean
  formatter?: (row: object, column: any) => any
}

export default TableColumn;
