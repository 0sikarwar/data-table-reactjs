/* eslint-disable jsx-a11y/alt-text */
import React, { ChangeEvent, useEffect, useState } from 'react';
import Props, { ListItem } from './types';
import './table.css';
import { funnelIcon, sortUpIcon, sortDownIcon } from './icon';
import { export2File, filterList, sortList } from './tabel.helper';
import Popover from './popover';
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
  const handleDownload = (e: ChangeEvent<HTMLSelectElement>) => {
    export2File(props.columns, list, e.target.value);
  };
  const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setTotalPageNumber(Math.ceil(totalEntry / Number(e.target.value)));
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
    >
      {(props.showDownloadOption || props.title) && (
        <div
          className={`react-data-table-title-container ${props.titleContainerClass ||
            ''}`}
        >
          <div className={`react-data-table-title ${props.titleClass || ''}`}>
            {props.title ? props.title : ''}
          </div>
          <div
            className={`react-data-table-download-dropdown-container ${props.downloadDropDownContainerClass ||
              ''}`}
          >
            {props.showDownloadOption && (
              <>
                <label
                  className="react-data-table-download-lable"
                  htmlFor="downloadOpt"
                >
                  Export data:
                </label>
                <select
                  className={`react-data-table-download-dropdown ${props.downloadDropDownClass ||
                    ''}`}
                  id="downloadOpt"
                  onChange={handleDownload}
                >
                  <option value=""> Select an option </option>
                  <option value=".txt">.txt</option>
                  <option value=".csv">.csv</option>
                </select>
              </>
            )}
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
                  style={{ width: '52px' }}
                >
                  S.No.
                </th>
              )}
              {props.columns.map((item, index) => (
                <th
                  key={index}
                  className={`react-data-table-header-cell ${props.headerCellClass ||
                    ''}`}
                  style={
                    item.width
                      ? {
                          width: item.width,
                          maxWidth: item.width,
                          minWidth: item.width,
                        }
                      : {}
                  }
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
              ))}
              {!!props.actions?.length && (
                <th
                  className={`react-data-table-header-cell ${props.headerCellClass ||
                    ''}`}
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
                    style={{ width: '52px' }}
                  >
                    {pageNumber > 1
                      ? (pageNumber - 1) * pageSize + index + 1
                      : index + 1}
                  </td>
                )}
                {props.columns.map(item => (
                  <td
                    className={`react-data-table-cell ${props.tableCellClass ||
                      ''}`}
                    key={item.selector + index}
                    style={item.width ? { width: item.width } : {}}
                  >
                    {obj[item.selector] || props.defaultValForEmpty || '-'}
                  </td>
                ))}
                {props.actions?.length && (
                  <td
                    className={`react-data-table-cell ${props.tableCellClass ||
                      ''}`}
                  >
                    {props.actions?.map(item => (
                      <span
                        onClick={() => item.handler(index, obj)}
                        key={item.key}
                        className={`t-underLine c-pointer ${item.className ||
                          ''} ${props.actionsClass || ''}`}
                      >
                        {item.label}
                      </span>
                    ))}
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
        >
          <div className="react-data-table-footer-info">
            <h4>Total Entries: {totalEntry}</h4>
            <h4>Total pages: {totalPageNumber}</h4>
          </div>
          <div className="react-data-table-footer-link-section">
            <div className={`${props.pageSizeDropDownContainerClass || ''}`}>
              <label htmlFor="pazeSizeOpt">Page size:</label>
              <select
                value={pageSize}
                id="pazeSizeOpt"
                onChange={handlePageSizeChange}
                className={`react-data-table-page-size-dropdown ${props.pageSizeDropDownClass ||
                  ''}`}
              >
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
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
