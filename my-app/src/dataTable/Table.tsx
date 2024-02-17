/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from 'react';
import Props, { ListItem } from './types';
import './table.css';
import { funnelIcon, sortUpIcon, sortDownIcon } from './icon';
import { export2File, filterList, sortList } from './tabel.helper';
import Popover from './popover';
import MultiSelectDropdown from './multiselectDropdown';

const downloadOptions = [
  {
    selector: '.txt',
    name: '.txt',
  },
  {
    selector: '.csv',
    name: '.csv',
  },
];

const pageSizeOption = [
  {
    selector: '20',
    name: '20',
  },
  {
    selector: '50',
    name: '50',
  },
  {
    selector: '100',
    name: '100',
  },
];

const Table: React.FunctionComponent<Props> = props => {
  const [pageSize, setPageSize] = useState(20);
  const [pageNumber, setPageNumber] = useState(1);
  const [list, setList] = useState([...props.list]);
  const [listToDisplay, setListToDispaly] = useState([...list]);
  const [sortBy, setSortBy] = useState<{ name: string; type: string }>({
    name: '',
    type: '',
  });
  const [filterBy, setFilterBy] = useState<{ [key: string]: string }>({});
  const [filterPopoverKey, setFilterPopoverKey] = useState<string>('');
  const [totalEntry, setTotalEntry] = useState(list.length);
  const [totalPageNumber, setTotalPageNumber] = useState(
    Math.ceil(totalEntry / pageSize)
  );
  const [colWidth, setColWidth] = useState(
    100 /
      ((props.initiallyVisibleCol?.length || props.columns.length) +
        ((props.showSerialNumber ? 1 : 0) + (props.actions?.length ? 1 : 0)))
  );

  const [selectedCols, setSelectedCols] = useState<Array<string>>(
    props.initiallyVisibleCol || []
  );

  const [tableHeightDiff, setTableHeightDiff] = useState<number>(0);
  const titleRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setColWidth(
      100 /
        ((selectedCols.length || props.columns.length) +
          ((props.showSerialNumber ? 1 : 0) + (props.actions?.length ? 1 : 0)))
    );
  }, [selectedCols]);

  const toggleSelectedColOption = (obj: { id: string }) => {
    const id = obj.id;
    setSelectedCols(prevSelected => {
      const newArray = [...prevSelected];
      if (newArray.includes(id)) {
        return newArray.filter(item => item !== id);
      } else {
        newArray.push(id);
        return newArray;
      }
    });
  };

  const handleDownload = (obj: { id: string }) => {
    export2File(props.columns, list, obj.id);
  };
  const handlePageSizeChange = (obj: { id: string }) => {
    setPageSize(Number(obj.id));
    setTotalPageNumber(Math.ceil(totalEntry / Number(obj.id)));
    setPageNumber(1);
  };

  const handleSortBy = (key: string) => {
    const updatedList = sortList(
      list,
      key,
      sortBy.type === 'asc' ? 'dsc' : 'asc'
    );
    setList([...updatedList]);
    setSortBy({ name: key, type: sortBy.type === 'asc' ? 'dsc' : 'asc' });
    setPageNumber(1);
  };

  const handleFilterChange = (value: string, name: string) => {
    const temp = { ...filterBy };
    temp[name] = value;
    setFilterPopoverKey('');
    getFilteredList(temp, value, name);
  };

  const getFilteredList = (
    currentFilters: { [key: string]: string },
    filterVlue: string,
    filerName: string
  ) => {
    let listToFilter =
      currentFilters[filerName].length > filterVlue.length
        ? [...props.list]
        : list;
    if (!filterVlue) {
      currentFilters[filerName] = '';
      listToFilter = props.list;
    } else {
      currentFilters[filerName] = filterVlue;
    }
    setFilterBy(currentFilters);
    const updatedList = filterList(listToFilter, currentFilters, sortBy);
    setList(updatedList);
    setPageNumber(1);
  };

  const setListInState = (newList: Array<ListItem>) => {
    if (newList.length !== totalEntry) {
      setTotalEntry(newList.length);
      setTotalPageNumber(Math.ceil(newList.length / pageSize));
    }
    setListToDispaly(
      props.pagination
        ? newList.slice((pageNumber - 1) * pageSize, pageNumber * pageSize)
        : newList
    );
  };

  useEffect(() => {
    const currentList = [...list];
    setListInState(currentList);
    let temp = 0;
    if (titleRef.current) {
      temp += titleRef.current.offsetHeight;
    }
    if (footerRef.current) {
      temp += footerRef.current.offsetHeight;
    }
    setTableHeightDiff(temp);
  }, [pageNumber, pageSize, list]);
  let startPage = 1;
  if (totalPageNumber > 10) {
    if (pageNumber > totalPageNumber - 5) {
      startPage = totalPageNumber - 9;
    } else if (pageNumber > 5) {
      startPage = pageNumber - 4;
    }
  }
  return (
    <div
      className={`react-data-table-component-container ${props.containerClass ||
        ''}`}
      style={{ '--table-height-diff': `${tableHeightDiff}px` }}
    >
      {(props.showDownloadOption || props.title) && (
        <div
          className={`react-data-table-title-container ${props.titleContainerClass ||
            ''}`}
          ref={titleRef}
        >
          <div className={`react-data-table-title ${props.titleClass || ''}`}>
            {props.title ? props.title : ''}
          </div>
          <div className="react-data-table-title-option-container">
            {!props.hideOptionToSelectCol && (
              <MultiSelectDropdown
                options={props.columns}
                selected={selectedCols}
                onSelect={toggleSelectedColOption}
                setSelectedCols={setSelectedCols}
                placeholder="Select Columns to display"
                isMulti
              />
            )}
            <div
              className={`react-data-table-download-dropdown-container ${props.downloadDropDownContainerClass ||
                ''}`}
            >
              {props.showDownloadOption && (
                <MultiSelectDropdown
                  options={downloadOptions}
                  selected=""
                  onSelect={handleDownload}
                  placeholder="Select format to Export"
                  width="180px"
                />
              )}
            </div>
          </div>
        </div>
      )}
      <div
        className={`react-data-table-wrapper ${props.tableWapperClass || ''}`}
      >
        <table
          className={`react-data-table ${props.tableClass || ''}`}
          id="react-data-table"
        >
          <thead>
            <tr
              className={`react-data-table-header ${props.headerRowClass ||
                ''}`}
            >
              {props.showSerialNumber && (
                <th
                  className={`react-data-table-header-cell ${props.headerCellClass ||
                    ''}`}
                  style={{
                    width: `${colWidth}%`,
                    maxWidth: `${colWidth}%`,
                    minWidth: `${colWidth}%`,
                  }}
                >
                  S.No.
                </th>
              )}
              {props.columns.map((item, index) =>
                !selectedCols.length || selectedCols.includes(item.selector) ? (
                  <th
                    key={index}
                    className={`react-data-table-header-cell ${props.headerCellClass ||
                      ''}`}
                    style={{
                      width: `${colWidth}%`,
                      maxWidth: `${colWidth}%`,
                      minWidth: `${colWidth}%`,
                    }}
                  >
                    <span>{item.name}</span>
                    <div
                      className={`react-data-table-header-icon ${props.headerIconContainerClass ||
                        ''}`}
                    >
                      {item.sortable && (
                        <div className="react-data-table-sort-icon-container">
                          <img
                            src={sortUpIcon}
                            width="12px"
                            height="12px"
                            onClick={() => handleSortBy(item.selector)}
                            style={{
                              opacity:
                                sortBy.name === item.selector &&
                                sortBy.type === 'asc'
                                  ? 1
                                  : 0.2,
                              marginBottom: '-3px',
                            }}
                          />
                          <img
                            src={sortDownIcon}
                            width="12px"
                            height="12px"
                            onClick={() => handleSortBy(item.selector)}
                            style={{
                              opacity:
                                sortBy.name === item.selector &&
                                sortBy.type === 'dsc'
                                  ? 1
                                  : 0.2,
                            }}
                          />
                        </div>
                      )}
                      {item.filterable && (
                        <img
                          src={funnelIcon}
                          width="12px"
                          height="12px"
                          style={{
                            opacity: !filterBy[item.selector] ? 0.2 : 1,
                          }}
                          onClick={() => {
                            setFilterPopoverKey(
                              filterPopoverKey === item.selector
                                ? ''
                                : item.selector
                            );
                          }}
                        />
                      )}
                    </div>
                    {filterPopoverKey === item.selector && (
                      <Popover
                        filterInputContainerClass={
                          props.filterInputContainerClass
                        }
                        filterInputFieldClass={props.filterInputFieldClass}
                        filterInputApplyClass={props.filterInputApplyClass}
                        name={item.name}
                        selector={item.selector}
                        handleApply={handleFilterChange}
                        initialVal={filterBy[item.selector]}
                      />
                    )}
                  </th>
                ) : null
              )}
              {!!props.actions?.length && (
                <th
                  className={`react-data-table-header-cell ${props.headerCellClass ||
                    ''}`}
                  style={{
                    width: `${colWidth}%`,
                    maxWidth: `${colWidth}%`,
                    minWidth: `${colWidth}%`,
                  }}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody
            className={`react-data-table-body ${props.tableBodyClassName ||
              ''}`}
          >
            {listToDisplay.map((obj, index) => (
              <tr
                key={index}
                className={`react-data-table-row ${props.tableRowClass || ''}`}
              >
                {props.showSerialNumber && (
                  <td
                    className={`react-data-table-cell ${props.tableCellClass ||
                      ''}`}
                    style={{
                      width: `${colWidth}%`,
                      maxWidth: `${colWidth}%`,
                      minWidth: `${colWidth}%`,
                    }}
                  >
                    {pageNumber > 1
                      ? (pageNumber - 1) * pageSize + index + 1
                      : index + 1}
                  </td>
                )}
                {props.columns.map(item =>
                  !selectedCols.length ||
                  selectedCols.includes(item.selector) ? (
                    <td
                      className={`react-data-table-cell ${props.tableCellClass ||
                        ''}`}
                      key={item.selector + index}
                      style={{
                        width: `${colWidth}%`,
                        maxWidth: `${colWidth}%`,
                        minWidth: `${colWidth}%`,
                      }}
                    >
                      {obj[item.selector] || props.defaultValForEmpty || '-'}
                    </td>
                  ) : null
                )}
                {props.actions?.length && (
                  <td
                    className={`react-data-table-cell ${props.tableCellClass ||
                      ''}`}
                    style={{
                      width: `${colWidth}%`,
                      maxWidth: `${colWidth}%`,
                      minWidth: `${colWidth}%`,
                    }}
                  >
                    <div className="react-data-table-action-cell">
                      {props.actions?.map(item => (
                        <div
                          onClick={() => item.handler(index, obj)}
                          key={item.key}
                          className={`t-underLine c-pointer react-data-table-action-cell-item ${item.className ||
                            ''} ${props.actionsClass || ''}`}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {props.pagination && (
        <div
          className={`react-data-table-footer ${props.tableFooterClass || ''}`}
          ref={footerRef}
        >
          <div className="react-data-table-footer-info">
            <h4>Total Entries: {totalEntry}</h4>
            <h4>Total pages: {totalPageNumber}</h4>
          </div>
          <div className="react-data-table-footer-link-section">
            <div
              className={`eact-data-table-footer-link-pagesize ${props.pageSizeDropDownContainerClass ||
                ''}`}
            >
              <label htmlFor="pazeSizeOpt">Page size:</label>
              <MultiSelectDropdown
                options={pageSizeOption}
                selected={pageSize.toString()}
                onSelect={handlePageSizeChange}
                placeholder=""
                width="50px"
                fromTop
              />
            </div>
            <div
              className={`react-data-table-footer-link-container ${props.pageNumberContainerClass ||
                ''}`}
            >
              {totalPageNumber > 10 && (
                <span
                  className={`react-data-table-footer-link c-pointer ${props.pageNumberCellClass ||
                    ''}`}
                  onClick={() => setPageNumber(1)}
                >
                  Start
                </span>
              )}
              {totalPageNumber > 1 && (
                <span
                  className={`react-data-table-footer-link c-pointer ${props.pageNumberCellClass ||
                    ''}`}
                  onClick={() =>
                    pageNumber > 1 && setPageNumber(pageNumber - 1)
                  }
                >
                  Prev
                </span>
              )}

              {totalPageNumber > 1 &&
                Array(Math.min(totalPageNumber, 10))
                  .fill(0)
                  .map((_, i) => {
                    return (
                      <span
                        className={`react-data-table-footer-link c-pointer ${
                          startPage + i === pageNumber
                            ? `active ${props.activePageCellClass || ''}`
                            : ''
                        }  ${props.pageNumberCellClass || ''}`}
                        onClick={() => setPageNumber(startPage + i)}
                        key={i}
                      >
                        {startPage + i}
                      </span>
                    );
                  })}
              {totalPageNumber > 1 && (
                <span
                  className={`react-data-table-footer-link c-pointer ${props.pageNumberCellClass ||
                    ''}`}
                  onClick={() =>
                    pageNumber < totalPageNumber &&
                    setPageNumber(pageNumber + 1)
                  }
                >
                  Next
                </span>
              )}
              {totalPageNumber > 10 && (
                <span
                  className={`react-data-table-footer-link c-pointer ${props.pageNumberCellClass ||
                    ''}`}
                  onClick={() => setPageNumber(totalPageNumber)}
                >
                  Last
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Table;
