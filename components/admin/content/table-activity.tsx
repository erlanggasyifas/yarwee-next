"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import axios from "axios";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/** ===== Endpoint default (bisa override via prop endpoint) ===== */
const API_ACTIVITIES_DEFAULT = "http://210.79.190.9:7456/api/admin/activities";

/** ===== Types sesuai payload API =====
 *  Fleksibel: akan mencoba mapping activity_name dari activity_name | name | title
 *  total_reported dari total_reported | reports_count | reports.length
 */
export type StatusRow = {
  id: number;
  activity_name?: string;
  name?: string;
  title?: string;
  total_reported?: number;
  reports_count?: number;
  reports?: unknown[] | null;
  // sisanya bebas sesuai backend
};

/** ===== Kolom: (Select), ID Activity, Activity Name, Total Reported, Actions ===== */
export const columnsStatus: ColumnDef<StatusRow>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        ID Activity
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="tabular-nums">{row.getValue("id")}</div>,
  },
  {
    id: "activity_name",
    accessorFn: (row) => row.activity_name ?? row.name ?? row.title ?? "",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Activity Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("activity_name") || "-"}</div>
    ),
  },
  {
    id: "total_reported",
    accessorFn: (row) => {
      if (typeof row.total_reported === "number") return row.total_reported;
      if (typeof row.reports_count === "number") return row.reports_count;
      if (Array.isArray(row.reports)) return row.reports.length;
      return 0;
    },
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Reported
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="tabular-nums">{Number(getValue() ?? 0)}</div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => console.log("See detail", item.id)}
            >
              See detail
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Edit", item.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-rose-600 focus:text-rose-600"
              onClick={() => console.log("Delete", item.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

/** ===== Props untuk reuse di 2 halaman ===== */
type StatusTableProps = {
  /** 'full' = filter + pagination, 'compact' = hanya tabel N terakhir */
  variant?: "full" | "compact";
  /** jumlah item untuk compact (default 5) */
  limit?: number;
  /** param tambahan utk server (mis. sortBy/order kalau backend mendukung) */
  params?: Record<string, any>;
  /** override endpoint bila perlu */
  endpoint?: string;
};

/** ===== Komponen tabel (bisa full/compact) ===== */
export function DataTableActivity({
  variant = "full",
  limit = 5,
  params,
  endpoint = API_ACTIVITIES_DEFAULT,
}: StatusTableProps) {
  // pasang Authorization header dari localStorage (sekali)
  React.useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token && !axios.defaults.headers.common["Authorization"]) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const [rows, setRows] = React.useState<StatusRow[]>([]);
  const [total, setTotal] = React.useState<number>(0);
  const [page, setPage] = React.useState<number>(1);
  const [lastPage, setLastPage] = React.useState<number>(1);
  const [loading, setLoading] = React.useState<boolean>(false);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const fetchActivities = React.useCallback(
    async (targetPage: number) => {
      try {
        setLoading(true);
        const query: Record<string, any> = {
          page: targetPage,
          ...(params || {}),
        };

        // untuk compact, coba minta perPage kecil (kalau backend mendukung)
        if (variant === "compact" && limit) query.perPage = limit;

        const res = await axios.get(endpoint, {
          params: query,
          headers: { Accept: "application/json" },
        });

        const payload = res.data?.data;
        // fleksibel: coba beberapa path umum
        let items: StatusRow[] =
          (payload?.activities as StatusRow[]) ??
          (payload?.data as StatusRow[]) ??
          (res.data?.activities as StatusRow[]) ??
          (res.data?.data as StatusRow[]) ??
          [];

        if (variant === "compact") {
          // fallback sort lokal by id desc jika backend tak mengurutkan
          items = [...items].sort((a, b) => (b as any).id - (a as any).id);
          if (limit) items = items.slice(0, limit);
          setRows(items);
          // no pagination UI
        } else {
          setRows(items);
          setTotal(payload?.pagination?.total ?? items.length);
          setPage(payload?.pagination?.currentPage ?? targetPage);
          setLastPage(payload?.pagination?.lastPage ?? 1);
        }
      } catch (err) {
        console.error("Failed to fetch activities:", err);
        setRows([]);
        if (variant === "full") {
          setTotal(0);
          setLastPage(1);
        }
      } finally {
        setLoading(false);
      }
    },
    [endpoint, variant, limit, params]
  );

  React.useEffect(() => {
    fetchActivities(1);
  }, [fetchActivities]);

  const table = useReactTable({
    data: rows,
    columns: columnsStatus,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // sorting client-side (halaman aktif)
    getFilteredRowModel: getFilteredRowModel(), // filter name client-side (FULL)
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const canPrev = page > 1;
  const canNext = page < lastPage;

  return (
    <div className="w-full">
      {/* Toolbar: hanya untuk FULL */}
      {variant === "full" && (
        <div className="mb-4 flex items-center">
          <Input
            placeholder="Filter activity name..."
            value={
              (table.getColumn("activity_name")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("activity_name")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columnsStatus.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columnsStatus.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer/pagination: hanya untuk FULL */}
      {variant === "full" && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.{" "}
            <span className="ml-2">
              Page {page} of {lastPage} • Total {total}
            </span>
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => canPrev && fetchActivities(page - 1)}
              disabled={!canPrev || loading}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => canNext && fetchActivities(page + 1)}
              disabled={!canNext || loading}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
