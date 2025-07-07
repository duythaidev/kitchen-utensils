'use client';
import { ICartItem, IProduct } from "@/types";
import { Check, CircleAlert, CircleX, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";
import Link from "next/link";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { TooltipContent } from "../ui/tooltip";
import { TooltipTrigger } from "../ui/tooltip";
import { TooltipProvider } from "../ui/tooltip";
import { Tooltip } from "../ui/tooltip";
import { removeProductFromCart, updateCartQuantity } from "@/actions/user.action";
import { useSession } from "next-auth/react";
import { toast } from "sonner";


const CartItem = ({ item }: { item: ICartItem }) => {
    const [quantity, setQuantity] = useState(item.quantity);
    const [open, setOpen] = useState(false);
    const { data: session } = useSession();
    const handleRemoveFromCart = async (id: number) => {
        const res = await removeProductFromCart(id, session?.user?.accessToken || '')
        if (res.success) {
            setOpen(false)
            toast.success("Product removed from cart")
        } else {
            toast.error(res.message)
        }
    }
    const [isQuantityChanged, setIsQuantityChanged] = useState(false);


    const handleUpdateQuantity = async () => {
        const res = await updateCartQuantity(item.product.id, quantity, session?.user?.accessToken || '')
        if (res.success) {
            setIsQuantityChanged(false);
            toast.success("Quantity updated successfully")
        } else {
            toast.error(res.message)
        }
    }

    return (
        <div className="flex items-center border-t border-gray-300 py-5 px-10">

            <div className="min-w-[387px]">
                <div className="flex items-center justify-between gap-5">
                    <div className="w-full flex items-center gap-5.5">
                        <div className="flex items-center justify-center rounded-[5px] bg-gray-2 overflow-hidden max-w-[80px] w-full h-17.5">
                            <img
                                src={item.product.images?.find(image => image.is_main)?.image_url || 'https://placehold.jp/80x17.5'}
                                alt="product"
                                width={200}
                                height={200}
                            />
                        </div>

                        <div>
                            <h3 className="text-dark ease-out duration-200 hover:text-blue-500">
                                <Link href={`/product/${item.product.id}`}> {item.product.product_name} </Link>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-w-[205px]">
                <p className="text-dark">${item.product?.discounted_price || item.product.price}</p>
            </div>

            <div className="min-w-[265px]">
                {item.product.stock && item.product.stock <= 0 || item.product?.stock === undefined && (
                    <div className="flex items-center gap-1.5">
                        <CircleAlert className="w-5 h-5" color="red" />
                        <span className="text-red"> Out of Stock </span>
                    </div>
                )}
                {item.product.stock}
            </div>

            <div className="flex items-center gap-2 flex-1 justify-end">
                <div className="min-w-[150px] flex justify-end">
                    {item.product.stock && item.product.stock > 0 && (
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => {
                                    const newValue = Math.max(1, quantity - 1)
                                    setQuantity(newValue)
                                    setIsQuantityChanged(newValue !== item.quantity)
                                }}
                                className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <Input
                                type="number"
                                min={1}
                                max={item.product.stock}
                                value={quantity}
                                onChange={(e) => {
                                    const value = Math.min(item.product.stock!, Math.max(1, Number(e.target.value)))
                                    setQuantity(value)
                                    setIsQuantityChanged(value !== item.quantity)
                                }}

                                className="w-16 h-10 text-center"
                            />
                            <button
                                onClick={() => {
                                    const newValue = Math.min(item.product.stock, quantity + 1)
                                    setQuantity(newValue)
                                    setIsQuantityChanged(newValue !== item.quantity)
                                }}
                                className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                            >
                                <Plus className="w-4 h-4" />
                            </button>

                            {isQuantityChanged && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <button
                                                onClick={handleUpdateQuantity}
                                                aria-label="confirm quantity change"
                                                className="w-10 h-10 cursor-pointer flex items-center justify-center bg-green-100 border border-green-400 rounded hover:bg-green-200 text-green-700"
                                            >
                                                <Check className="w-4 h-4" />
                                            </button>
                                        </TooltipTrigger>
                                        <TooltipContent>Change quantity</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}

                        </div>
                    )}
                </div>

                <Popover open={open} onOpenChange={setOpen}>
                    <TooltipProvider>
                        <Tooltip>
                            <PopoverTrigger asChild>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => setOpen(true)}
                                        aria-label="button for remove product from wishlist"
                                        className="flex cursor-pointer items-center  justify-center rounded-md w-[40px] h-[40px] bg-gray-100 border border-gray-300 ease-out duration-200 hover:bg-red-200 hover:border-red-400 hover:text-red-600"
                                    >
                                        <CircleX className="w-6 h-6" />

                                    </button>
                                </TooltipTrigger>
                            </PopoverTrigger>
                            <TooltipContent>
                                Remove from cart
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <PopoverContent className="w-[150px]">
                        <p className="text-sm mb-2">
                            Are you sure?
                        </p>
                        <div className="flex items-center justify-end gap-1">
                            <Button
                                onClick={() => handleRemoveFromCart(item.product.id)}
                                aria-label="button for remove product from wishlist"
                                className="cursor-pointer"
                                variant="destructive"
                                size={"sm"}
                            >
                                Yes
                            </Button>
                            <Button onClick={() => setOpen(false)}
                                aria-label="button for remove product from wishlist"
                                variant="outline"
                                className="cursor-pointer"
                                size={"sm"}
                            >
                                No
                            </Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default CartItem;
