import React from 'react';
import { MultiSelectDropdownProps } from './types';
import './multiselectDropdown.css';
import { sortDownIcon } from './icon';

const MultiSelectDropdown: React.FunctionComponent<MultiSelectDropdownProps> = ({
  options,
  selected,
  onSelect,
  setSelectedCols,
  placeholder,
  isMulti,
  width,
  fromTop,
}) => {
  let selecteOption = '';
  if (!isMulti) {
    options.forEach(item => {
      if (item.selector === selected) {
        selecteOption = item.name;
      }
    });
  }

  return (
    <div
      className="react-data-table-multi-select-dropdown"
      style={width ? { width } : {}}
    >
      <div className="react-data-table-multi-select-dropdown__selected">
        <div>
          {selected.length ? (
            <>
              {isMulti ? `${selected.length} selected` : selecteOption}
              {isMulti && setSelectedCols && (
                <span
                  className="react-data-table-multi-select-dropdown-clear"
                  onClick={() => setSelectedCols([])}
                >
                  X
                </span>
              )}
            </>
          ) : (
            <>
              {placeholder}
              <img
                src={sortDownIcon}
                width="12px"
                height="12px"
                style={{
                  opacity: 0.2,
                  marginLeft: '3px',
                }}
              />
            </>
          )}
        </div>
      </div>
      <ul
        className={`react-data-table-multi-select-dropdown__options ${
          fromTop
            ? 'react-data-table-multi-select-dropdown__options-reversed'
            : ''
        }`}
      >
        {options.map((option, index) => {
          const isSelected = selected.includes(option.selector);

          return (
            <li
              className="react-data-table-multi-select-dropdown__option"
              onClick={() => onSelect({ id: option.selector })}
              key={index}
            >
              {isMulti && (
                <input
                  type="checkbox"
                  checked={isSelected}
                  className="react-data-table-multi-select-dropdown__option-checkbox"
                  readOnly
                ></input>
              )}
              <span>{option.name}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default MultiSelectDropdown;
