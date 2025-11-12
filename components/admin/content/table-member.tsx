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
import Link from "next/link";
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

const API_USERS = "http://210.79.190.9:7456/api/admin/users";

/** ===== Types sesuai payload API ===== */
export type UserRow = {
  id: number;
  email: string;
  name: string;
  phone_number: string;
  gender: string;
  date_of_birth: string;
  is_premium: boolean;
  profile_picture?: string;
  role?: string;
  activity_user?: unknown; // bisa object/array/null
};

/** ===== Kolom: Name, Email, Status, Activity + Actions (titik tiga) ===== */
export const columns: ColumnDef<UserRow>[] = [
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
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    id: "status",
    accessorFn: (row) => row.role ?? (row.is_premium ? "Premium" : "Free"),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ getValue }) => {
      const v = String(getValue() ?? "-");
      const isPremium = v.toLowerCase() === "premium";
      return (
        <span className={isPremium ? "text-emerald-600" : "text-slate-600"}>
          {v}
        </span>
      );
    },
  },
  {
    id: "activity",
    accessorFn: (row) => {
      const au = row.activity_user as any;
      if (!au) return 0;
      if (Array.isArray(au)) return au.length;
      if (typeof au === "object") return Object.keys(au).length;
      return 0;
    },
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Activity
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ getValue }) => {
      const n = Number(getValue() ?? 0);
      return <div className="tabular-nums">{n}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original;
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

            {/* INI YANG BERUBAH */}
            <DropdownMenuItem asChild>
              <Link href={`/member/${user.id}`}>See detail</Link>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => console.log("Edit", user.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-rose-600 focus:text-rose-600"
              onClick={() => console.log("Delete", user.id)}
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
type UserTableProps = {
  /** 'full' = filter + pagination, 'compact' = hanya tabel 5 terakhir */
  variant?: "full" | "compact";
  /** jumlah item untuk compact (default 5) */
  limit?: number;
  /** param tambahan utk server (mis. sortBy/order kalau backend mendukung) */
  params?: Record<string, any>;
};

/** ===== Komponen tabel (bisa full/compact) ===== */
export function DataTableDemo({
  variant = "full",
  limit = 5,
  params,
}: UserTableProps) {
  // pastikan Authorization header terpasang dari localStorage
  React.useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("auth_token") : null;
    if (token && !axios.defaults.headers.common["Authorization"]) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  const [rows, setRows] = React.useState<UserRow[]>([]);
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

  const fetchUsers = React.useCallback(
    async (targetPage: number) => {
      try {
        setLoading(true);
        const query: Record<string, any> = {
          page: targetPage,
          ...(params || {}),
        };

        // untuk compact, coba minta perPage kecil (kalau backend mendukung)
        if (variant === "compact" && limit) query.perPage = limit;

        const res = await axios.get(API_USERS, {
          params: query,
          headers: { Accept: "application/json" },
        });

        const payload = res.data?.data;
        let users = (payload?.users ?? []) as UserRow[];

        if (variant === "compact") {
          // Jika backend tidak mengurutkan, fallback sort lokal (created_at tidak ada: pakai id desc)
          users = [...users].sort((a, b) => (b as any).id - (a as any).id);
          if (limit) users = users.slice(0, limit);
          setRows(users);
          // tidak pakai pagination UI
        } else {
          setRows(users);
          setTotal(payload?.pagination?.total ?? users.length);
          setPage(payload?.pagination?.currentPage ?? targetPage);
          setLastPage(payload?.pagination?.lastPage ?? 1);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setRows([]);
        if (variant === "full") {
          setTotal(0);
          setLastPage(1);
        }
      } finally {
        setLoading(false);
      }
    },
    [variant, limit, params]
  );

  React.useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  const table = useReactTable({
    data: rows,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(), // sorting client-side (halaman aktif)
    getFilteredRowModel: getFilteredRowModel(), // filter email client-side (hanya full yang tampilkan input)
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
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
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
                .map((column) => {
                  return (
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
                  );
                })}
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
                  colSpan={columns.length}
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
              onClick={() => canPrev && fetchUsers(page - 1)}
              disabled={!canPrev || loading}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => canNext && fetchUsers(page + 1)}
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
