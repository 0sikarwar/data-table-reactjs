import React from 'react';
import Table from './Table';

const ReactDataTable = (
  // @ts-ignore
  props
) => {
  return props.columns.length && props.list.length ? (
    <Table {...props} />
  ) : props.isLoading ? (
    <h3>Loading </h3>
  ) : (
    <h5>Record not found</h5>
  );
};

export default ReactDataTable;
