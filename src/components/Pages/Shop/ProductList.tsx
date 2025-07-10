'use client'
import { ChevronDown, Search } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import ProductCard from "./ProductCard"
import { Input } from "@/components/shadcn/input"
import { Button } from "@/components/shadcn/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu"
import { useRouter } from "nextjs-toploader/app"
import { useSearchParams } from "next/navigation"
import { ICategory, IProduct, IPagination } from "@/types"
import { toast } from "sonner"
import Pagination from "./Pagination"

const ProductList = ({ categories, products, pagination }: { categories: ICategory[], products: IProduct[], pagination: IPagination }) => {

    const { page, limit, total } = pagination
    const totalPages = Math.ceil(total / limit)
    const router = useRouter()

    const searchParams = useSearchParams();
    const keywordparam = searchParams.get('keyword')
    const sortparam = searchParams.get('sort')
    const priceSortParam = searchParams.get('priceSort')
    const priceFromParam = searchParams.get('priceFrom')
    const priceToParam = searchParams.get('priceTo')
    const categoryParam = searchParams.get('category')


    const [keyword, setKeyword] = useState(keywordparam || '')
    const [priceSort, setPriceSort] = useState(priceSortParam || '')
    const [sort, setSort] = useState(sortparam || null)

    const [priceFrom, setPriceFrom] = useState(priceFromParam || '')
    const [priceTo, setPriceTo] = useState(priceToParam || '')

    const [showCategories, setShowCategories] = useState(true)

    const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || '')


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

    useEffect(() => {
        const params = new URLSearchParams()
        keyword && params.set("keyword", keyword);
        (sort || sort === '') && params.set("sort", sort);
        (priceSort || priceSort === '') && params.set("priceSort", priceSort)
        priceFrom && params.set("priceFrom", priceFrom)
        priceTo && params.set("priceTo", priceTo)
        selectedCategory && params.set("categoryId", selectedCategory)

        params.size > 0 && router.push(`/shop?${params.toString()}`)
    }, [sort, priceSort, priceFrom, priceTo, selectedCategory])

    const goToPage = (pageIndex: number) => {
        const params = new URLSearchParams(searchParams)
        params.set("page", pageIndex.toString())
        router.push(`/shop?${params.toString()}`)
    }


    const handleClearFilter = () => {
        setKeyword('')
        setSort('')
        setPriceSort('')
        setPriceFrom('')
        setPriceTo('')
        setSelectedCategory('')
        if (searchInputRef.current) {
            searchInputRef.current.value = ''
        }
        if (priceFromRef.current) {
            priceFromRef.current.value = ''
        }
        if (priceToRef.current) {
            priceToRef.current.value = ''
        }
        router.push('/shop')
    }

    const handleApplyPriceRange = () => {
        if (priceFromRef.current && priceToRef.current) {
            const priceFrom = priceFromRef.current.value ? +priceFromRef.current.value : ""
            const priceTo = priceToRef.current.value ? +priceToRef.current.value : ""
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
                            <div className="flex items-center gap-2">
                                <Input
                                    className="rounded-sm"
                                    placeholder="Search by name"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSearchKeyword()
                                        }
                                    }}
                                    ref={searchInputRef}
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
                                            <Button variant="outline" className="cursor-pointer">
                                                Price: {priceSort === 'htl' ? 'High to Low' : priceSort === 'lth' ? 'Low to High' : 'Default'} <ChevronDown className="ml-2 w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onSelect={() => setPriceSort('htl')}>Price: High to Low</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => setPriceSort('lth')}>Price: Low to High</DropdownMenuItem>
                                            <DropdownMenuItem onSelect={() => setPriceSort('')}>Price: Default</DropdownMenuItem>
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
                                                {categories.map((category) => {
                                                    const isChecked = selectedCategory === category.id.toString()

                                                    return (
                                                        <div className="flex gap-3" key={category.id}>
                                                            <div className="flex h-5 shrink-0 items-center">
                                                                <div className="group grid size-4 grid-cols-1">
                                                                    <input
                                                                        name="categories"
                                                                        type="checkbox"
                                                                        value={category.id}
                                                                        checked={isChecked}
                                                                        onChange={(e) => {
                                                                            const value = e.target.value
                                                                            setSelectedCategory(value)
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
                                                            <label htmlFor={category.id.toString()} className="text-sm text-gray-600">
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
                                            <Input ref={priceFromRef} type="number" min={0} placeholder="From" className="w-full" />
                                            <span className="text-gray-500">-</span>
                                            <Input ref={priceToRef} type="number" min={0} placeholder="To" className="w-full" />
                                        </div>
                                        <Button onClick={handleApplyPriceRange}
                                            className="mt-3 w-full cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white"
                                        >
                                            Apply
                                        </Button>
                                    </div>
                                </div>

                            </div>
                            {/* Product grid */}
                            <div className="relative lg:col-span-3 ">

                                <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                                    {products.map((product: IProduct) => {
                                        return (
                                            <div key={product.id} className="bg-white shadow-1 rounded-lg py-4 px-5 col group flex w-full max-w-xs flex-col overflow-hidden ">
                                                <ProductCard product={product} />
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>


                        </div>
                        {/* Pagination */}
                        <Pagination page={page} goToPage={goToPage} totalPages={totalPages}></Pagination>

                    </section>
                </main>
            </div>
        </>
    )
}




export default ProductList