import 'react';

declare module 'react' {
  interface CSSProperties {
    '--table-height-diff'?: string;
  }
}

export interface Actions {
  key: string;
  label?: string;
  handler: Function;
  className?: string;
}
export interface Column {
  name: string;
  selector: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  omit?: boolean;
}
export interface ListItem {
  [key: string]: any;
}
export default interface Props {
  columns: Array<Column>;
  list: Array<ListItem>;
  actions?: Array<Actions>;
  title?: string;
  pagination?: boolean;
  containerClass?: string;
  titleContainerClass?: string;
  titleClass?: string;
  downloadDropDownContainerClass?: string;
  downloadDropDownClass?: string;
  tableClass?: string;
  tableWapperClass?: string;
  headerRowClass?: string;
  headerCellClass?: string;
  headerIconContainerClass?: string;
  filterInputContainerClass?: string;
  filterInputFieldClass?: string;
  filterInputApplyClass?: string;
  tableBodyClassName?: string;
  tableRowClass?: string;
  tableCellClass?: string;
  actionsClass?: string;
  tableFooterClass?: string;
  pageSizeDropDownContainerClass?: string;
  pageSizeDropDownClass?: string;
  pageNumberContainerClass?: string;
  pageNumberCellClass?: string;
  activePageCellClass?: string;
  showSerialNumber?: boolean;
  showDownloadOption?: boolean;
  defaultValForEmpty?: any;
  initiallyVisibleCol?: Array<string>;
  hideOptionToSelectCol?: boolean;
}

export interface PopoverProps {
  filterInputContainerClass?: string;
  filterInputFieldClass?: string;
  filterInputApplyClass?: string;
  name: string;
  selector: string;
  initialVal: string;
  handleApply: Function;
}

export interface MultiSelectDropdownProps {
  options: Array<Column>;
  selected: Array<string> | string;
  onSelect: Function;
  setSelectedCols?: Function;
  isMulti?: boolean;
  placeholder: string;
  width?: string;
  fromTop?: boolean;
}
