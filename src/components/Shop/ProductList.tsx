'use client'
import { ArrowDownNarrowWide, ChevronDown, ChevronUp, Filter, Search, ShoppingBag, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import PreviewProductModal from "./PreviewProductModal";
import HoverLink from "../Custom/HoverLink";
import ProductCard from "./ProductCard";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DialogClose } from "@radix-ui/react-dialog";
import { useRouter } from "nextjs-toploader/app";
import { useSearchParams } from "next/navigation";

const ProductList = ({ products }: { products: any[] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const keywordparam = useSearchParams().get('keyword');
    const sortparam = useSearchParams().get('sort');
    const priceSortParam = useSearchParams().get('priceSort');


    const priceFromParam = useSearchParams().get('priceFrom');
    const priceToParam = useSearchParams().get('priceTo');


    const [keyword, setKeyword] = useState(keywordparam || '');
    const [priceSort, setPriceSort] = useState(priceSortParam || '');
    const [sort, setSort] = useState(sortparam || null);

    const [priceFrom, setPriceFrom] = useState(priceFromParam || '');
    const [priceTo, setPriceTo] = useState(priceToParam || '');

    const showModal = () => {
        setIsModalOpen(true);
    };
    const router = useRouter();



    const [showCategories, setShowCategories] = useState(true);
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleSearchKeyword = () => {
        setSort('');
        router.push(`/shop?keyword=${keyword}`);
    }

    const [page, setPage] = useState(Number(useSearchParams().get('page')) || 1);
    const pageSize = 6;

    const paginatedProducts = products.slice((page - 1) * pageSize, page * pageSize);
    const totalPages = Math.ceil(products.length / pageSize);
    useEffect(() => {
        const params = new URLSearchParams();
        if (keyword) params.set("keyword", keyword);
        if (sort) params.set("sort", sort);
        if (priceSort) params.set("priceSort", priceSort);
        if (page) params.set("page", page.toString());

        router.push(`/shop?${params.toString()}`);
    }, [sort, priceSort, page]);


    return (
        <>
            <div className="bg-gray-100 flex justify-center">
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-x-8 gap-y-2 lg:grid-cols-4 border-b border-gray-200  md:pt-24 pb-6 ">
                        <div className="col-span-3 mt-5 md:mt-0 md:col-span-1 flex justify-center md:justify-between bg-white shadow-1 rounded-lg px-5 py-3 flex-wrap">
                            <div className="flex items-center justify-between w-full">
                                <p>Filters:</p>
                                <button className="block text-blue-600 hover:text-blue-700 cursor-pointer"
                                    onClick={() => {
                                        setKeyword('');
                                        setSort('');
                                        setPriceSort('');
                                        setPriceFrom('');
                                        setPriceTo('');
                                        setPage(1);
                                        router.push('/shop');
                                    }}>
                                    Clear Filter
                                </button>
                            </div>
                        </div>
                        <div className='col-span-3 flex justify-center md:justify-between bg-white shadow-1 rounded-lg px-5 py-2 flex-wrap'>
                            <div className="flex items-center gap-4">
                                <Input
                                    className="rounded-sm"
                                    placeholder="Search products by name"
                                    value={keyword}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearchKeyword();
                                        }
                                    }}
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                                <Button
                                    className="bg-white hover:bg-gray-100 cursor-pointer border" style={{ padding: 10 }}
                                    onClick={() => handleSearchKeyword()}
                                >
                                    <Search color="black" className="w-4 h-4" />
                                </Button>


                            </div>
                            <div className="flex items-center md:mt-0 mt-2" >
                                <div className="flex items-center space-x-2 flex-wrap justify-center">
                                    <span className="text-gray-500 mr-2">
                                        Order by:
                                    </span>
                                    <Button className=" cursor-pointer" variant={sort === 'newest' ? "secondary" : "outline"} onClick={() => setSort(sort == 'newest' ? '' : 'newest')}>
                                        Newest
                                    </Button>
                                    <Button className=" cursor-pointer" variant={sort === 'bestseller' ? "secondary" : "outline"} onClick={() => setSort(sort == 'bestseller' ? '' : 'bestseller')}>
                                        Best Seller
                                    </Button>

                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                                                Price: {priceSort === 'htl' ? 'High to Low' : priceSort === 'lth' ? 'Low to High' : 'Select'} <ChevronDown className="ml-2 w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onSelect={() => setPriceSort('htl')}>Price: High to Low</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => setPriceSort('lth')}>Price: Low to High</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>

                            </div>
                        </div>
                    </div>

                    <section aria-labelledby="products-heading" className="py-6">
                        <h2 id="products-heading" className="sr-only">
                            Products
                        </h2>
                        {/* <div className="bg-white shadow-1 rounded-lg py-4 px-5"> */}

                        <div className="grid  grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                            {/* Filters */}
                            <div className="hidden lg:flex flex-col gap-4">

                                <div className="border-b border-gray-200 py-6 bg-white shadow-1 rounded-lg px-5">
                                    <h3 className="-my-3 flow-root">
                                        <button type="button" className="border-b border-gray-200 flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-1" aria-expanded="false" >
                                            <span className="font-medium text-gray-900">Category</span>
                                            <span className="ml-6 flex items-center">
                                                <span onClick={() => setShowCategories(!showCategories)}><ChevronDown className={`${showCategories ? '' : 'rotate-180'} transition-all duration-300`} /></span>
                                            </span>
                                        </button>
                                    </h3>
                                    {/* Filter section, show/hide based on section state. */}
                                    {showCategories && <div className="pt-6" id="filter-section-1">
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
                                    {/* Price Range Filter */}

                                </div>
                                <div className="border-t border-gray-200 py-6 mt-4 bg-white shadow-1 rounded-lg px-5">
                                    <h3 className="-my-3 flow-root">
                                        <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                            <span className="font-medium text-gray-900">Khoảng giá</span>
                                        </button>
                                    </h3>
                                    <div className="pt-4">
                                        <div className="flex items-center gap-2">
                                            <Input type="number" placeholder="Từ" className="w-full" />
                                            <span className="text-gray-500">-</span>
                                            <Input type="number" placeholder="Đến" className="w-full" />
                                        </div>
                                        <Button className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white">Áp dụng</Button>
                                    </div>
                                </div>

                            </div>
                            {/* Product grid */}
                            <div className="relative lg:col-span-3 ">

                                <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                                    {paginatedProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}

                                </div>
                                {/* Your content */}
                            </div>


                        </div>
                        <div className="mt-5 flex justify-end space-x-2  ">
                            <Button
                                disabled={page === 1}
                                variant="outline"
                                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            >
                                Previous
                            </Button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                <Button
                                    key={pageNum}
                                    variant={page === pageNum ? "secondary" : "outline"}
                                    onClick={() => setPage(pageNum)}
                                >
                                    {pageNum}
                                </Button>
                            ))}

                            <Button
                                disabled={page === totalPages}
                                variant="outline"
                                onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            >
                                Next
                            </Button>
                        </div>
                    </section>
                </main>
            </div>



        </>
    );
}

export default ProductList;