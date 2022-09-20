import React, { createContext } from "react";
import axios from "axios";
import Papa from "papaparse";
import Table from "./components/Table/Table";
import { useState } from "react";
import { TotalExpenseComponent } from "./components/TotalExpense";

export type SORT_TYPE = "asc" | "desc";

export interface IData {
  amount: string;
  date: string;
  departments: string;
  member_name: string;
  project_name: string;
}

export interface IColumn {
  label: string;
  accessor: string;
  sortable: boolean;
  sortByOrder: SORT_TYPE | null;
}

type DataContextType = {
  data?: IData[];
  columns?: IColumn[];
};

export const DataContext = createContext<DataContextType>({});

function App(): JSX.Element {
  // This state will store the parsed data
  const [data, setData] = React.useState<IData[]>([]);
  const [columns, setColumns] = React.useState<IColumn[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    setLoading(true);
    axios
      .get("/api/expanses.csv")
      .then((res) => {
        console.log({ res });
        const csv = Papa.parse(res.data, { header: true });
        const parsedData = csv?.data;
        console.log({ parsedData });
        setData(parsedData);
        const _columns: IColumn[] = Object.keys(parsedData[0]).map((column) => {
          const columnArray = column.split("_");
          let label = "";
          if (columnArray.length > 1) {
            label = columnArray
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");
          } else {
            label = column.charAt(0).toUpperCase() + column.slice(1);
          }
          return {
            label,
            accessor: column,
            sortable: true,
            sortByOrder: "desc",
          };
        });
        setColumns(_columns);
        setLoading(false);
      })
      .catch((err) => console.error("checking err: ", err));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DataContext.Provider
      value={{
        data,
        columns,
      }}
    >
      <div className="container_main">
        <Table data={data} columns={columns} />
        <TotalExpenseComponent />
      </div>
    </DataContext.Provider>
  );
}
export default App;
