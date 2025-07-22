'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';
import HoverLink from '../Custom/HoverLink';
import { useRouter } from 'nextjs-toploader/app';
import { IProduct } from '@/types';

const content = [
    'Love to cook? Or do you just love to eat? We have everything that you need for cooking, baking, serving and eating all in one place. These kitchen and dining essentials help make everyday meals quicker, easier and more enjoyable.',
    'Uni is a time for firsts – from the initial farewell to your first communal dinner. Whether you’re whipping up a pasta or gearing up for an epic night out, we’ve got all the kitchen essentials you need to make settling in a breeze.',
    'Let kitchen tools put efficiency, convenience and cheer into your cooking. We have a wide assortment of helpful kitchen tools and utensils for you to select.'
]

export default function CustomCarousel({ products }: { products: IProduct[] }) {

    const router = useRouter();

    return (
        <div className='w-full rounded-lg overflow-hidden '>
            <Swiper
                style={{
                    "--swiper-pagination-color": "#FFBA08",
                    "--swiper-pagination-bullet-inactive-color": "#999999",
                    "--swiper-pagination-bullet-inactive-opacity": "1",
                    "--swiper-pagination-bullet-width": "30px",
                    "--swiper-pagination-bullet-height": "3.3px",
                    "--swiper-pagination-bullet-border-radius": "3px",
                    "--swiper-pagination-bullet-horizontal-gap": "6px"
                } as any}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}

                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                slidesPerView={1}
                navigation={true}
                loop={true}
                modules={[Pagination, Autoplay]}
                className="bg-white!  "
            >
                {products?.slice(0, 3)?.map((product, index) =>
                    <SwiperSlide className='px-10! text-black!'>
                        <div className="relative  flex h-[450px] overflow-hidden ">
                            <div className="flex flex-col md:w-[55%] justify-around ">
                                {product.discounted_price && (
                                    <div className="flex items-end">
                                        <span className=" text-primary-dark font-bold text-5xl tracking-tight ">
                                            {((product.discounted_price / product.price) * 100).toFixed(0)}%
                                        </span>
                                        <span className="ml-5 text-xl inline-block w-2.5 uppercase leading-none">sale off</span>
                                    </div>
                                )}
                                <div>
                                    <HoverLink link="/shop" className=" font-bold block text-3xl tracking-tight  ">
                                        {/* Macbook Pro - 512/16GB */}
                                        {product.product_name}
                                    </HoverLink>
                                    <p className="  max-w-lg mt-5 text-gray-600 ">
                                        {/* Love to cook? Or do you just love to eat? We have everything that you need for cooking, baking, serving and eating all in one place. These kitchen and dining essentials help make everyday meals quicker, easier and more enjoyable. */}
                                        {content[index]}
                                    </p>
                                </div>
                                <button onClick={() => router.push('/shop')} className="capitalize cursor-pointer rounded-md w-2/5 text-center !bg-[#1c274c] px-5 py-3.5 text-sm font-semibold !text-white shadow-xs !transition duration-200 hover:!bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                    Get started
                                </button>
                            </div>
                            <div className="flex flex-col md:max-w-[45%] items-center justify-center px-8 py-8 sm:px-10 sm:pt-10 ">
                                {/* <img src="https://cdn-icons-png.freepik.com/512/1/1694.png" alt="" /> */}
                                <img alt="as" src={'https://m.media-amazon.com/images/I/71-U1rX30iL._AC_SL1500_.jpg'}></img>

                            </div>
                        </div>
                    </SwiperSlide>
                )}

                <SwiperSlide className='px-10! text-black!'>
                    <div className="relative  flex lg:h-[450px] overflow-hidden flex-wrap">
                        <div className="flex flex-col md:w-[55%] justify-around ">
                            <div className="flex items-end">
                                <span className=" text-primary-dark font-bold text-5xl tracking-tight">
                                    30%
                                </span>
                                <span className="ml-5 text-xl inline-block w-2.5 uppercase leading-none">sale off</span>
                            </div>
                            <div>
                                <HoverLink link="/shop" className=" font-bold block text-3xl tracking-tight ">
                                    Macbook Pro - 512/16GB
                                </HoverLink>
                                <p className="  max-w-lg mt-5 text-gray-600 ">
                                    {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, minima minus? Laborum ullam, in ipsam ducimus saepe ea illum. Deleniti ad corrupti omnis nam inventore quas aliquam quae iure illo. */}
                                    {/* Love to cook? Or do you just love to eat? We have everything that you need for cooking, baking, serving and eating all in one place. These kitchen and dining essentials help make everyday meals quicker, easier and more enjoyable. */}
                                    {content[0]}

                                </p>
                            </div>
                            <button onClick={() => router.push('/shop')} className="capitalize mt-5 md:mt-0 cursor-pointer rounded-md md:w-2/5 w-full text-center !bg-[#1c274c] px-5 py-3.5 text-sm font-semibold !text-white shadow-xs !transition duration-200 hover:!bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Get started
                            </button>
                        </div>
                        <div className="flex flex-col md:max-w-[45%] items-center justify-center px-8 py-8 sm:px-10 sm:pt-10 ">
                            {/* <img src="https://cdn-icons-png.freepik.com/512/1/1694.png" alt="" /> */}
                            <img alt="as" src={'https://m.media-amazon.com/images/I/71-U1rX30iL._AC_SL1500_.jpg'}></img>

                        </div>
                    </div>
                </SwiperSlide>

            </Swiper>
        </div>
    );
}
