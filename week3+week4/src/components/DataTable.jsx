import React, { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

import {
  ArrowUp,
  ArrowDown,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function DataTable({ data, columns }) {
  const [sorting, setSorting] = useState([]);
  const [filter, setFilter] = useState("");

  // ✅ Optimized filtering using useMemo
  const filteredData = useMemo(() => {
    const search = filter.toLowerCase();
    return data.filter((row) =>
      ["name", "email", "role"].some((key) =>
        row[key]?.toLowerCase().includes(search)
      )
    );
  }, [data, filter]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <div className="p-4 space-y-4 dark:bg-gray-900 dark:text-white">
      {/* Search bar */}
      <div className="relative w-full sm:w-1/3">
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          className="pl-10 pr-3 py-2 w-full border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          placeholder="Search by name..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-auto border rounded-lg dark:border-gray-700">
        <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-4 py-2 text-left font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                  >
                    <div className="flex items-center gap-1">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {header.column.getIsSorted() === "asc" && (
                        <ArrowUp className="w-4 h-4" />
                      )}
                      {header.column.getIsSorted() === "desc" && (
                        <ArrowDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="bg-white divide-y divide-gray-100 dark:bg-gray-900 dark:divide-gray-700">
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No data found.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-2 dark:text-gray-200">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50 dark:bg-gray-700 dark:text-white"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        <span className="dark:text-gray-300">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>

        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="flex items-center gap-1 px-3 py-1 bg-gray-200 rounded disabled:opacity-50 dark:bg-gray-700 dark:text-white"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default DataTable;
