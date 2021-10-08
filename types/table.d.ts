import Vue from 'vue'
export type Size = 'small' | 'large'
export type Type = 'selection' | 'expand'
export type Align = 'left' | 'center' | 'right'

export interface className {
  (): string
}
export interface rowKey {
  (): void
}
export interface rowColSpan {
  (): void
}
export interface select {
  (): void
}
export interface selectAll {
  (): void
}
export interface selectionChange {
  (): void
}
export interface click {
  (): void
}
export interface mouse {
  (): void
}
export interface sortChange {
  (): void
}
export interface filterChange {
  (): void
}
export interface expandChange {
  (): void
}
export declare class Table extends Vue {
  static install (vue: any): void;
  static name: string

  data: any[]
  bordered?: boolean
  height?: string | number
  size?: Size
  maxHeight?: string | number
  showHeader?: boolean
  rowClass?: string | className
  cellClass?: string | className
  headerRowClass?: string | className
  headerCellClass?: string | className
  rowKey?: string | rowKey
  emptyText?: string
  expandRowKeys?: any[]
  sortOrder?: object
  rowColSpan?: rowColSpan
  selection?: any[]
  reserveSelection?: boolean
  indexOfSelection?: (row1: any, row2: any) => number
  checkboxable?: (row: any) => boolean
  expandable?: (row: any) => boolean

  select?: select
  selectAll?: selectAll
  selectionChange?: selectionChange
  rowClick?: click
  cellClick?: click
  cellMouseEnter?: mouse
  cellMouseLeave?: mouse
  headerClick?: click
  sortChange?: sortChange
  filterChange?: filterChange
  expandChange?: expandChange
  doReflow (): void
  scrollTo (px: number): void

  tooltipClass?: string | any[] | { [key: string]: boolean }
}

export default Table;
