'use client'
import { ChevronLeft, ChevronRight, Heart, MessageCircleMore, Rocket, ShieldCheck, Undo2 } from "lucide-react";
import Link from "next/link";
import CustomCarousel from "@/components/Custom/CustomCarousel";
import { IProduct } from "@/types";
// Top 5 most rated products

const Hero = ({ products }: { products: IProduct[] }) => {
    return (
        <section className="bg-[#E5EAF4] py-24 sm:pb-16 sm:pt-2">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2 h-2/3">
                    {/* Slider */}
                    <div className="relative lg:col-span-2 lg:row-span-2">
                        <div className="absolute inset-px rounded-lg bg-white"></div>
                        {/* top 3 in carousel */}
                        <CustomCarousel products={products} />
                        <div className="pointer-events-none absolute inset-px rounded-lg "></div>
                    </div>

                    {/* 2 left in 2 small box */}
                    <div className="relative lg:col-span-1 lg:row-span-1 ">
                        <div className="absolute inset-px rounded-lg bg-white "></div>
                        <div className=" relative flex h-full overflow-hidden rounded-lg ">
                            <div className="flex flex-col w-1/2 justify-between lg:pl-8 lg:py-10 sm:pl-10 sm:pt-10 ">
                                <Link href="/" className="hover:text-blue-700 font-bold mt-2 text-lg tracking-tight text-gray-950 max-lg:text-center">Macbook Pro - 512/16GB</Link>
                                <div>
                                    <p className="  max-w-lg text-sm/6 text-gray-600 ">
                                        limited time offer
                                    </p>
                                    <div className="flex">
                                        <span className="  text-2xl text-red-500 font-medium">$100</span>
                                        <span className=" text-2xl ml-2 line-through text-gray-500 font-medium">$99</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col max-w-1/2 justify-center px-8 py-8 sm:px-10 sm:pt-10 ">
                                <img src="https://cdn-icons-png.freepik.com/512/1/1694.png" alt="" />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg  "></div>
                    </div>

                    {/* small box */}
                    <div className="relative lg:col-span-1 lg:row-span-1 ">
                        <div className="absolute inset-px rounded-lg bg-white "></div>
                        <div className=" relative flex h-full overflow-hidden rounded-lg ">
                            <div className="flex flex-col w-1/2 justify-between lg:pl-8 lg:py-10 sm:pl-10 sm:pt-10 ">
                                <Link href="/" className="hover:text-blue-700 font-bold mt-2 text-lg tracking-tight text-gray-950 max-lg:text-center">Macbook Pro - 512/16GB</Link>
                                <div>
                                    <p className="  max-w-lg text-sm/6 text-gray-600 ">
                                        limited time offer
                                    </p>
                                    <div className="flex">
                                        <span className="  text-2xl text-red-500 font-medium">$100</span>
                                        <span className=" text-2xl ml-2 line-through text-gray-500 font-medium">$99</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col max-w-1/2 justify-center px-8 py-8 sm:px-10 sm:pt-10 ">
                                <img src="https://cdn-icons-png.freepik.com/512/1/1694.png" alt="" />
                            </div>
                        </div>
                        <div className="pointer-events-none absolute inset-px rounded-lg   "></div>
                    </div>
                </div>
                <div className="flex justify-around mt-10">
                    <div className="flex items-center">
                        <Rocket size={45} />
                        <div className="ml-3.5">
                            <p className="mx-auto max-w-lg text-md font-semibold tracking-tight text-balance text-gray-950">Fast Shipping</p>
                            <p className="text-gray-500">For all orders</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Undo2 size={45} />
                        <div className="ml-3.5">
                            <p className="mx-auto max-w-lg text-md font-semibold tracking-tight text-balance text-gray-950">1 & 1 Returns</p>
                            <p className="text-gray-500">Cancellation after 1 day</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <ShieldCheck size={45} />
                        <div className="ml-3.5">
                            <p className="mx-auto max-w-lg text-md font-semibold tracking-tight text-balance text-gray-950">100% Safety</p>
                            <p className="text-gray-500">Gurantee product is safe</p>
                        </div>
                    </div>
                    <div className="flex items-center">
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