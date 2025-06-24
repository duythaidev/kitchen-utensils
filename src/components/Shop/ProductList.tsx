'use client'
import { Button, Flex, Form, Input, Modal, Select } from "antd";
import { ArrowDownNarrowWide, ChevronDown, ChevronUp, Filter, Search, ShoppingBag, ShoppingCart } from "lucide-react";
import { useState } from "react";
import ModalContent from "./ModalContent";
import HoverLink from "../HoverLink";

const ProductList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filter, setFilter] = useState('');
    const [sort, setSort] = useState('');
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const [hiddenCategories, setHiddenCategories] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (
        <>
            <div className="bg-gray-100">
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 border-b border-gray-200 pt-24 pb-6 ">
                        <div className="bg-white shadow-1 rounded-lg py-4 px-5">
                            <div className="flex items-center justify-between">
                                <p>Filters:</p>
                                <button className="text-blue-600 hover:text-blue-700 cursor-pointer" onClick={() => { setHiddenCategories(false) }}>Clean All</button>
                            </div>
                        </div>
                        <div className='col-span-3 flex justify-between bg-white shadow-1 rounded-lg px-5'>
                            <div className="flex items-center gap-4">
                                <Input
                                    style={{ width: '200px' }}
                                    placeholder="Search products by name"
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                                <Button style={{padding:10}}>
                                    <Search className="w-4 h-4" />
                                </Button>
                            </div>
                            <Form className="flex items-center" >
                                <div className="flex items-center space-x-4">
                                    <div className="my-2">
                                        <Form.Item style={{ marginBottom: 0 }} name="filter" > <Select placeholder={<Flex align="center" gap={4}> <Filter className="w-4 h-4" /> <span> Filters </span> </Flex>} onChange={() => { }} style={{ width: '100px' }} >
                                            <Select.Option value="1" > 1 </Select.Option>
                                            <Select.Option value="2">2</Select.Option>
                                            <Select.Option value="3">3</Select.Option>
                                        </Select>
                                        </Form.Item>
                                    </div>
                                    <div className="my-2">
                                        <Form.Item style={{ marginBottom: 0 }} name="sort" >
                                            <Select placeholder={<Flex align="center" gap={4}> <ArrowDownNarrowWide className="w-4 h-4" /> <span> Sort </span> </Flex>} onChange={() => { }} style={{ width: '100px' }} >
                                                <Select.Option value="1" > 1 </Select.Option>
                                                <Select.Option value="2">2</Select.Option>
                                                <Select.Option value="3">3</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </div>
                    <section aria-labelledby="products-heading" className="pt-6 pb-24">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <form className="hidden lg:flex flex-col gap-4">
                                <h3 className="sr-only">Categories</h3>
                                <ul className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900 bg-white shadow-1 rounded-lg py-5 px-5" >
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

                                <div className="border-b border-gray-200 py-6 bg-white shadow-1 rounded-lg px-5">
                                    <h3 className="-my-3 flow-root">
                                        <button type="button" className="border-b border-gray-200 flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false" >
                                            <span className="font-medium text-gray-900">Category</span>
                                            <span className="ml-6 flex items-center">
                                                <span onClick={() => setHiddenCategories(!hiddenCategories)}><ChevronDown className={`${hiddenCategories ? '' : 'rotate-180'} transition-all duration-300`} /></span>
                                            </span>
                                        </button>
                                    </h3>
                                    {/* Filter section, show/hide based on section state. */}
                                    {hiddenCategories && <div className="pt-6" id="filter-section-1">
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
                                    </div>}
                                </div>

                            </form>
                            {/* Product grid */}
                            <div className="relative lg:col-span-3 ">

                                <div className=" group mb-10 flex w-full max-w-xs flex-col overflow-hidden ">
                                    <div className="relative flex h-80 w-72 overflow-hidden" >
                                        <span className="absolute top-0 left-0 w-28 translate-y-5 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white z-10">Sale</span>
                                        <img className="absolute top-0 right-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1578996953841-b187dbe4bc8a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzl8fGJsYXplcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="product image" />

                                        <div className="absolute flex justify-center bottom-[-100] w-full gap-x-5 mb-4 space-y-2 transition-all duration-300 group-hover:bottom-[-20]">
                                            <button onClick={showModal} className="flex h-10 w-10 items-center justify-center bg-white rounded-lg cursor-pointer transition hover:text-blue-500">
                                                <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
                                                    <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
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
                                            <p className="text-2xl font-extrabold leading-tight text-dark ">$1,699</p>
                                            <p className="text-xl line-through font-extrabold leading-tight text-gray-500 ">$1,699</p>
                                            <button type="button" className="inline-flex items-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-black  hover:bg-primary-800 focus:outline-none focus:ring-2 mr-2 focus:ring-blue-500">
                                                <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
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