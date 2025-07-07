'use client';
import { IProduct } from "@/types";
import { Eye, ShoppingBag, Star, StarHalf } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Dialog, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import PreviewProductModal from "./PreviewProductModal";
import CustomModalBox from "../Modals/CustomModalBox";
import { toast } from "sonner";
import { addToCart } from "@/actions/user.action";
import { useSession } from "next-auth/react";
const ProductModal = ({ open, setOpen, product }: { open: boolean, setOpen: (open: boolean) => void, product: IProduct | undefined }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <CustomModalBox className="max-w-[1000px]!">
                <DialogTitle className="sr-only">Product details</DialogTitle>

                {/* {JSON.stringify(product)} */}
                {product ? <PreviewProductModal setOpen={setOpen} product={product}></PreviewProductModal> : <div>No product</div>}
            </CustomModalBox>
        </Dialog>
    );
}


const ProductCard = ({ product }: { product: IProduct }) => {
    const session = useSession();

    const handleAddToCart = (quantity: number) => {
        console.log('Add to cart');
        const accessToken = session?.data?.user?.accessToken;
        if (product?.id && accessToken) {
            addToCart(product?.id, quantity, accessToken);
            toast.success('Added to cart');
        } else {
            toast.error('Cannot add to cart');
            // console.log('No product id or access token');
        }
    }
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="relative flex h-80 w-full overflow-hidden" >
                <ProductModal open={open} setOpen={setOpen} product={product}></ProductModal>

                {product?.discounted_price && product?.discounted_price > 0 && product?.discounted_price < product?.price && (
                    <span className="absolute top-0 left-0 w-28 translate-y-5 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white z-10">Sale</span>
                )}

                <Link href={`/product/${product?.id}`} className=" flex h-full w-full items-center justify-center overflow-hidden">
                    <img className="h-full w-full object-cover rounded-sm" src={product?.images?.find(image => image.is_main)?.image_url || product?.images?.[0]?.image_url || "https://placehold.jp/200x300.png"} alt="product image" />
                </Link>
                <div className="absolute flex justify-center bottom-[-100] w-full gap-x-5 mb-4 space-y-2 transition-all duration-300 group-hover:bottom-[-20]">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button onClick={() => setOpen(true)} className="flex h-10 w-10 items-center justify-center bg-white rounded-lg cursor-pointer transition hover:text-blue-500">
                                <Eye className="h-5 w-5"></Eye>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            View product
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button onClick={() => handleAddToCart(1)} className="flex h-10 w-10 items-center justify-center bg-white rounded-lg cursor-pointer transition hover:text-blue-500">
                                <ShoppingBag className="h-5 w-5"></ShoppingBag>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            Add to cart
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>

            <div className="mt-4 pb-5">
                <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline ">
                    {product?.product_name}
                </a>

                <div className="mt-2 flex items-center gap-2">
                    <div className="flex items-center">
                        <div className="relative">
                            <div className="flex gap-2">
                                {Array.from({ length: 5 }, () => (
                                    <Star fill="gray" strokeWidth={1} color="gray" />
                                ))}
                            </div>
                            <div className="absolute top-0 flex gap-2">
                                <Star fill="#FBB040" strokeWidth={1} color="#FBB040" />
                                <Star fill="#FBB040" strokeWidth={1} color="#FBB040" />
                                <StarHalf fill="#FBB040" strokeWidth={1} color="#FBB040" />
                            </div>
                        </div>
                    </div>

                    <p className="text-sm font-medium text-gray-900 ">5.0</p>
                    <p className="text-sm font-medium text-gray-500 ">(455)</p>
                </div>

                <ul className="mt-2 flex items-center gap-4">
                    <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                        </svg>
                        <p className="text-sm font-medium text-gray-500 ">Fast Delivery</p>
                    </li>

                    <li className="flex items-center gap-2">
                        <svg className="h-4 w-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        </svg>
                        <p className="text-sm font-medium text-gray-500 ">Best Price</p>
                    </li>
                </ul>

                <div className=" mt-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">

                        <p className="text-2xl font-extrabold leading-tight text-dark ">${product?.discounted_price || product?.price}</p>

                        {product?.discounted_price && product?.discounted_price > 0 && product?.discounted_price < product?.price && (
                            <p className="text-xl line-through font-extrabold leading-tight text-gray-500 ">
                                ${product?.price}
                            </p>
                        )}
                    </div>

                    <Tooltip>
                        <TooltipTrigger>
                            <ShoppingBag onClick={() => handleAddToCart(1)} className="h-6 w-6 cursor-pointer"></ShoppingBag>
                        </TooltipTrigger>
                        <TooltipContent>
                            Add to cart
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </>
    );
}

export default ProductCard;