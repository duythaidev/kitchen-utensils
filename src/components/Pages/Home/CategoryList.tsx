'use client'
import { ICategory } from "@/types";
import { Tag } from "lucide-react";
import Image from "next/image";
import Link from 'next/link'

const CategoryList = ({ categories }: { categories: ICategory[] }) => {
    return (
        <section className="overflow-hidden pt-17.5">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0 pb-15 border-b border-gray-3">
                <div className="">
                    <div className="mb-10 flex items-center justify-between">
                        <div>
                            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
                                <Tag className="text-blue-700" />
                                Categories
                            </span>
                            <h2 className="font-semibold text-3xl xl:text-heading-5 text-dark">
                                Browse by Category
                            </h2>
                        </div>
                    </div>

                    <div className="flex justify-center gap-12">
                        {categories.map((category) => (
                            <Link href={`/shop?category=${category.id}`} className="group flex w-[150px] flex-col items-center">
                                <div className="max-w-[130px] w-full bg-[#F2F3F8] h-32.5 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                                    <Image alt="Category Image" className="w-[100px] h-[100px] object-cover" width={100} height={100} src={category.image_url}></Image>
                                </div>
                                <div className="flex justify-center">
                                    <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue-700 to-blue-700 bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
                                        {category.category_name}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                        <Link href="/shop" className="group flex w-[150px] flex-col items-center">
                            <div className="max-w-[130px] w-full bg-[#F2F3F8] h-32.5 rounded-full flex items-center justify-center mb-4">
                                {/* <img alt="Category" src="" width="82" height="62" style={{ color: 'transparent' }} /> */}
                                <Image alt="as" width={100} height={100} src={'https://www.tefal.com.au/cdn/shop/products/01.C2783883TefalGenerousCookInductionNon-StickPancakePan25cmPackshot1.png?v=1746169211'}></Image>
                            </div>
                            <div className="flex justify-center">
                                <h3 className="inline-block font-medium text-center text-dark bg-gradient-to-r from-blue-700 to-blue-700 bg-[length:0px_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_1px] group-hover:text-blue">
                                    Laptop &amp; PC
                                </h3>
                            </div>
                        </Link>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default CategoryList;