'use client'
import { ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import ProductCard from "./ProductCard"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "nextjs-toploader/app"
import { useSearchParams } from "next/navigation"
import { ICategory, IProduct } from "@/types/product"
import { toast } from "sonner"

const ProductList = ({ categories, products }: { categories: ICategory[], products: IProduct[] }) => {

    const keywordparam = useSearchParams().get('keyword')
    const sortparam = useSearchParams().get('sort')
    const priceSortParam = useSearchParams().get('priceSort')


    const priceFromParam = useSearchParams().get('priceFrom')
    const priceToParam = useSearchParams().get('priceTo')


    const [keyword, setKeyword] = useState(keywordparam || '')
    const [priceSort, setPriceSort] = useState(priceSortParam || '')
    const [sort, setSort] = useState(sortparam || null)

    const [priceFrom, setPriceFrom] = useState(priceFromParam || '')
    const [priceTo, setPriceTo] = useState(priceToParam || '')

    const router = useRouter()

    const categoryParam = useSearchParams().get('category')

    const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
        return categoryParam ? categoryParam.split(',') : []
    })


    const [showCategories, setShowCategories] = useState(true)

    const searchInputRef = useRef<HTMLInputElement>(null)
    const priceFromRef = useRef<HTMLInputElement>(null)
    const priceToRef = useRef<HTMLInputElement>(null)


    const handleSearchKeyword = () => {
        if (searchInputRef.current) {
            const searchKeyword = searchInputRef.current.value
            setKeyword(searchKeyword)
            router.push(`/shop?keyword=${searchKeyword}`)
        }
    }
    const page = useSearchParams().get('page')

    const [pageIndex, setPageIndex] = useState((page !== null && page !== undefined) ? Number(page) - 1 : 0)

    const PAGE_SIZE = 6
    const totalPages = Math.ceil(products.length / PAGE_SIZE)

    const paginatedProducts = useMemo(() => {
        const start = pageIndex * PAGE_SIZE
        const end = start + PAGE_SIZE
        return products.slice(start, end)
    }, [products, pageIndex, PAGE_SIZE])

    useEffect(() => {
        const params = new URLSearchParams()
        keyword && params.set("keyword", keyword)
        sort && params.set("sort", sort)
        priceSort && params.set("priceSort", priceSort)
        priceFrom && params.set("priceFrom", priceFrom)
        priceTo && params.set("priceTo", priceTo)
        selectedCategories.length > 0 && params.set("category", selectedCategories.join(','));

        searchInputRef.current && (searchInputRef.current.value = keyword);
        // 
        (pageIndex !== null && pageIndex !== undefined && page !== null && page !== undefined) && params.set("page", (pageIndex + 1).toString())

        params.size > 0 && router.push(`/shop?${params.toString()}`)
    }, [sort, priceSort, priceFrom, priceTo, selectedCategories, pageIndex])



    const handleClearFilter = () => {
        setKeyword('')
        setSort('')
        setPriceSort('')
        setPriceFrom('')
        setPriceTo('')
        setSelectedCategories([])
        setPageIndex(0)
        if (searchInputRef.current) {
            searchInputRef.current.value = ''
        }
        router.push('/shop')
    }

    const handleApplyPriceRange = () => {
        if (priceFromRef.current && priceToRef.current) {
            const priceFrom = priceFromRef.current.value ? +priceFromRef.current.value : ""
            const priceTo = priceToRef.current.value ? +priceToRef.current.value : ""
            // console.log("priceFrom , priceTo", priceFrom, priceTo)
            if (priceFrom && priceTo !== "" && (priceFrom > priceTo)) {
                toast.error('Price from must be less than price to')
                return
            }
            setPriceFrom(priceFrom.toString())
            setPriceTo(priceTo.toString())
        }
    }

    return (
        <>
            <div className="bg-gray-100 flex justify-center">
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-x-8 gap-y-2 lg:grid-cols-4 border-b border-gray-200  md:pt-24 pb-6 ">
                        <div className="col-span-3 mt-5 md:mt-0 md:col-span-1 flex justify-center md:justify-between bg-white shadow-1 rounded-lg px-5 py-3 flex-wrap">
                            <div className="flex items-center justify-between w-full">
                                <p>Filters:</p>
                                <button className="block text-blue-600 hover:text-blue-700 cursor-pointer"
                                    onClick={handleClearFilter}
                                >
                                    Clear Filter
                                </button>
                            </div>
                        </div>
                        <div className='col-span-3 flex justify-center md:justify-between bg-white shadow-1 rounded-lg px-5 py-2 flex-wrap'>
                            <div className="flex items-center gap-4">
                                <Input
                                    className="rounded-sm"
                                    placeholder="Search products by name"
                                    // value={keyword}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearchKeyword()
                                        }
                                    }}
                                    ref={searchInputRef}
                                // onChange={(e) => setKeyword(e.target.value)}
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
                                    {showCategories && (
                                        <div className="pt-6" id="filter-section-1">
                                            <div className="space-y-4">
                                                {categories.map((category, index) => {
                                                    const id = `filter-category-${index}`
                                                    const isChecked = selectedCategories.includes(category.id.toString())

                                                    return (
                                                        <div className="flex gap-3" key={category.id}>
                                                            <div className="flex h-5 shrink-0 items-center">
                                                                <div className="group grid size-4 grid-cols-1">
                                                                    <input
                                                                        id={id}
                                                                        name="categories"
                                                                        type="checkbox"
                                                                        value={category.id}
                                                                        checked={isChecked}
                                                                        onChange={(e) => {
                                                                            const value = e.target.value
                                                                            setSelectedCategories((prev) =>
                                                                                prev.includes(value)
                                                                                    ? prev.filter((v) => v !== value)
                                                                                    : [...prev, value]
                                                                            )
                                                                        }}
                                                                        className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-indigo-600"
                                                                    />
                                                                    <svg
                                                                        className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                                                                        viewBox="0 0 14 14"
                                                                        fill="none"
                                                                    >
                                                                        <path
                                                                            className="opacity-0 group-has-checked:opacity-100"
                                                                            d="M3 8L6 11L11 3.5"
                                                                            strokeWidth={2}
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <label htmlFor={id} className="text-sm text-gray-600">
                                                                {category.category_name}
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )}

                                    {/* Price Range Filter */}

                                </div>
                                <div className="border-t border-gray-200 py-6 mt-4 bg-white shadow-1 rounded-lg px-5">
                                    <h3 className="-my-3 flow-root">
                                        <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                                            <span className="font-medium text-gray-900">Price Range</span>
                                        </button>
                                    </h3>
                                    <div className="pt-4">
                                        <div className="flex items-center gap-2">
                                            <Input ref={priceFromRef} type="number" placeholder="From" className="w-full" />
                                            <span className="text-gray-500">-</span>
                                            <Input ref={priceToRef} type="number" placeholder="To" className="w-full" />
                                        </div>
                                        <Button onClick={handleApplyPriceRange}
                                            className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                                        >
                                            Apply
                                        </Button>
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
                        <div className="mt-5 flex justify-end items-center  border-t border-gray-200 pt-6">
                            <div className="flex w-full items-center gap-8 lg:w-fit">
                                <div className="flex w-fit items-center justify-center text-sm font-medium">
                                    Page {pageIndex + 1} of {totalPages}
                                </div>
                                <div className="ml-auto flex items-center gap-2 lg:ml-0">
                                    <Button
                                        variant="outline"
                                        className="size-8"
                                        size="icon"
                                        onClick={() => setPageIndex(0)}
                                        disabled={pageIndex === 0}
                                    >
                                        <span className="sr-only">Go to first page</span>
                                        <ChevronsLeft className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="size-8"
                                        size="icon"
                                        onClick={() => setPageIndex(pageIndex - 1)}
                                        disabled={pageIndex === 0}
                                    >
                                        <span className="sr-only">Go to previous page</span>
                                        <ChevronLeft className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="hidden size-8 lg:flex"
                                        size="icon"
                                        onClick={() => setPageIndex(pageIndex + 1)}
                                        disabled={pageIndex >= totalPages - 1}
                                    >
                                        <span className="sr-only">Go to next page</span>
                                        <ChevronRight className="w-4 h-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="hidden size-8 lg:flex"
                                        size="icon"
                                        onClick={() => setPageIndex(totalPages - 1)}
                                        disabled={pageIndex >= totalPages - 1}
                                    >
                                        <span className="sr-only">Go to last page</span>
                                        <ChevronsRight className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </section>
                </main>
            </div>
        </>
    )
}

export default ProductList