import { Column, ListItem } from "./types";

export const sortList = (
  list: Array<ListItem>,
  selector: string,
  type: string
): Array<ListItem> => {
  return list.sort((x, y) => {
    let a =
      Number(x[selector]) || new Date(x[selector]).getTime() || x[selector];
    let b =
      Number(y[selector]) || new Date(y[selector]).getTime() || y[selector];
    if (a && b && (typeof a === "string" || typeof b === "string")) {
      a = a.toString();
      b = b.toString();
    }
    if (a > b || !b) {
      return type === "asc" ? 1 : -1;
    } else if (a < b || !a) {
      return type === "asc" ? -1 : 1;
    }
    return 0;
  });
};

export const filterList = (
  list: Array<ListItem>,
  filterObj: { [key: string]: string },
  sortBy: { name: string; type: string }
): Array<ListItem> => {
  const updatedList = list.filter((item) => {
    let isFiltered = true;
    for (let key in filterObj) {
      if (
        !item[key]?.toString()
          .toLowerCase()
          .includes(filterObj[key].toLowerCase())
      ) {
        isFiltered = false;
        break;
      }
    }
    return isFiltered;
  });
  const sortedList = sortList(updatedList, sortBy.name, sortBy.type)
  return sortedList
};

export const export2File = (
  column: Array<Column>,
  list: Array<ListItem>,
  fileType: string
) => {
  const csvString = [
    [column.map((obj) => '"' + obj.name + '"')],
    ...list.map((item) => [
      column.map((obj) => '"' + item[obj.selector] + '"').join(","),
    ]),
  ]
    .map((e) => e.join(","))
    .join("\r\n");

  const element = document.createElement("a");
  element.href = "data:text/csv;charset=utf-8," + encodeURI(csvString);
  element.target = "_blank";
  element.download = "route" + fileType;
  element.click();
};
