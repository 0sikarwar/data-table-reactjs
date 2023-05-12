import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import './popover.css';
import { PopoverProps } from './types';
const Popover: React.FunctionComponent<PopoverProps> = props => {
  const [filterValue, setFilterValue] = useState(props.initialVal || '');
  const [ctaText, setCtaText] = useState(props.initialVal ? 'Clear' : 'Apply');
  const filterRef = useRef<HTMLDivElement | null>(null);
  const handleApply = () => {
    props.handleApply(ctaText === 'Clear' ? '' : filterValue, props.selector);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterValue(e.target.value);
    if (ctaText === 'Clear') setCtaText('Apply');
  };
  useEffect(() => {
    const perentEle = document.getElementById('react-data-table');
    const filterEle = filterRef.current;
    if (perentEle && filterEle) {
      const {
        left: parentLeft,
        right: parentRight,
      } = perentEle.getBoundingClientRect();
      const { left } = filterEle.getBoundingClientRect();
      const width = filterEle.offsetWidth;
      console.log({ left, parentLeft, parentRight }, parentRight - width);
      if (left >= parentRight - width) {
        filterEle.style.left = 'unset';
        filterEle.style.right = '-25px';
      } else if (left < 0) {
        filterEle.style.left = '0px';
        filterEle.style.right = 'unset';
      }
    }
  }, []);
  return (
    <div className="react-data-table-filter-popover__wrapper">
      <div className="react-data-table-filter-popover__content" ref={filterRef}>
        <div
          className={`react-data-table-filter-input-container ${props.filterInputContainerClass ||
            ''}`}
        >
          <input
            value={filterValue}
            className={`react-data-table-filter-input-field ${props.filterInputFieldClass ||
              ''}`}
            placeholder={`Filter by ${props.name}`}
            onChange={handleChange}
          />
          <span
            className={`react-data-table-filter-input-apply
                        ${props.filterInputApplyClass || ''}`}
            onClick={handleApply}
          >
            {ctaText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Popover;
