/* eslint-disable */
import "./style.css";
import { DataContext } from "../../App";
import { useContext, useState } from "react";

export function TotalExpenseComponent(): JSX.Element {
  const [filterFiled, setFilterFiled] = useState("departments");
  const { data } = useContext(DataContext);

  interface IFilterData {
    name: string;
    value: number;
  }

  let filterObject = {};

  data?.forEach(function (d) {
    const decimalNumber = d.amount.split(".")[0];
    const replaced = decimalNumber.replace(",", "");
    const amount = parseFloat(replaced);
    if (filterObject.hasOwnProperty(d[`${filterFiled}`])) {
      filterObject[d[`${filterFiled}`]] =
        filterObject[d[`${filterFiled}`]] + amount;
    } else {
      filterObject[d[`${filterFiled}`]] = amount;
    }
  });

  let filteredData: IFilterData[] = [];

  for (let prop in filterObject) {
    filteredData.push({ name: prop, value: filterObject[prop] });
  }

  const TotalAmount = filteredData.reduce(
    (previousValue, currentValue) => previousValue + currentValue.value,
    0
  );

  return (
    <div className="totalExpense">
      <div className="wrapwidth">
        <div className="expense_dropdown">
          <h2>
            Total Expnses by:
            <select
              value={filterFiled}
              onChange={(e) => setFilterFiled(e.target.value)}
              id="expense_dropdown"
            >
              <option value="departments">Departments</option>
              <option value="project_name">Project Name</option>
              <option value="date">Date</option>
              <option value="member_name">Member Name</option>
            </select>
          </h2>
        </div>
        <div className="expense_table">
          <table
            width="100%"
            className="expense_tables"
            cellSpacing="0"
            cellPadding="0"
          >
            <thead>
              <tr>
                <th style={{ textAlign: "start" }}>Departments</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((dataObject) => (
                <tr>
                  <td>{dataObject.name}</td>
                  <td>{dataObject.value}€</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <span>Total</span> <span>{TotalAmount}€</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
