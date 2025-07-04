"use client"


import {
  ColumnDef,

} from "@tanstack/react-table"
import { z } from "zod"

import { Badge } from "@/components/ui/badge"

import { CircleCheck, CircleX, Eye, Pencil, Phone, Trash } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import ViewUserModal from "../Modals/User/ViewUserModal"
import EditUserModal from "../Modals/User/EditUserModal"
import BanUserModal from "../Modals/User/BanUserModal"
import ViewProductModal from "../Modals/Product/ViewProductModal"
import EditProductModal from "../Modals/Product/EditProductModal"
import DeleteProductModal from "../Modals/Product/DeleteProductModal"

export const userSchema = z.object({
  id: z.number(),
  avatar_url: z.string(),
  user_name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.string(),
  is_active: z.boolean(),
});

export const categorySchema = z.object({
  id: z.number(),
  category_name: z.string(),
})


export const productSchema = z.object({
  id: z.number(),
  product_name: z.string(),
  price: z.number(),
  discounted_price: z.number(),
  description: z.string(),
  category: categorySchema,
  stock: z.number(),
  product_image_url: z.string(),
});

export const orderSchema = z.object({
  id: z.number(),
  order_code: z.string(),
  total: z.number(),
});

export const usersColumns: ColumnDef<z.infer<typeof userSchema>>[] = [

  {
    id: "avatar_url",
    header: "Avatar",
    cell: ({ row }) => row.original.avatar_url ? <Avatar className="w-10 h-10 ">
      <AvatarImage src={row.original.avatar_url} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
      : <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
  },
  {
    accessorKey: "user_name",
    header: "Name",
    size: 100,

    cell: ({ row }) => {
      return <div className="font-medium">{row.original.user_name?.length > 25 ? row.original.user_name?.slice(0, 25) + "..." : row.original.user_name || "-"}</div>
    }
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.email.length > 30 ? row.original.email.slice(0, 30) + "..." : row.original.email || "-"}
        </Badge>
      </div>
    ),
  },

  {
    id: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          <Phone className="w-4 h-4" /> {row.original.phone || "-"}
        </Badge>
      </div>
    ),
  },

  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant="outline" className={`${row.original.role === "Admin" ? "text-blue-700" : "text-orange-500"} px-1.5`}>
        {row.original.role === "Admin" ? "Admin" : "User"}
      </Badge>
    ),
  },
  {
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.is_active === true ? (
          <CircleCheck className="text-white fill-green-500 dark:fill-green-400" />
        ) : (
          <CircleX className="text-white fill-red-500 dark:fill-red-400" />
        )}
        {row.original.is_active === true ? "Active" : "Banned"}
      </Badge>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (

      <div className="flex gap-2 flex-wrap" >
        <ViewUserModal user={row.original}></ViewUserModal>
        <EditUserModal user={row.original}></EditUserModal>
        <BanUserModal user={row.original}></BanUserModal>
      </div>

    ),
  },
]
export const productsColumns: ColumnDef<z.infer<typeof productSchema>>[] = [

  {
    id: "product_image_url",
    header: "Image",
    cell: ({ row }) => (
      <Avatar className="w-10 h-10">
        <AvatarImage src={row.original.product_image_url} />
      </Avatar>
    ),
  },
  {
    accessorKey: "product_name",
    header: "Name",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.product_name.length > 30
          ? row.original.product_name.slice(0, 30) + "..."
          : row.original.product_name}
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <div className=" font-medium text-primary">
        ${row.original.price.toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "discounted_price",
    header: "Discount",
    cell: ({ row }) =>
      row.original.discounted_price ? (
        <div className=" text-green-600 font-medium">
          ${row.original.discounted_price.toFixed(2)}
        </div>
      ) : (
        <div className=" text-muted-foreground">–</div>
      ),
  },

  {
    id: "category.category_name",
    header: "Category",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.category?.category_name ?? "Uncategorized"}
      </Badge>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.stock > 0 ? row.original.stock : <>
          <CircleX className="text-white fill-red-500 dark:fill-red-400" />Out of stock</>}
      </Badge>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <ViewProductModal product={row.original}></ViewProductModal>
        <EditProductModal product={row.original}></EditProductModal>
        <DeleteProductModal product={row.original}></DeleteProductModal>
      </div>
    ),
  },
]

export const categoriesColumns: ColumnDef<z.infer<typeof categorySchema>>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.id}</div>
    ),
  },
  {
    accessorKey: "category_name",
    header: "Category Name",
    cell: ({ row }) => (
      <div className="font-medium">
        {row.original.category_name.length > 25
          ? row.original.category_name.slice(0, 25) + "..."
          : row.original.category_name}
      </div>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2 flex-wrap">
        {/* <ViewCategoryModal category={row.original} />
<EditCategoryModal category={row.original} />
<DeleteCategoryModal category={row.original} /> */}
      </div>
    ),
  },
]


// export const ordersColumns: ColumnDef<z.infer<typeof orderSchema>>[] = [
//   {
//     id: "drag",
//     header: () => null,
//     cell: ({ row }) => <DragHandle id={row.original.id} />,
//   },
//   {
//     accessorKey: "header",
//     header: "Header",
//     cell: ({ row }) => {
//       return <TableCellViewer item={row.original} />
//     },
//     enableHiding: false,
//   },
//   {
//     accessorKey: "type",
//     header: "Section Type",
//     cell: ({ row }) => (
//       <div className="w-32">
//         <Badge variant="outline" className="text-muted-foreground px-1.5">
//           {row.original.type}
//         </Badge>
//       </div>
//     ),
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => (
//       <Badge variant="outline" className="text-muted-foreground px-1.5">
//         {row.original.status === "Done" ? (
//           <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
//         ) : (
//           <IconLoader />
//         )}
//         {row.original.status}
//       </Badge>
//     ),
//   },
//   {
//     accessorKey: "target",
//     header: () => <div className="w-full text-right">Target</div>,
//     cell: ({ row }) => (
//       <form
//         onSubmit={(e) => {
//           e.preventDefault()
//           toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
//             loading: `Saving ${row.original.header}`,
//             success: "Done",
//             error: "Error",
//           })
//         }}
//       >
//         <Label htmlFor={`${row.original.id}-target`} className="sr-only">
//           Target
//         </Label>
//         <Input
//           className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
//           defaultValue={row.original.target}
//           id={`${row.original.id}-target`}
//         />
//       </form>
//     ),
//   },
//   {
//     accessorKey: "limit",
//     header: () => <div className="w-full text-right">Limit</div>,
//     cell: ({ row }) => (
//       <form
//         onSubmit={(e) => {
//           e.preventDefault()
//           toast.promise(new Promise((resolve) => setTimeout(resolve, 1000)), {
//             loading: `Saving ${row.original.header}`,
//             success: "Done",
//             error: "Error",
//           })
//         }}
//       >
//         <Label htmlFor={`${row.original.id}-limit`} className="sr-only">
//           Limit
//         </Label>
//         <Input
//           className="hover:bg-input/30 focus-visible:bg-background dark:hover:bg-input/30 dark:focus-visible:bg-input/30 h-8 w-16 border-transparent bg-transparent text-right shadow-none focus-visible:border dark:bg-transparent"
//           defaultValue={row.original.limit}
//           id={`${row.original.id}-limit`}
//         />
//       </form>
//     ),
//   },
//   {
//     accessorKey: "reviewer",
//     header: "Reviewer",
//     cell: ({ row }) => {
//       const isAssigned = row.original.reviewer !== "Assign reviewer"

//       if (isAssigned) {
//         return row.original.reviewer
//       }

//       return (
//         <>
//           <Label htmlFor={`${row.original.id}-reviewer`} className="sr-only">
//             Reviewer
//           </Label>
//           <Select>
//             <SelectTrigger
//               className="w-38 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate"
//               size="sm"
//               id={`${row.original.id}-reviewer`}
//             >
//               <SelectValue placeholder="Assign reviewer" />
//             </SelectTrigger>
//             <SelectContent align="end">
//               <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
//               <SelectItem value="Jamik Tashpulatov">
//                 Jamik Tashpulatov
//               </SelectItem>
//             </SelectContent>
//           </Select>
//         </>
//       )
//     },
//   },
//   {
//     id: "actions",
//     cell: () => (
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button
//             variant="ghost"
//             className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
//             size="icon"
//           >
//             <IconDotsVertical />
//             <span className="sr-only">Open menu</span>
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent align="end" className="w-32">
//           <DropdownMenuItem>Edit</DropdownMenuItem>
//           <DropdownMenuItem>Make a copy</DropdownMenuItem>
//           <DropdownMenuItem>Favorite</DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     ),
//   },
// ]


export type TableType = keyof typeof schemaMap

export type InferData<T extends TableType> = z.infer<(typeof schemaMap)[T]>

export interface DataTableProps<T extends TableType> {
  type: T
  data: InferData<T>[]
}


export const schemaMap = {
  users: userSchema,
  products: productSchema,
  categories: categorySchema,
  // orders: orderSchema,
}

export const columnsMap = {
  users: usersColumns,
  products: productsColumns,
  categories: categoriesColumns,
  // orders: ordersColumns,
}
