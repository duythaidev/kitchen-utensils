'use client';
import { IProduct } from "@/types";
import { Banknote, Eye, ShoppingBag, Star, StarHalf, Truck } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/shadcn/tooltip";
import { Dialog, DialogTitle } from "@/components/shadcn/dialog";
import { useState } from "react";
import PreviewProductModal from "./PreviewProductModal";
import CustomModalBox from "@/components/Modals//CustomModalBox";
import { toast } from "sonner";
import { addToCart } from "@/actions/user.action";
import { useSession } from "next-auth/react";
import StarRating from "@/components/Custom/StarRating";
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
            toast.error('You must be logged in to add to cart');
        }
    }
    let rating = 0;

    if (product.reviews && product.reviews.length > 0) {
        const ratingSum = product.reviews?.reduce((sum, e) => sum + +e.rating, 0)
        const ratingLength = product.reviews.length;
        rating = ratingSum / ratingLength;
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
                            <button onClick={() => setOpen(true)} className="flex h-10 w-10 items-center justify-center bg-white rounded-lg cursor-pointer transition hover:text-primary">
                                <Eye className="h-5 w-5"></Eye>
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            View details
                        </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button onClick={() => handleAddToCart(1)} className="flex h-10 w-10 items-center justify-center bg-white rounded-lg cursor-pointer transition hover:text-primary">
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
                <Link href={`/product/${product?.id}`} className="text-lg font-semibold leading-tight text-gray-900 hover:underline ">
                    {product.product_name && product.product_name.length > 25 ? product?.product_name.slice(0, 25) + "..." : product.product_name}
                </Link>

                <div className="mt-2 flex items-center gap-2">
                    <StarRating rating={rating}></StarRating>

                    <p className="text-sm font-medium text-gray-900 ">{(rating).toFixed(1)}</p>
                    <p className="text-sm font-medium text-gray-500 ">({product.reviews?.length || 0})</p>
                </div>

                <ul className="mt-2 flex items-center gap-4">
                    <li className="flex items-center gap-2">
                        <Truck className="h-4 w-4 text-gray-500 " />
                        <p className="text-sm font-medium text-gray-500 ">Fast Delivery</p>
                    </li>

                    <li className="flex items-center gap-2">
                        <Banknote className="h-4 w-4 text-gray-500 " />

                        <p className="text-sm font-medium text-gray-500 ">Best Price</p>
                    </li>
                </ul>

                <div className=" mt-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">

                        <p className="text-2xl font-extrabold leading-tight text-dark ">
                            ${product?.discounted_price || product?.price}
                        </p>

                        {product?.discounted_price && product?.discounted_price > 0 && product?.discounted_price < product?.price && (
                            <p className="text-xl line-through font-extrabold leading-tight text-gray-400 ">
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