import React from "react";
import DataTable from "../components/DataTable";
import { columns } from "../components/column";
import { tableData } from "../data/tableData";

function Tables() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
        Users Table
      </h2>
      <DataTable data={tableData} columns={columns} />
    </div>
  );
}

export default Tables;
