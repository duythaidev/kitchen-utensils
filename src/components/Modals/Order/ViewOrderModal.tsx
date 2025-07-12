'use client'

import { Eye } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/shadcn/dialog";
import { Button } from "@/components/shadcn/button";
import CustomModalBox from "../CustomModalBox";
import { IOrder, IOrderDetail } from "@/types";
import { Label } from "@/components/shadcn/label";
import { Input } from "@/components/shadcn/input";
import { Badge } from "@/components/shadcn/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/shadcn/avatar";

const ViewOrderModal = ({ order, isAdmin, title }: { order: IOrder, isAdmin: boolean, title: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer text-primary-dark">
          <Eye className="w-4 h-4 mr-1" />
          {title}
        </Button>
      </DialogTrigger>
      <CustomModalBox>
        <DialogHeader className="sr-only">
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            View order details and ordered products below.
          </DialogDescription>
        </DialogHeader>
        <ViewOrderModalContent order={order} isAdmin={isAdmin} />
      </CustomModalBox>
    </Dialog>
  );
};

const ViewOrderModalContent = ({ order, isAdmin }: { order: IOrder, isAdmin: boolean }) => {
  // console.log(order)
  return (
    <div className="grid gap-6">
      {/* Thông tin cơ bản */}
      <div className="grid gap-3">
        <Label>Shipping Address</Label>
        <Input disabled value={order.address} />
      </div>

      {
        isAdmin &&
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label>Total Price</Label>
            <Input disabled value={"$" + order.total_price} />
          </div>
          <div className="grid gap-3">
            <Label>Status</Label>
            <Badge
              variant="outline"
              className={`px-1.5 ${order.status === "pending"
                ? "text-yellow-600"
                : order.status === "delivered"
                  ? "text-green-600"
                  : order.status === "cancelled"
                    ? "text-red-500"
                    : "text-blue-600"
                }`}
            >
              {order.status}
            </Badge>
          </div>
          <div className="grid gap-3 col-span-2">
            <Label>Order At</Label>
            <Input disabled value={new Date(order.created_at).toLocaleDateString()} />
          </div>
        </div>
      }

      {/* Danh sách sản phẩm */}
      <div className="grid gap-4">
        <Label>Ordered Products</Label>
        <div className="grid gap-3">
          {order.orderDetails?.map((item: IOrderDetail) => (
            <div key={item.id}
              className="flex items-center flex-wrap justify-between gap-4 border p-3 rounded-md"
            >
              {/* Avatar ảnh sản phẩm */}
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 rounded-md">
                  <AvatarImage
                    src={
                      item.product?.images?.find((img) => img.image_url)?.image_url ||
                      "https://via.placeholder.com/40"
                    }
                    alt={item.product?.product_name || "Product"}
                  />
                  <AvatarFallback>IMG</AvatarFallback>
                </Avatar>

                {/* Thông tin sản phẩm */}
                <div className="flex flex-col">
                  <span className="font-medium">
                    {item.product?.product_name || "Unnamed product"}
                  </span>

                </div>
              </div>

              {/* Số lượng */}
              <div className="text-sm text-muted-foreground">
                <div>
                  Quantity: {item.quantity}
                </div>
                <div>
                  Price: ${item.price}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;
