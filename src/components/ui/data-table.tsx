"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { ReactNode } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onAdd?: () => void;
  moreBtn?: { label: string; onClick: () => void; icon?: ReactNode }[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onAdd,
  moreBtn,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div className="flex items-center gap-x-2 justify-between mb-2">
        <Input
          className="w-full md:w-auto md:min-w-1/2"
          placeholder="Search..."
        />
        <div className="flex gap-x-2 items-center">
          {moreBtn?.map(({ label, onClick, icon }) => (
            <Button
              key={label}
              variant="outline"
              className="hover:text-primary"
              onClick={onClick}
            >
              {icon}
              {label}
            </Button>
          ))}

          {onAdd && (
            <Button
              variant="outline"
              className="hover:text-primary"
              onClick={onAdd}
            >
              <Plus className="mr-2" />
              Add
            </Button>
          )}
        </div>
      </div>
      <div className="overflow-hidden rounded-none border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
