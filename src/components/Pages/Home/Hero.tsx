'use client'
import { ChevronLeft, ChevronRight, Heart, MessageCircleMore, Rocket, ShieldCheck, Undo2 } from "lucide-react";
import Link from "next/link";
import CustomCarousel from "@/components/Custom/CustomCarousel";
import { IProduct } from "@/types";
// Top 5 most rated products

const Hero = ({ products }: { products: IProduct[] }) => {
    console.log(products)
    return (
        <section className="bg-[#E5EAF4] py-24 sm:pb-16 sm:pt-2">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2 h-2/3">
                    {/* Slider */}
                    <div className="relative lg:col-span-2 lg:row-span-2 overflow-hidden">
                        <div className="absolute inset-px rounded-lg bg-white"></div>
                        {/* top 3 in carousel */}
                        <CustomCarousel products={products} />
                        <div className="pointer-events-none absolute inset-px rounded-lg "></div>
                    </div>
                    {/* 2 left in 2 small box */}
                    <div className="relative lg:col-span-1 lg:row-span-1 ">
                        <div className="absolute inset-px rounded-lg bg-white "></div>
                        <div className=" relative flex h-full overflow-hidden rounded-lg ">
                            <div className="flex flex-col w-1/2 justify-between lg:pl-8 pl-5 py-10 ">
                                <Link href="/" className="hover:text-primary-dark font-bold text-md md:text-lg tracking-tight text-gray-950 ">{products.length > 0 && products[1].product_name}</Link>
                                <div>
                                    <p className="  max-w-lg text-sm/6 text-gray-600 ">
                                        limited time offer
                                    </p>
                                    <div className="flex">
                                        {
                                            products.length > 0 && products[1].discounted_price ? (
                                                <>
                                                    <span className="  text-2xl text-red-500 font-medium">${products.length > 0 && products[1].discounted_price}</span>
                                                    <span className=" text-2xl ml-2 line-through text-gray-500 font-medium">${products.length > 0 && products[1].price}</span>
                                                </>
                                            ) : (
                                                <span className="  text-2xl text-red-500 font-medium">${products.length > 0 && products[1].price}</span>
                                            )

                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col max-w-1/2 justify-center px-8 py-8 sm:px-10 md:pt-10 ">
                                <img src={(products.length > 0 && products[1]?.images && products[1]?.images[0]?.image_url) || "https://placehold.jp/150x150.png"} alt="" />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg   "></div>
                    </div>
                    {/* 2 right in 2 small box */}
                    <div className="relative lg:col-span-1 lg:row-span-1 ">
                        <div className="absolute inset-px rounded-lg bg-white "></div>
                        <div className=" relative flex h-full overflow-hidden rounded-lg ">
                            <div className="flex flex-col w-1/2 justify-between lg:pl-8 pl-5 py-10 ">
                                <Link href="/" className="hover:text-primary-dark font-bold text-md md:text-lg tracking-tight text-gray-950 ">{products.length > 0 && products[2].product_name}</Link>
                                <div>
                                    <p className="  max-w-lg text-sm/6 text-gray-600 ">
                                        limited time offer
                                    </p>
                                    <div className="flex">
                                        {
                                            products.length > 0 && products[2].discounted_price ? (
                                                <>
                                                    <span className="  text-2xl text-red-500 font-medium">${products.length > 0 && products[2].discounted_price}</span>
                                                    <span className=" text-2xl ml-2 line-through text-gray-500 font-medium">${products.length > 0 && products[2].price}</span>
                                                </>
                                            ) : (
                                                <span className="  text-2xl text-red-500 font-medium">${products.length > 0 && products[2].price}</span>
                                            )

                                        }

                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col max-w-1/2 justify-center px-8 py-8 sm:px-10 md:pt-10 ">
                                <img src={(products.length > 0 && products[2]?.images && products[2]?.images[0]?.image_url) || "https://placehold.jp/150x150.png"} alt="" />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg   "></div>
                    </div>
                </div>
                <div className="flex justify-around flex-wrap">
                    <div className="flex items-center mt-10 flex-1">
                        <Rocket size={45} />
                        <div className="ml-3.5">
                            <p className="mx-auto max-w-lg text-md font-semibold tracking-tight text-balance text-gray-950">Fast Shipping</p>
                            <p className="text-gray-500">For all orders</p>
                        </div>
                    </div>
                    <div className="flex items-center mt-10 flex-1">
                        <Undo2 size={45} />
                        <div className="ml-3.5">
                            <p className="mx-auto max-w-lg text-md font-semibold tracking-tight text-balance text-gray-950">1 & 1 Returns</p>
                            <p className="text-gray-500">Cancellation after 1 day</p>
                        </div>
                    </div>
                    <div className="flex items-center mt-10 flex-1">
                        <ShieldCheck size={45} />
                        <div className="ml-3.5">
                            <p className="mx-auto max-w-lg text-md font-semibold tracking-tight text-balance text-gray-950">100% Safety</p>
                            <p className="text-gray-500">Gurantee no shipping damage </p>
                        </div>
                    </div>
                    <div className="flex items-center mt-10 flex-1">
                        <MessageCircleMore size={45} />
                        <div className="ml-3.5">
                            <p className="mx-auto max-w-lg text-md font-semibold tracking-tight text-balance text-gray-950">24/7 Dedicated Support</p>
                            <p className="text-gray-500">Anywhere & anytime</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;