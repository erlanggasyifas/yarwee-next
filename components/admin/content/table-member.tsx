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
import { toast } from "sonner";

const API_USERS = "http://210.79.190.9:7456/api/admin/users";

/* ============================================================
   USER TYPE (UPDATED)
   ============================================================ */
export type UserRow = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string;
  gender: string;
  dateOfBirth: string;
  isPremium: boolean;
  profilePicture?: string;
  role: "Admin" | "User";
  activity_user?: unknown;

  /* WAJIB ADA */
  createdAt: string;
};

/* ============================================================
   TABLE COLUMNS
   ============================================================ */
export const columns = (
  handleDeleteUser: (id: string) => void
): ColumnDef<UserRow>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(v) => table.toggleAllPageRowsSelected(!!v)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(v) => row.toggleSelected(!!v)}
      />
    ),
  },

  // FULL NAME
  {
    accessorKey: "fullName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("fullName")}</div>
    ),
  },

  // EMAIL
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },

  // ROLE
  {
    accessorKey: "role",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Role <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return (
        <span className="px-2 py-1 rounded bg-slate-800/40 text-xs capitalize">
          {role}
        </span>
      );
    },
  },

  // STATUS
  {
    id: "status",
    accessorFn: (row) => (row.isPremium ? "Premium" : "Free"),
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status <ArrowUpDown />
      </Button>
    ),
    cell: ({ getValue }) => {
      const v = String(getValue());
      return (
        <span
          className={`px-2 py-1 text-xs font-medium rounded ${
            v === "Premium"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-slate-700/30 text-slate-400"
          }`}
        >
          {v}
        </span>
      );
    },
  },

  // ACTIVITY COUNT
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
        Activity <ArrowUpDown />
      </Button>
    ),
    cell: ({ getValue }) => (
      <div className="tabular-nums">{Number(getValue() ?? 0)}</div>
    ),
  },

  // ACTIONS
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            {/* SEE DETAIL */}
            <DropdownMenuItem asChild>
              <Link href={`/user/${user.id}`}>See detail</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* DELETE */}
            <DropdownMenuItem
              className="text-rose-600"
              onClick={() => handleDeleteUser(user.id)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

/* ============================================================
   DATATABLE COMPONENT
   ============================================================ */

type UserTableProps = {
  variant?: "full" | "compact";
  limit?: number;
  params?: Record<string, any>;
  filterRole?: "User" | "Admin" | "All";
};

export function DataTableDemo({
  variant = "full",
  limit = 5,
  params,
  filterRole = "All",
}: UserTableProps) {
  /* SETUP TOKEN */
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

  /* ============================================================
     DELETE USER
     ============================================================ */

  const handleDeleteUser = async (id: string) => {
    const confirmDelete = confirm("Yakin ingin menghapus user ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_USERS}/${id}`);

      toast.success("User berhasil dihapus!");

      fetchUsers(page);
    } catch (e) {
      console.error(e);
      toast.error("Gagal menghapus user.");
    }
  };

  /* ============================================================
     FETCH USERS
     ============================================================ */
  const fetchUsers = React.useCallback(
    async (targetPage: number) => {
      try {
        setLoading(true);

        const query: any = {
          page: targetPage,
          ...(params || {}),
        };

        if (variant === "compact" && limit) query.perPage = limit;

        const res = await axios.get(API_USERS, {
          params: query,
          headers: { Accept: "application/json" },
        });

        const payload = res.data?.data;
        let users = payload?.users ?? [];

        // NORMALISASI
        users = users.map((u: any) => ({
          id: u.id,
          fullName: u.fullName,
          username: u.username,
          email: u.email,
          phoneNumber: u.phoneNumber,
          gender: u.gender,
          dateOfBirth: u.dateOfBirth,
          isPremium: u.isPremium,
          profilePicture: u.profilePicture,
          role: u.role,
          activity_user: u.activity_user,

          createdAt: u.createdAt,
        })) as UserRow[];

        // FILTER ROLE
        if (filterRole !== "All") {
          users = users.filter((u: { role: string }) => u.role === filterRole);
        }

        // SORT BY CREATED DATE (DESC)
        users = [...users].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        if (variant === "compact") {
          if (limit) users = users.slice(0, limit);
          setRows(users);
        } else {
          setRows(users);
          setTotal(payload?.pagination?.total ?? users.length);
          setPage(payload?.pagination?.currentPage ?? targetPage);
          setLastPage(payload?.pagination?.lastPage ?? 1);
        }
      } catch (e) {
        console.error("Failed to fetch users:", e);
        setRows([]);
      } finally {
        setLoading(false);
      }
    },
    [variant, limit, params, filterRole]
  );

  React.useEffect(() => {
    fetchUsers(1);
  }, [fetchUsers]);

  /* ============================================================
     REACT TABLE
     ============================================================ */
  const table = useReactTable({
    data: rows,
    columns: columns(handleDeleteUser), // ⬅ inject delete handler
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
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
      {/* Toolbar FULL */}
      {variant === "full" && (
        <div className="mb-4 flex items-center">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
              table.getColumn("email")?.setFilterValue(e.target.value)
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
                .filter((col) => col.getCanHide())
                .map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    checked={col.getIsVisible()}
                    onCheckedChange={(v) => col.toggleVisibility(!!v)}
                  >
                    {col.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
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
                <TableCell colSpan={10} className="h-24 text-center">
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
                <TableCell colSpan={10} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION */}
      {variant === "full" && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} selected.{" "}
            <span>
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
