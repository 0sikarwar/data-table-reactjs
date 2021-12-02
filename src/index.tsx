import React from "react";
import Table from "./Table";
import { loadingIcon } from "./icon";

const ReactDataTable = (
  // @ts-ignore
  props
) => {
  return props.columns.length && props.list.length ? (
    <Table {...props} />
  ) : props.isLoading ? (
    props.loadingComponent || (
      <div className="loading-container">
        <img src={loadingIcon} />
      </div>
    )
  ) : (
    <h5>Record not found</h5>
  );
};

export default ReactDataTable;
