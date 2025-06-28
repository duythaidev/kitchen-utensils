'use client';
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

import { Autoplay, Pagination } from 'swiper/modules';
import Link from 'next/link';
import HoverLink from '../Custom/HoverLink';

export default function CustomCarousel() {


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
                <SwiperSlide className='px-10! text-black!'>
                    <div className="relative  flex h-[450px] overflow-hidden ">
                        <div className="flex flex-col w-[55%] justify-around ">
                            <div className="flex items-end">
                                <span className=" text-blue-700 font-bold text-5xl tracking-tight max-lg:text-center">
                                    30%
                                </span>
                                <span className="ml-5 text-xl inline-block w-2.5 uppercase leading-none">sale off</span>
                            </div>
                            <div>
                                <HoverLink link="/" className=" font-bold block text-3xl tracking-tight  max-lg:text-center">
                                    Macbook Pro - 512/16GB
                                </HoverLink>
                                <p className="  max-w-lg mt-5 text-gray-600 ">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, minima minus? Laborum ullam, in ipsam ducimus saepe ea illum. Deleniti ad corrupti omnis nam inventore quas aliquam quae iure illo.
                                </p>
                            </div>
                            <button className="capitalize cursor-pointer rounded-md w-2/5 text-center !bg-[#1c274c] px-5 py-3.5 text-sm font-semibold !text-white shadow-xs !transition duration-200 hover:!bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Get started
                            </button>
                        </div>
                        <div className="flex flex-col max-w-[45%] items-center justify-center px-8 py-8 sm:px-10 sm:pt-10 ">
                            <img src="https://cdn-icons-png.freepik.com/512/1/1694.png" alt="" />
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='px-10! text-black!'>
                    <div className="relative  flex h-[450px] overflow-hidden ">
                        <div className="flex flex-col w-[55%] justify-around ">
                            <div className="flex items-end">
                                <span className=" text-blue-700 font-bold text-5xl tracking-tight max-lg:text-center">
                                    30%
                                </span>
                                <span className="ml-5 text-xl inline-block w-2.5 uppercase leading-none">sale off</span>
                            </div>
                            <div>
                                <HoverLink link="/" className=" font-bold block text-3xl tracking-tight  max-lg:text-center">
                                    Macbook Pro - 512/16GB
                                </HoverLink>
                                <p className="  max-w-lg mt-5 text-gray-600 ">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, minima minus? Laborum ullam, in ipsam ducimus saepe ea illum. Deleniti ad corrupti omnis nam inventore quas aliquam quae iure illo.
                                </p>
                            </div>
                            <button className="capitalize cursor-pointer rounded-md w-2/5 text-center !bg-[#1c274c] px-5 py-3.5 text-sm font-semibold !text-white shadow-xs !transition duration-200 hover:!bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Get started
                            </button>
                        </div>
                        <div className="flex flex-col max-w-[45%] items-center justify-center px-8 py-8 sm:px-10 sm:pt-10 ">
                            <img src="https://cdn-icons-png.freepik.com/512/1/1694.png" alt="" />
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}
