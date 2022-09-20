import React from "react";
import { IColumn, IData } from "../../App";

interface TableBodyProps {
  data: IData[];
  columns: IColumn[];
}

const TableBody = ({ data, columns }: TableBodyProps) => {
  return (
    <tbody>
      {data?.map((data: any) => {
        return (
          <tr key={data.id}>
            {columns.map(({ accessor }: IColumn) => {
              const tData = data[accessor] ? data[accessor] : "——";
              return <td key={accessor}>{tData}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
