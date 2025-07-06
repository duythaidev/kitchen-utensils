'use client'
import CartItem from "./CartItem"
import CustomButton from "../Custom/CustomButton"
import { ICartItem, IProduct } from "@/types/product"
import { useMemo, useState } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { IconChevronsLeft, IconChevronLeft, IconChevronRight, IconChevronsRight } from "@tabler/icons-react"
import { table } from "console"
import { Label } from "recharts"
const CartList = ({ cartItems }: { cartItems: ICartItem[] }) => {
    const totalPrice = useMemo(() => cartItems.reduce((sum, item) => {
        return sum + (item.product?.discounted_price || item.product.price) * (item.quantity || 1)
    }, 0), [cartItems])

    function handleCheckout(): void {
        console.log("Checkout")
        cartItems.forEach((item) => {
            console.log(item)
            if (item.product.stock <= 0) {
                toast.error("Product is out of stock")
                return
            }
        })
    }

    const [pageIndex, setPageIndex] = useState(0)
    const PAGE_SIZE = 10

    const totalPages = Math.ceil(cartItems.length / PAGE_SIZE)


    const paginatedItems = useMemo(() => {
        const start = pageIndex * PAGE_SIZE
        const end = start + PAGE_SIZE
        return cartItems.slice(start, end)
    }, [cartItems, pageIndex, PAGE_SIZE])


    return (
        <section className="overflow-hidden py-20 bg-gray-100">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">

                <div className="bg-white rounded-[10px] shadow-1">
                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[1170px]">
                            {/* <!-- table header --> */}
                            <div className="flex items-center py-5.5 px-10 w-full">
                                <div className="min-w-[387px]">
                                    <p className="text-dark">Product</p>
                                </div>

                                <div className="min-w-[205px]">
                                    <p className="text-dark">Unit Price</p>
                                </div>

                                <div className="min-w-[265px]">
                                    <p className="text-dark">Stock</p>
                                </div>

                                <div className="flex-1">
                                    <p className="text-dark text-right">Action</p>
                                </div>
                            </div>

                            {/* table row*/}
                            {paginatedItems.map((item: ICartItem) => (
                                <CartItem item={item} key={item.id} />
                            ))}

                            {/* total price + button */}
                            <div className="flex items-center justify-between py-5.5 px-10 border-t border-gray-200">
                                <div className="flex items-center justify-center px-4">

                                    <div className="flex w-full items-center gap-8 lg:w-fit">
                                      
                                        <div className="flex w-fit items-center justify-center text-sm font-medium">
                                            Page {pageIndex + 1} of {totalPages}
                                        </div>
                                        <div className="ml-auto flex items-center gap-2 lg:ml-0">
                                            <Button
                                                variant="outline"
                                                className="size-8"
                                                size="icon"
                                                onClick={() => setPageIndex(pageIndex + 1)}
                                                disabled={pageIndex >= totalPages - 1}
                                            >
                                                <span className="sr-only">Go to first page</span>
                                                <IconChevronsLeft />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="size-8"
                                                size="icon"
                                                onClick={() => setPageIndex(pageIndex - 1)}
                                                disabled={pageIndex === 0}
                                            >
                                                <span className="sr-only">Go to previous page</span>
                                                <IconChevronLeft />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="hidden size-8 lg:flex"
                                                size="icon"
                                                onClick={() => setPageIndex(totalPages - 1)}
                                                disabled={pageIndex >= totalPages - 1}
                                            >
                                                <span className="sr-only">Go to next page</span>
                                                <IconChevronRight />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                className="hidden size-8 lg:flex"
                                                size="icon"
                                                onClick={() => setPageIndex(totalPages - 1)}
                                                disabled={pageIndex >= totalPages - 1}
                                            >
                                                <span className="sr-only">Go to last page</span>
                                                <IconChevronsRight />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                <p className="text-lg font-semibold text-gray-800">
                                    Total: ${totalPrice.toFixed(2)}
                                </p>
                                <CustomButton className="" onClick={() => handleCheckout()} color="blue" >
                                    Checkout
                                </CustomButton>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default CartList
