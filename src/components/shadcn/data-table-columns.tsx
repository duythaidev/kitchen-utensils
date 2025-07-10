"use client"

import {
  ColumnDef,

} from "@tanstack/react-table"
import { z } from "zod"

import { Badge } from "@/components/shadcn/badge"

import { CircleCheck, CircleX, Image, Phone, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"
import ViewUserModal from "@/components/Modals//User/ViewUserModal"
import EditUserModal from "@/components/Modals//User/EditUserModal"
import BanUserModal from "@/components/Modals//User/BanUserModal"
import ViewProductModal from "@/components/Modals//Product/ViewProductModal"
import EditProductModal from "@/components/Modals//Product/EditProductModal"
import DeleteProductModal from "@/components/Modals//Product/DeleteProductModal"
import EditCategoryModal from "@/components/Modals//Category/EditCategoryModal"
import DeleteCategoryModal from "@/components/Modals//Category/DeleteCategoryModal"
import ViewOrderModal from "@/components/Modals//Order/ViewOrderModal"
import ButtonStatus from "@/components/Modals//Order/ButtonStatus"
import ViewCategoryModal from "../Modals/Category/ViewCategoryModal"
import { useEffect } from "react"
import { fetchCategories } from "@/actions/client-api"
import { useSession } from "next-auth/react"
import { ICategory } from "@/types"
import { useState } from "react"  
export const userSchema = z.object({
  id: z.number(),
  avatar_url: z.string(),
  user_name: z.string(),
  email: z.string(),
  phone: z.string(),
  address: z.string(),
  role: z.string(),
  is_active: z.boolean(),
});

export const categorySchema = z.object({
  id: z.number(),
  category_name: z.string(),
  image_url: z.string(),
})


export const productSchema = z.object({
  id: z.number(),
  product_name: z.string(),
  price: z.number(),
  discounted_price: z.number().nullable(),
  description: z.string().nullable(),
  category: categorySchema.nullable(),
  stock: z.number(),
  images: z.array(z.object({
    id: z.number(),
    image_url: z.string(),
    is_main: z.boolean(),
  })).nullable(),
});


export const orderDetailSchema = z.object({
  id: z.number(),
  order_id: z.number(),
  product_id: z.number(),
  quantity: z.number(),
  price: z.number(),
  product: productSchema,
});

export const orderSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  address: z.string(),
  total_price: z.number(),
  status: z.enum(['pending', 'processing', 'delivered', 'cancelled']),
  created_at: z.date(),
  user: userSchema,
  orderDetails: z.array(orderDetailSchema),
});

export const usersColumns: ColumnDef<z.infer<typeof userSchema>>[] = [
  {
    accessorKey: "id",
    header: "#",
    size: 50,
    cell: ({ row }) => (
      <div className="text-center">{row.index + 1}</div>
    ),
  },
  {
    id: "avatar_url",
    size: 50,
    header: "Avatar",
    cell: ({ row }) =>
      row.original.avatar_url ?
        <Avatar className="w-10 h-10 ">
          <AvatarImage src={row.original.avatar_url} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        :
        <Avatar>
          <User className="w-10 h-10" />
        </Avatar>
  },
  {
    accessorKey: "user_name",
    header: "Name",
    size: 150,
    cell: ({ row }) => {
      return <div className="font-medium">{row.original.user_name?.length > 25 ? row.original.user_name?.slice(0, 25) + "..." : row.original.user_name || "-"}</div>
    }
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 150,
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
    size: 75,
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
    size: 50,
    cell: ({ row }) => (
      <Badge variant="outline" className={`${row.original.role === "Admin" ? "text-blue-700" : "text-orange-500"} px-1.5`}>
        {row.original.role === "Admin" ? "Admin" : "User"}
      </Badge>
    ),
  },
  {
    accessorKey: "is_active",
    header: "Status",
    size: 50,
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
    size: 300,
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
    accessorKey: "id",
    header: "#",
    size: 50,
    cell: ({ row }) => (
      <div className="text-center">{row.index + 1}</div>
    ),
  },
  {
    id: "product_image_url",
    header: "Image",
    size: 50,
    cell: ({ row }) => (
      <Avatar className="w-10 h-10">
        <AvatarImage src={row.original.images?.find(image => image.is_main)?.image_url} />
      </Avatar>
    ),
  },
  {
    accessorKey: "product_name",
    header: "Name",
    size: 150,
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
    size: 100,
    cell: ({ row }) => (
      <div className=" font-medium text-primary">
        ${row.original.price.toFixed(2)}
      </div>
    ),
  },
  {
    accessorKey: "discounted_price",
    header: "Discount",
    size: 100,
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
    accessorKey: "category.category_name",
    header: "Category",
    size: 100,
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.category?.category_name ?? "Uncategorized"}
      </Badge>
    ),
  },
  {
    accessorKey: "stock",
    header: "Stock",
    size: 100,
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
    size: 250,
    cell: ({ row }) => {
      const { data: session } = useSession()
      const [categories, setCategories] = useState<ICategory[]>([])
      useEffect(() => {
        const getCategories = async () => {
          const res = await fetchCategories(session?.accessToken || "")
          if (res.success) {
            setCategories(res.data.data)
          }
        }
        getCategories()
      }, [])
      return (
        <div className="flex gap-2">
          <ViewProductModal product={row.original}></ViewProductModal>
          <EditProductModal product={row.original} categories={categories}></EditProductModal>
          <DeleteProductModal product={row.original}></DeleteProductModal>
        </div>)
    }
  },
]

export const categoriesColumns: ColumnDef<z.infer<typeof categorySchema>>[] = [
  {
    accessorKey: "id",
    header: "#",
    size: 50,
    cell: ({ row }) => (
      <div className="text-center">{row.index + 1}</div>
    ),
  },
  {
    id: "image_url",
    size: 50,
    header: "Image",
    cell: ({ row }) =>
      row.original.image_url ?
        <img className="w-10 h-10 object-cover rounded-md" src={row.original.image_url} />
        :
        <Image className="w-10 h-10" />
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
        <ViewCategoryModal category={row.original} />
        <EditCategoryModal category={row.original} />
        <DeleteCategoryModal category={row.original} />
      </div>
    ),
  },
]


export const ordersColumns: ColumnDef<z.infer<typeof orderSchema>>[] = [
  {
    accessorKey: "id",
    header: "#",
    size: 50,
    cell: ({ row }) => (
      <div className="text-center">{row.index + 1}</div>
    ),
  },
  {
    id: "user_name",
    accessorKey: "user.user_name",
    header: "User Name",
    size: 100,
    cell: ({ row }) => <div className="font-medium">{row.original.user?.user_name?.length > 25 ? row.original.user?.user_name?.slice(0, 25) + "..." : row.original.user?.user_name || "-"}</div>,
  },
  {
    accessorKey: "address",
    header: "Shipping Address",
    size: 300,
    cell: ({ row }) => (
      <div className="max-w-[150px] truncate">{row.original.address.length > 50 ? row.original.address.slice(0, 50) + "..." : row.original.address || "-"}</div>
    ),
  },

  {
    id: "phone",
    header: "Phone",
    size: 100,
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        <Phone className="w-4 h-4" /> {row.original.user?.phone || "-"}
      </Badge>
    ),
  },
  {
    accessorKey: "total_price",
    header: "Total Price",
    size: 50,
    cell: ({ row }) => <div>${row.original.total_price}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    size: 50,
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`px-1.5 ${row.original.status === "pending"
          ? "text-yellow-600"
          : row.original.status === "delivered"
            ? "text-green-600"
            : row.original.status === "cancelled"
              ? "text-red-500"
              : "text-blue-600"
          }`}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "created_at",
    header: "Order At",
    size: 50,
    cell: ({ row }) => {
      const date = new Date(row.original.created_at);
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    size: 250,
    cell: ({ row }) => (
      <div className="flex gap-2">
        <ViewOrderModal order={row.original} isAdmin={true} title="View details"></ViewOrderModal>
        {row.original.status === "pending" && (
          <>
            <ButtonStatus order={row.original} status="processing" />
            <ButtonStatus order={row.original} status="cancelled" />
          </>
        )}

        {row.original.status === "processing" && (
          <>
            <ButtonStatus order={row.original} status="delivered" />
            <ButtonStatus order={row.original} status="cancelled" />
          </>
        )}
      </div>
    ),
  },
];


export type TableType = keyof typeof schemaMap

export type InferData<T extends TableType> = z.infer<(typeof schemaMap)[T]>

export interface DataTableProps<T extends TableType> {
  type: T
  data: InferData<T>[]
  pagination?: {
    page: number
    limit: number
    total: number
  }
}


export const schemaMap = {
  users: userSchema,
  products: productSchema,
  categories: categorySchema,
  orders: orderSchema,
}

export const columnsMap = {
  users: usersColumns,
  products: productsColumns,
  categories: categoriesColumns,
  orders: ordersColumns,
}
