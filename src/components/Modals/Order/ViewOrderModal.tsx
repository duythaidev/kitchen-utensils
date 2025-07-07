'use client'

import { Eye } from "lucide-react";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CustomModalBox from "../CustomModalBox";
// import { , OrderDetail } from "@/types/index"; // tự định nghĩa type

import { IProduct, IOrder, IOrderDetail } from "@/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const ViewOrderModal = ({ order }: { order: IOrder }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-blue-700">
          <Eye className="w-4 h-4 mr-1" />
          View
        </Button>
      </DialogTrigger>
      <CustomModalBox>
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            View order details and ordered products below.
          </DialogDescription>
        </DialogHeader>
        <ViewOrderModalContent order={order} />
      </CustomModalBox>
    </Dialog>
  );
};

const ViewOrderModalContent = ({ order }: { order: IOrder }) => {
  return (
    <div className="grid gap-6">
      {/* Thông tin cơ bản */}
      <div className="grid gap-3">
        <Label>Shipping Address</Label>
        <Input disabled value={order.address} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-3">
          <Label>Total Price</Label>
          <Input disabled value={"$" + order.total_price} />
        </div>
        <div className="grid gap-3">
          <Label>Status</Label>
          <Badge variant="outline" className="px-2 py-1 w-fit">
            {order.status}
          </Badge>
        </div>
        <div className="grid gap-3 col-span-2">
          <Label>Order At</Label>
          <Input disabled value={new Date(order.order_date).toLocaleString()} />
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid gap-3">
        <Label>Ordered Products</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {order.orderDetails?.map((item: IOrderDetail) => (
            <Card key={item.id} className="w-full">
              <CardHeader>
                <img
                  src={item.product?.images?.[0]?.image_url}
                  alt={item.product?.product_name}
                  className="w-full h-[160px] object-cover rounded"
                />
              </CardHeader>
              <CardContent className="grid gap-1 text-sm">
                <div className="font-semibold">
                  {item.product?.product_name || "Unnamed product"}
                </div>
                <div>Price: ${item.quantity}</div>
                <div>Quantity: {item.quantity}</div>
                {item.product?.discounted_price && item.product.discounted_price > 0 && (
                  <div className="text-green-600">Discounted: ${item.product.discounted_price}</div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewOrderModal;
