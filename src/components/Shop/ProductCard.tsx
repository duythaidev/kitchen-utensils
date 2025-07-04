'use client';
import { IProduct } from "@/types/product";
import { Eye, ShoppingBag, Star, StarHalf } from "lucide-react";
import Link from "next/link";
import CustomButton from "../Custom/CustomButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "recharts";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import PreviewProductModal from "./PreviewProductModal";
import CustomModalBox from "../Modals/CustomModalBox";

const ProductModal = ({ open, setOpen, product }: { open: boolean, setOpen: (open: boolean) => void, product: IProduct | undefined }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>

                <CustomModalBox className="max-w-[1000px]!">
                    {/* {JSON.stringify(product)} */}
                    {product ? <PreviewProductModal product={product}></PreviewProductModal> : <div>No product</div>}
                </CustomModalBox>
            </form>
        </Dialog>
    );
}


const ProductCard = ({ product }: { product: IProduct }) => {

    const [open, setOpen] = useState(false);
    return (
        <div className="bg-white shadow-1 rounded-lg py-4 px-5 col group flex w-full max-w-xs flex-col overflow-hidden ">
            <div className="relative flex h-80 w-full overflow-hidden" >
                <ProductModal open={open} setOpen={setOpen} product={product}></ProductModal>

                <span className="absolute top-0 left-0 w-28 translate-y-5 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white z-10">Sale</span>
                <Link href={`/product/${product?.id}`} className=" flex h-full w-full items-center justify-center overflow-hidden">
                    <img className="h-full w-full object-cover rounded-sm" src="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />
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
                            <button onClick={() => setOpen(true)} className="flex h-10 w-10 items-center justify-center bg-white rounded-lg cursor-pointer transition hover:text-blue-500">
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
                <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline ">Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max</a>

                <div className="mt-2 flex items-center gap-2">
                    <div className="flex items-center">
                        <div className="relative">
                            <div className="flex gap-2">
                                {Array.from({ length: 5 }, () => (
                                    <Star fill="gray" strokeWidth={1} color="gray" />
                                ))}
                            </div>
                            <div className="absolute top-0 flex gap-2">
                                <Star fill="yellow" strokeWidth={1} color="yellow" />
                                <Star fill="yellow" strokeWidth={1} color="yellow" />
                                <StarHalf fill="yellow" strokeWidth={1} color="yellow" />
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
                        <p className="text-2xl font-extrabold leading-tight text-dark ">$1,699</p>
                        <p className="text-xl line-through font-extrabold leading-tight text-gray-500 ">$1,699</p>
                    </div>

                    {/* <button type="button" className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black  hover:bg-primary-800 focus:outline-none focus:ring-2 mr-2 focus:ring-blue-500">
                        <ShoppingBag className="h-5 w-5"></ShoppingBag>
                        Add to cart
                    </button> */}
                    <Tooltip>
                        <TooltipTrigger>
                            <ShoppingBag className="h-6 w-6 cursor-pointer"></ShoppingBag>
                        </TooltipTrigger>
                        <TooltipContent>
                            Add to cart
                        </TooltipContent>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;