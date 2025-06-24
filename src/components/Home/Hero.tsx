import { Carousel } from "antd";
import { ChevronLeft, ChevronRight, Heart, MessageCircleMore, Rocket, ShieldCheck, Undo2 } from "lucide-react";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="bg-[#E5EAF4] py-24 sm:pb-16 sm:pt-2">
            <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
                {/* <h2 className="text-center text-base/7 font-semibold text-indigo-600">Deploy faster</h2>
                <p className="mx-auto mt-2 max-w-lg text-center text-4xl font-semibold tracking-tight text-balance text-gray-950 sm:text-5xl">Everything you need to deploy your app</p> */}

                <div className="mt-10 grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2 h-2/3">
                    {/* Slider */}
                    <div className="relative lg:col-span-2 lg:row-span-2">
                        <div className="absolute inset-px rounded-lg bg-white"></div>
                        <Carousel arrows
                            className="[&>button]:text-black!"
                            infinite>
                            <div>
                                <div className="relative px-8 py-12 flex h-[35rem] overflow-hidden ">
                                    <div className="flex flex-col w-1/2 justify-around lg:pl-8 lg:py-10 sm:pl-10 sm:pt-10 ">
                                        <div className="flex items-end">
                                            <span className=" text-blue-700 font-bold text-5xl tracking-tight max-lg:text-center">
                                                30%
                                            </span>
                                            <span className="ml-5 text-xl inline-block w-2.5 uppercase leading-none">sale off</span>
                                        </div>
                                        <div>
                                            <Link href="/" className="hover:text-blue-700 font-bold block text-3xl tracking-tight !text-gray-950 max-lg:text-center">Macbook Pro - 512/16GB</Link>
                                            <p className="  max-w-lg mt-5 text-gray-600 ">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, minima minus? Laborum ullam, in ipsam ducimus saepe ea illum. Deleniti ad corrupti omnis nam inventore quas aliquam quae iure illo.
                                            </p>
                                        </div>
                                        <a href="/" className="rounded-md w-2/5 text-center !bg-[#1c274c] px-5 py-3.5 text-sm font-semibold !text-white shadow-xs !transition duration-200 hover:!bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            Get started
                                        </a>
                                    </div>
                                    <div className="flex flex-col max-w-1/2 justify-center px-8 py-8 sm:px-10 sm:pt-10 ">
                                        <img src="https://cdn-icons-png.freepik.com/512/1/1694.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="relative px-8 py-12 flex h-[35rem] overflow-hidden ">
                                    <div className="flex flex-col w-1/2 justify-around lg:pl-8 lg:py-10 sm:pl-10 sm:pt-10 ">
                                        <div className="flex items-end">
                                            <span className=" text-blue-700 font-bold text-5xl tracking-tight max-lg:text-center">
                                                30%
                                            </span>
                                            <span className="ml-5 text-xl inline-block w-2.5 uppercase leading-none">sale off</span>
                                        </div>
                                        <div>
                                            <Link href="/" className="hover:text-blue-700 font-bold block text-3xl tracking-tight text-gray-950 max-lg:text-center">Macbook Pro - 512/16GB</Link>
                                            <p className="  max-w-lg text-sm/6 mt-5 text-gray-600 ">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, minima minus? Laborum ullam, in ipsam ducimus saepe ea illum. Deleniti ad corrupti omnis nam inventore quas aliquam quae iure illo.
                                            </p>
                                        </div>
                                        <a href="/" className="rounded-md w-2/5 text-center !bg-[#1c274c] px-5 py-3.5 text-sm font-semibold !text-white shadow-xs !transition duration-200 hover:!bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            Get started
                                        </a>
                                    </div>
                                    <div className="flex flex-col max-w-1/2 justify-center px-8 py-8 sm:px-10 sm:pt-10 ">
                                        <img src="https://cdn-icons-png.freepik.com/512/1/1694.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="relative px-8 py-12 flex h-[35rem] overflow-hidden ">
                                    <div className="flex flex-col w-1/2 justify-around lg:pl-8 lg:py-10 sm:pl-10 sm:pt-10 ">
                                        <div className="flex items-end">
                                            <span className=" text-blue-700 font-bold text-5xl tracking-tight max-lg:text-center">
                                                30%
                                            </span>
                                            <span className="ml-5 text-xl inline-block w-2.5 uppercase leading-none">sale off</span>
                                        </div>
                                        <div>
                                            <Link href="/" className="hover:text-blue-700 font-bold block text-3xl tracking-tight text-gray-950 max-lg:text-center">Macbook Pro - 512/16GB</Link>
                                            <p className="  max-w-lg text-sm/6 mt-5 text-gray-600 ">
                                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, minima minus? Laborum ullam, in ipsam ducimus saepe ea illum. Deleniti ad corrupti omnis nam inventore quas aliquam quae iure illo.
                                            </p>
                                        </div>
                                        <a href="/" className="rounded-md w-2/5 text-center !bg-[#1c274c] px-5 py-3.5 text-sm font-semibold !text-white shadow-xs !transition duration-200 hover:!bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                            Get started
                                        </a>
                                    </div>
                                    <div className="flex flex-col max-w-1/2 justify-center px-8 py-8 sm:px-10 sm:pt-10 ">
                                        <img src="https://cdn-icons-png.freepik.com/512/1/1694.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </Carousel>
                        {/* <div className="relative px-8 py-12 flex h-[35rem] overflow-hidden ">
                            <div className="flex flex-col w-1/2 justify-around lg:pl-8 lg:py-10 sm:pl-10 sm:pt-10 ">
                                <div className="flex items-end">
                                    <span className=" text-blue-700 font-bold text-5xl tracking-tight max-lg:text-center">
                                        30%
                                    </span>
                                    <span className="ml-5 text-xl inline-block w-2.5 uppercase leading-none">sale off</span>
                                </div>
                                <div>
                                    <Link href="/" className="hover:text-blue-700 font-bold block text-3xl tracking-tight text-gray-950 max-lg:text-center">Macbook Pro - 512/16GB</Link>
                                    <p className="  max-w-lg text-sm/6 mt-5 text-gray-600 ">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, minima minus? Laborum ullam, in ipsam ducimus saepe ea illum. Deleniti ad corrupti omnis nam inventore quas aliquam quae iure illo.
                                    </p>
                                </div>
                                <a href="#" className="rounded-md w-2/5 text-center bg-[#1c274c] px-5 py-3.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
                            </div>
                            <div className="flex flex-col max-w-1/2 justify-center px-8 py-8 sm:px-10 sm:pt-10 ">
                                <img src="https://cdn-icons-png.freepik.com/512/1/1694.png" alt="" />
                            </div>
                        </div> */}
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5"></div>
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
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 "></div>
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
                        <div className="pointer-events-none absolute inset-px rounded-lg shadow-sm ring-1 ring-black/5 "></div>
                    </div>
                </div>
                <div className="flex justify-around mt-10">
                    <div className="flex items-center">
                        <Rocket size={45} />
                        <div className="ml-3.5">
                            <p className="mx-auto max-w-lg text-center text-md font-semibold tracking-tight text-balance text-gray-950">Fast Shipping</p>
                            <p className="text-gray-500">kjashdkad</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <Undo2 size={45} />
                        <div className="ml-3.5">
                            <p className="mx-auto max-w-lg text-center text-md font-semibold tracking-tight text-balance text-gray-950">Fast Shipping</p>
                            <p className="text-gray-500">kjashdkad</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <ShieldCheck size={45} />
                        <div className="ml-3.5">
                            <p className="mx-auto max-w-lg text-center text-md font-semibold tracking-tight text-balance text-gray-950">Fast Shipping</p>
                            <p className="text-gray-500">kjashdkad</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <MessageCircleMore size={45} />
                        <div className="ml-3.5">
                            <p className="mx-auto max-w-lg text-center text-md font-semibold tracking-tight text-balance text-gray-950">Fast Shipping</p>
                            <p className="text-gray-500">kjashdkad</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;