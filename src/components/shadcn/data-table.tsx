"use client"

// import * as React from "react"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconCircleCheckFilled,
  IconDotsVertical,
  IconLayoutColumns,
  IconLoader,
  IconPlus,
  IconTrendingUp,
} from "@tabler/icons-react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"

import { Button } from "@/components/shadcn/button"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn/table"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shadcn/tabs"
import { columnsMap, DataTableProps, InferData, TableType } from "./data-table-columns"
import { ChevronDown, Filter, Search } from "lucide-react"
import AddUserModal from "@/components/Modals//User/AddUserModal"
import AddProductModal from "@/components/Modals//Product/AddProductModal"
import { useEffect, useState } from "react"
import AddCategoryModal from "@/components/Modals//Category/AddCategoryModal"
import EditCategoryModal from "@/components/Modals//Category/EditCategoryModal"
import { useRouter } from "nextjs-toploader/app"
import { useSearchParams } from "next/navigation"


export function DataTable<T extends TableType>({ data, type, pagination }: DataTableProps<T>) {

  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const AddModal = {
    users: <AddUserModal />,
    products: <AddProductModal />,
    categories: <AddCategoryModal />,
    orders: null,
  }[type]


  const columns = [...(columnsMap[type] as ColumnDef<InferData<T>>[])]

  const [sorting, setSorting] = useState<SortingState>([])
  // const [pagination, setPagination] = useState({
  //   pageIndex: 0,
  //   pageSize: 10,
  // })

  const { page = 1, limit = 10, total = 0 } = pagination || {};
  const totalPages = Math.ceil(total / limit);
  const router = useRouter();
  const searchParams = useSearchParams();

  const goToPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    params.set("limit", limit.toString());
    router.push("?" + params.toString());
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      // pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    // onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6 "
    >
      {/* filter bar */}
      <div className="flex items-center justify-between px-4 lg:px-6 mt-5!">
        <Label htmlFor="view-selector" className="sr-only">
          View
        </Label>
        <div className="flex items-center justify-between w-full gap-2 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <IconLayoutColumns />
                  <span className="hidden lg:inline">Customize Columns</span>
                  <span className="lg:hidden">Columns</span>
                  <IconChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== "undefined" &&
                      column.getCanHide()
                  )
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
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <ChevronDown />
                  <span className="hidden lg:inline">Sort by</span>
                  <span className="lg:hidden">Sort</span>
                  <IconChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuRadioGroup
                  className="capitalize"
                  value={sorting[0]?.id}
                  onValueChange={(columnId) => {
                    table.setSorting([
                      {
                        id: columnId,
                        desc: true, // true nếu muốn sort mặc định theo chiều giảm dần
                      },
                    ])
                  }}
                >
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanSort())
                    .map((column, index) => {
                      const col: any = columns.find((c: any) => c.accessorKey === column.id)
                      // console.log(col)
                      if (col) {
                        return (
                          <DropdownMenuRadioItem key={column.id} value={column.id}>
                            {col.header}
                          </DropdownMenuRadioItem>
                        )
                      }
                    })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            {type !== "orders" ? (
              <FilterInput placeholder={`Search by ${type}`}
                columnIndex={2} // name column
                table={table}
              />
            ) : (
              <FilterInput placeholder={`Search by user name`}
                columnIndex={1} // name column
                table={table}
              />
            )}
          </div>
          {AddModal}
        </div>
      </div>
      {/* table */}
      <TabsContent
        value="outline"
        className={`relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 `}
      >
        <div className="overflow-hidden rounded-lg border ">
          <Table>
            {/* Table Header */}
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead style={header.id === "id" ? { width: `${header.getSize()}px`, textAlign: "center" } : { width: `${header.getSize()}px`, }}
                        className={`${(header.id === "user_name") ? "w-[160px]" : ""} ${header.id === "product_image_url" ? "w-[50px]" : ""} ${header.id === "index" ? "w-[50px]" : ""}`} key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            {/* Table Body */}
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
        {/* Pagination */}
        <div className="flex w-full items-center gap-8 lg:w-fit mb-5">
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {page} of {totalPages}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => goToPage(1)}
              disabled={page <= 1}
            >
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1}
            >
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => goToPage(page + 1)}
              disabled={page >= totalPages}
            >
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => goToPage(totalPages)}
              disabled={page >= totalPages}
            >
              <IconChevronsRight />
            </Button>
          </div>
        </div>

      </TabsContent>

    </Tabs>
  )
}

const FilterInput = ({ placeholder, columnIndex, table }: { placeholder: string, columnIndex: number, table: any }) => {
  const [search, setSearch] = useState("")
  const router = useRouter()
  const handleSearch = () => {
    router.push(`?keyword=${search}`)
  }
  return (
    <div className="p-2 border-b last:border-b-0 flex items-center gap-2 w-3xs">
      <Input
        placeholder={placeholder}
        className="w-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch()
          }
        }}
      />

      <Button variant="outline" onClick={handleSearch}>
        <Search />
      </Button>
    </div>
  )
}