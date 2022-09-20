import React from "react";
import { IColumn, IData } from "../../App";
import { useSortableTable } from "../../useSortableTable";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

export interface TableProps {
  data: IData[];
  columns: IColumn[];
}

const Table = ({ data, columns }: TableProps) => {
  const { tableData, handleSorting } = useSortableTable({ data, columns });
  return (
    <>
      <div className="tableDiv">
        <table className="table">
          <TableHead {...{ columns, handleSorting }} />
          <TableBody {...{ columns, data: tableData }} />
        </table>
      </div>
    </>
  );
};

export default Table;
