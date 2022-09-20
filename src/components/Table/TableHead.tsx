import React, { useState } from "react";
import { IColumn } from "../../App";

interface TableHeadProps {
  columns: IColumn[];
  handleSorting: any;
}

const TableHead = ({ columns, handleSorting }: TableHeadProps) => {
  const [sortField, setSortField] = useState("");
  const [order, setOrder] = useState("asc");

  const handleSortingChange = (accessor: string) => {
    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    handleSorting(accessor, sortOrder);
  };

  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor, sortable }) => {
          const cl = sortable
            ? sortField === accessor && order === "asc"
              ? "up"
              : sortField === accessor && order === "desc"
              ? "down"
              : "default"
            : "";
          return (
            <th
              key={accessor}
              onClick={
                sortable ? () => handleSortingChange(accessor) : undefined
              }
              className={cl}
            >
              {label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
