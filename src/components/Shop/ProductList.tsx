'use client'
import { Button, Flex, Form, Input, Modal, Select } from "antd";
import { ArrowDownNarrowWide, ChevronDown, ChevronUp, Filter, Search, ShoppingBag, ShoppingCart } from "lucide-react";
import { useState } from "react";
import ModalContent from "./ModalContent";
import HoverLink from "../Custom/HoverLink";
import ProductCard from "./ProductCard";

const ProductList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
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
                                <Button style={{ padding: 10 }}>
                                    <Search className="w-4 h-4" />
                                </Button>
                            </div>
                            <Form className="flex items-center" >
                                <div className="flex items-center space-x-4">
                                    <div className="my-2">
                                        <Form.Item style={{ marginBottom: 0 }} name="filter" >
                                            <Select placeholder={<Flex align="center" gap={4}> <Filter className="w-4 h-4" /> <span> Filters </span> </Flex>} onChange={() => { }} style={{ width: '100px' }} >
                                                <Select.Option value="1" > 1 </Select.Option>
                                                <Select.Option value="2">2</Select.Option>
                                                <Select.Option value="3">3</Select.Option>
                                            </Select>
                                        </Form.Item>
                                    </div>
                                    <div className="my-2">
                                        <Form.Item style={{ marginBottom: 0 }} name="sort" >
                                            <Select placeholder={
                                                <Flex align="center" gap={4}>
                                                    <ArrowDownNarrowWide className="w-4 h-4" /> <span> Sort </span>
                                                </Flex>
                                            } onChange={() => { }} style={{ width: '100px' }} >
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

                                <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-3">

                                    <ProductCard showModal={showModal}></ProductCard>
                                    <ProductCard showModal={showModal}></ProductCard>
                                    <ProductCard showModal={showModal}></ProductCard>
                                    <ProductCard showModal={showModal}></ProductCard>
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