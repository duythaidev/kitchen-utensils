'use client'
import { Button, Modal } from "antd";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { useState } from "react";
import ModalContent from "./ModalContent";
import HoverLink from "./HoverLink";

const ProductList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="bg-gray-100">
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 border-b border-gray-200 pt-24 pb-6 ">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                            New Arrivals
                        </h1>
                        <div className='col-span-3 place-items-end self-center bg-white shadow-xs rounded-sm'>
                            <div className="flex items-center space-x-4">
                                <button data-modal-toggle="filterModal" data-modal-target="filterModal" type="button" className="my-2 flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto">
                                    <svg className="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z" />
                                    </svg>
                                    Filters
                                    <svg className="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                    </svg>
                                </button>
                                <button id="sortDropdownButton1" data-dropdown-toggle="dropdownSort1" type="button" className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 sm:w-auto">
                                    <svg className="-ms-0.5 me-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4v16M7 4l3 3M7 4 4 7m9-3h6l-6 6h6m-6.5 10 3.5-7 3.5 7M14 18h4" />
                                    </svg>
                                    Sort
                                    <svg className="-me-0.5 ms-2 h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:block">
                                <h3 className="sr-only">Categories</h3>
                                <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900" >
                                    <li>
                                        <a href="#">Totes</a>
                                    </li>
                                    <li>
                                        <a href="#">Backpacks</a>
                                    </li>
                                    <li>
                                        <a href="#">Travel Bags</a>
                                    </li>
                                    <li>
                                        <a href="#">Hip Bags</a>
                                    </li>
                                    <li>
                                        <a href="#">Laptop Sleeves</a>
                                    </li>
                                </ul>
                                <div className="border-b border-gray-200 py-6">
                                    <h3 className="-my-3 flow-root">
                                        <button
                                            type="button"
                                            className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
                                            aria-controls="filter-section-0"
                                            aria-expanded="false"
                                        >
                                            <span className="font-medium text-gray-900">Color</span>
                                            <span className="ml-6 flex items-center">
                                                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" >
                                                    <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
                                                </svg>
                                                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" > <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" /> </svg>
                                            </span>
                                        </button>
                                    </h3>
                                    <div className="pt-6" id="filter-section-0">
                                        <div className="space-y-4">
                                            <div className="flex gap-3">
                                                <div className="flex h-5 shrink-0 items-center">
                                                    <div className="group grid size-4 grid-cols-1">
                                                        <input id="filter-color-0" name="color[]" defaultValue="white" type="checkbox" className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                                                        <svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none" > <path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> <path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                                    </div>
                                                </div>
                                                <label
                                                    htmlFor="filter-color-0"
                                                    className="text-sm text-gray-600"
                                                >
                                                    White
                                                </label>
                                            </div>
                                            <div className="flex gap-3">
                                                <div className="flex h-5 shrink-0 items-center">
                                                    <div className="group grid size-4 grid-cols-1">
                                                        <input id="filter-color-1" name="color[]" defaultValue="beige" type="checkbox" className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                                                        <svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none" > <path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> <path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                                    </div>
                                                </div>
                                                <label htmlFor="filter-color-1" className="text-sm text-gray-600" > Beige </label>
                                            </div>
                                            <div className="flex gap-3">
                                                <div className="flex h-5 shrink-0 items-center">
                                                    <div className="group grid size-4 grid-cols-1">
                                                        <input id="filter-color-2" name="color[]" defaultValue="blue" type="checkbox" className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                                                        <svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none" > <path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> <path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                                    </div>
                                                </div>
                                                <label htmlFor="filter-color-2" className="text-sm text-gray-600" > Blue </label>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="border-b border-gray-200 py-6">
                                    <h3 className="-my-3 flow-root">
                                        <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false" >
                                            <span className="font-medium text-gray-900">Category</span>
                                            <span className="ml-6 flex items-center">
                                                {/* Expand icon, show/hide based on section open state. */}
                                                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" > <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" /> </svg>
                                                {/* Collapse icon, show/hide based on section open state. */}
                                                <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" > <path fillRule="evenodd" d="M4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10Z" clipRule="evenodd" /> </svg>
                                            </span>
                                        </button>
                                    </h3>
                                    {/* Filter section, show/hide based on section state. */}
                                    <div className="pt-6" id="filter-section-1">
                                        <div className="space-y-4">
                                            <div className="flex gap-3">
                                                <div className="flex h-5 shrink-0 items-center">
                                                    <div className="group grid size-4 grid-cols-1">
                                                        <input id="filter-category-0" name="category[]" defaultValue="new-arrivals" type="checkbox" className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                                                        <svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none" > <path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> <path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                                    </div>
                                                </div>
                                                <label htmlFor="filter-category-0" className="text-sm text-gray-600" > New Arrivals </label>
                                            </div>
                                            <div className="flex gap-3">
                                                <div className="flex h-5 shrink-0 items-center">
                                                    <div className="group grid size-4 grid-cols-1">
                                                        <input id="filter-category-1" name="category[]" defaultValue="sale" type="checkbox" className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto" />
                                                        <svg className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25" viewBox="0 0 14 14" fill="none" > <path className="opacity-0 group-has-checked:opacity-100" d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> <path className="opacity-0 group-has-indeterminate:opacity-100" d="M3 7H11" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> </svg>
                                                    </div>
                                                </div>
                                                <label htmlFor="filter-category-1" className="text-sm text-gray-600" > Sale </label>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </form>
                            {/* Product grid */}
                            <div className="relative lg:col-span-3 ">

                                <div className=" group my-10 flex w-full max-w-xs flex-col overflow-hidden ">
                                    <div className="relative flex h-80 w-72 overflow-hidden" >
                                        <span className="absolute top-0 left-0 w-28 translate-y-5 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white z-10">Sale</span>
                                        <img className="absolute top-0 right-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />

                                        <div className="absolute flex justify-center bottom-[-100] w-full gap-x-5 mb-4 space-y-2 transition-all duration-300 group-hover:bottom-[-20]">
                                            <button onClick={showModal} className="flex h-10 w-10 items-center justify-center bg-white rounded-lg cursor-pointer transition hover:text-blue-500">
                                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-width="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                                    <path stroke="currentColor" stroke-width="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>
                                            </button>
                                            <button className="flex h-10 w-10 items-center justify-center bg-white rounded-lg cursor-pointer transition hover:text-blue-500">
                                                <ShoppingBag className="h-5 w-5"></ShoppingBag>

                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-4 pb-5">
                                        <a href="#" className="text-lg font-semibold leading-tight text-gray-900 hover:underline ">Apple iMac 27", 1TB HDD, Retina 5K Display, M3 Max</a>

                                        <div className="mt-2 flex items-center gap-2">
                                            <div className="flex items-center">
                                                <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                                </svg>

                                                <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                                </svg>

                                                <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                                </svg>

                                                <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                                </svg>

                                                <svg className="h-4 w-4 text-yellow-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M13.8 4.2a2 2 0 0 0-3.6 0L8.4 8.4l-4.6.3a2 2 0 0 0-1.1 3.5l3.5 3-1 4.4c-.5 1.7 1.4 3 2.9 2.1l3.9-2.3 3.9 2.3c1.5 1 3.4-.4 3-2.1l-1-4.4 3.4-3a2 2 0 0 0-1.1-3.5l-4.6-.3-1.8-4.2Z" />
                                                </svg>
                                            </div>

                                            <p className="text-sm font-medium text-gray-900 ">5.0</p>
                                            <p className="text-sm font-medium text-gray-500 ">(455)</p>
                                        </div>

                                        <ul className="mt-2 flex items-center gap-4">
                                            <li className="flex items-center gap-2">
                                                <svg className="h-4 w-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h6l2 4m-8-4v8m0-8V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v9h2m8 0H9m4 0h2m4 0h2v-4m0 0h-5m3.5 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm-10 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
                                                </svg>
                                                <p className="text-sm font-medium text-gray-500 ">Fast Delivery</p>
                                            </li>

                                            <li className="flex items-center gap-2">
                                                <svg className="h-4 w-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M8 7V6c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1h-1M3 18v-7c0-.6.4-1 1-1h11c.6 0 1 .4 1 1v7c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1Zm8-3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                                </svg>
                                                <p className="text-sm font-medium text-gray-500 ">Best Price</p>
                                            </li>
                                        </ul>

                                        <div className=" mt-4 flex items-center justify-between gap-4">
                                            <p className="text-2xl font-extrabold leading-tight text-dark ">$1,699</p>
                                            <p className="text-xl line-through font-extrabold leading-tight text-gray-500 ">$1,699</p>
                                            <button type="button" className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black  hover:bg-primary-800 focus:outline-none focus:ring-2 mr-2 focus:ring-blue-500">
                                                <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                                                </svg>
                                                Add to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                {/* Your content */}
                            </div>
                        </div>
                    </section>
                </main>
            </div>
            <Modal
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                centered
                width={{

                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '70%',
                    xl: '70%',
                    xxl: '70%',
                }}
                footer={null}
            >
                <ModalContent></ModalContent>
            </Modal>
        </>
    );
}

export default ProductList;