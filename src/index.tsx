import React from 'react';
import Table from './Table';
import types from './types';

const ReactDataTable = (props: JSX.IntrinsicAttributes & types & { children?: React.ReactNode }) => {
  return props.columns && props.list ? <Table {...props} /> : <h5>Record not found</h5>;
};

export default ReactDataTable;
