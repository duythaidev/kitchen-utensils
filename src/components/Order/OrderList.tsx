"use client"

import { useMemo, useState } from "react"
import { Button } from "../ui/button"
import { IconChevronsLeft, IconChevronLeft, IconChevronRight, IconChevronsRight, IconEye } from "@tabler/icons-react"
import { Badge } from "../ui/badge"
import ViewOrderModal from "../Modals/Order/ViewOrderModal"
import { IOrder } from "@/types"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"

const OrderList = ({ orders }: { orders: IOrder[] }) => {
  const [pageIndex, setPageIndex] = useState(0)
  const PAGE_SIZE = 10
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null)

  const totalPages = Math.ceil(orders.length / PAGE_SIZE) || 1

  const paginatedOrders = useMemo(() => {
    const start = pageIndex * PAGE_SIZE
    const end = start + PAGE_SIZE
    return orders.slice(start, end)
  }, [orders, pageIndex])

  return (
    <section className="overflow-hidden py-20 bg-gray-100">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="bg-white rounded-[10px] shadow-1">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[1170px]">
              {/* Table header */}
              <div className="flex items-center py-5.5 px-10 w-full font-semibold">
                <div className="min-w-[250px]">Total Price</div>
                <div className="min-w-[200px]">Status</div>
                <div className="min-w-[200px]">Order At</div>
                <div className="flex-1 text-right">Actions</div>
              </div>

              {/* Rows */}
              {paginatedOrders.map((order) => (
                <div key={order.id} className="flex items-center py-4 px-10 border-t text-sm">
                  <div className="min-w-[250px] font-medium">${order.total_price}</div>

                  <div className="min-w-[200px]">
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

                  <div className="min-w-[200px]">
                    {new Date(order.created_at).toLocaleDateString()}
                  </div>

                  <div className="flex-1 flex justify-end">
                    <ViewOrderModal
                      isAdmin={false}
                      order={order}
                      title="View ordered products"
                    />

                  </div>
                </div>
              ))}

              {/* Pagination */}
              <div className="flex items-center justify-between py-5.5 px-10 border-t border-gray-200">
                <div className="flex items-center justify-center px-4 gap-8 text-sm">
                  Page {pageIndex + 1} of {totalPages}
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" className="size-8" onClick={() => setPageIndex(0)} disabled={pageIndex === 0}>
                      <IconChevronsLeft />
                    </Button>
                    <Button variant="outline" size="icon" className="size-8" onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 0}>
                      <IconChevronLeft />
                    </Button>
                    <Button variant="outline" size="icon" className="size-8" onClick={() => setPageIndex(pageIndex + 1)} disabled={pageIndex >= totalPages - 1}>
                      <IconChevronRight />
                    </Button>
                    <Button variant="outline" size="icon" className="size-8" onClick={() => setPageIndex(totalPages - 1)} disabled={pageIndex >= totalPages - 1}>
                      <IconChevronsRight />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Modal */}
              {/* {selectedOrder && (
              )} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderList
