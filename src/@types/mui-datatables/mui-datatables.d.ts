import * as React from 'react'

interface MUIDataTableData {
  index: number
  data: any[]
}

interface MUIDataTableStateRows {
  data: string[]
  lookup: any
}

interface MUIDataTableState {
  announceText: string | null
  activeColumn: string | null
  page: number
  rowsPerPage: number
  filterList: string[][]
  selectedRows: MUIDataTableStateRows
  expandedRows: MUIDataTableStateRows
  showResponsive: boolean
  searchText: string | null
  rowsPerPageOptions: number[]
}

interface MUIDataTableMeta<T> {
  rowIndex: number
  columnIndex: number
  columnData: MUIDataTableColumnOptions<T>[]
  rowData: any[]
  tableData: MUIDataTableData[]
  tableState: MUIDataTableState
}

interface MUIDataTableCustomHeadRenderer<T> extends MUIDataTableColumn<T> {
  index: number
}

interface MUIDataTableColumn<T> {
  name: keyof T
  label?: string
  options?: MUIDataTableColumnOptions<T>
}

interface MUIDataTableTextLabelsBody {
  noMatch: string
  toolTip: string
}

interface MUIDataTableTextLabelsPagination {
  next: string
  previous: string
  rowsPerPage: string
  displayRows: string
}

interface MUIDataTableTextLabelsToolbar {
  search: string
  downloadCsv: string
  print: string
  viewColumns: string
  filterTable: string
}

interface MUIDataTableTextLabelsFilter {
  all: string
  title: string
  reset: string
}

interface MUIDataTableTextLabelsViewColumns {
  title: string
  titleAria: string
}

interface MUIDataTableTextLabelsSelectedRows {
  text: string
  delete: string
  deleteAria: string
}

export interface MUIDataTableTextLabels {
  body: MUIDataTableTextLabelsBody
  pagination: MUIDataTableTextLabelsPagination
  toolbar: MUIDataTableTextLabelsToolbar
  filter: MUIDataTableTextLabelsFilter
  viewColumns: MUIDataTableTextLabelsViewColumns
  selectedRows: MUIDataTableTextLabelsSelectedRows
}

export interface MUIDataTableColumnOptions<T> {
  display?: 'true' | 'false' | 'excluded'
  filter?: boolean
  filterList?: string[]
  filterOptions?: string[]
  sort?: boolean
  sortDirection?: 'asc' | 'desc'
  download?: boolean
  hint?: string
  customHeadRender?: (
    columnMeta: MUIDataTableCustomHeadRenderer<T>,
    updateDirection: (params: any) => any,
  ) => string
  customBodyRender?: (
    value: any,
    tableMeta: MUIDataTableMeta<T>,
    updateValue: (s: any, c: any, p: any) => any,
  ) => string | React.ReactNode
  setCellProps?: (
    cellValue: string,
    rowIndex: number,
    columnIndex: number,
  ) => string
}

export interface MUIDataTableOptions {
  page?: number
  count?: number
  serverSide?: boolean
  rowsSelected?: any[]
  filterType?: 'dropdown' | 'checkbox' | 'multiselect' | 'textField'
  textLabels?: MUIDataTableTextLabels
  pagination?: boolean
  selectableRows?: boolean
  IsRowSelectable?: (dataIndex: any) => boolean
  resizableColumns?: boolean
  expandableRows?: boolean
  renderExpandableRow?: (
    rowData: string[],
    rowMeta: { dataIndex: number; rowIndex: number },
  ) => React.ReactNode
  customToolbar?: () => React.ReactNode
  customToolbarSelect?: () => React.ReactNode
  customFooter?: () => React.ReactNode
  customSort?: (data: any[], colIndex: number, order: string) => any[]
  elevation?: number
  caseSensitive?: boolean
  responsive?: 'stacked' | 'scroll'
  rowsPerPage?: number
  rowsPerPageOptions?: number[]
  rowHover?: boolean
  fixedHeader?: boolean
  sortFilterList?: boolean
  sort?: boolean
  filter?: boolean
  search?: boolean
  print?: boolean
  download?: boolean
  downloadOptions?: { filename: string; separator: string }
  viewColumns?: boolean
  onRowsSelect?: (currentRowsSelected: any[], rowsSelected: any[]) => void
  onRowsDelete?: (rowsDeleted: any[]) => void
  onRowClick?: (
    rowData: string[],
    rowMeta: { dataIndex: number; rowIndex: number },
  ) => void
  onCellClick?: (colIndex: number, rowIndex: number) => void
  onChangePage?: (currentPage: number) => void
  onChangeRowsPerPage?: (numberOfRows: number) => void
  onSearchChange?: (searchText: string) => void
  onFilterChange?: (changedColumn: string, filterList: any[]) => void
  onColumnSortChange?: (changedColumn: string, direction: string) => void
  onColumnViewChange?: (changedColumn: string, action: string) => void
  onTableChange?: (action: string, tableState: object) => void
  setRowProps?: (row: any[], rowIndex: number) => any
}

export type MUIDataTableColumnDef<T> = keyof T | MUIDataTableColumn<T>

export interface MuiDatatablesTableState {
  page: number
  rowsPerPage: number
  filterList: any[]
}

export interface MUIDataTableProps<T> {
  title: string
  columns: MUIDataTableColumnDef<T>[]
  data: T[]
  options?: MUIDataTableOptions
}

declare const MUIDataTable: <T>(props: MUIDataTableProps<T>) => JSX.Element

export default MUIDataTable
