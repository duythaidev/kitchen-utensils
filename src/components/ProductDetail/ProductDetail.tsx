'use client'

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
const tabs = [
    {
        id: "tabOne",
        title: "Description",
    },
    {
        id: "tabTwo",
        title: "Additional Information",
    },
    {
        id: "tabThree",
        title: "Reviews",
    },
];
const ProductDetailPage = () => {
    const [quantity, setQuantity] = useState(1); // start at 1 for UX
    const [activeTab, setActiveTab] = useState(tabs[0].id);
    const handleAddToCart = () => {
        console.log('Add to cart');
    };

    return (
        <>
            <div className="w-full px-4 py-10 md:px-8 lg:px-20 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">

                    <img
                        src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-quick-preview-02-detail.jpg"
                        alt="Two each of gray, white, and black shirts arranged on table."
                        className="w-full rounded-lg object-cover aspect-[2/3]"
                    />

                    <div>
                        <span className="inline-block text-sm font-medium text-white bg-green-600 py-1 px-3 rounded">
                            SALE 20% OFF
                        </span>

                        <h1 className="text-3xl font-bold text-gray-900 mt-4">Basic Tee 6-Pack</h1>

                        <div className="mt-4">
                            <p className="text-2xl font-semibold text-gray-900">$192</p>
                            <p className="mt-2 text-gray-600">This 6-pack of basic tees is made from 100% cotton and comes in a variety of colors. Each shirt is designed for comfort and durability, making them perfect for everyday wear.</p>
                        </div>

                        {/* Ratings */}
                        <div className="mt-6 flex items-center">
                            {[1, 2, 3, 4].map(i => (
                                <svg key={i} className="w-5 h-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10.868 2.884c..." clipRule="evenodd" />
                                </svg>
                            ))}
                            <svg className="w-5 h-5 text-gray-200" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10.868 2.884c..." clipRule="evenodd" />
                            </svg>
                            <a href="#" className="ml-3 text-sm text-indigo-600 hover:underline">117 reviews</a>
                        </div>

                        {/* Options */}
                        <div className="mt-10">
                            <h3 className="text-sm font-medium text-gray-900">Color</h3>
                            <div className="mt-3 flex gap-3">
                                {["white", "gray-200", "gray-900"].map((color, idx) => (
                                    <span key={idx} className={`w-8 h-8 rounded-full border border-black/10 bg-${color} cursor-pointer`} />
                                ))}
                            </div>
                        </div>

                        {/* Price & Quantity */}
                        <div className="flex flex-wrap justify-between gap-6 mt-10">
                            <div>
                                <h4 className="font-semibold text-lg mb-2">Price</h4>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-semibold text-gray-900">$192</span>
                                    <span className="line-through text-gray-400">$240</span>
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-lg mb-2">Quantity</h4>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                        className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                                    >−</button>
                                    <span className="w-12 h-10 flex items-center justify-center border rounded">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(prev => prev + 1)}
                                        className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                                    >+</button>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            className="mt-8 w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-base font-medium"
                        >
                            <div className="flex items-center justify-center mr-2">
                                <ShoppingCart className="w-4 h-4" />
                                Add to bag
                            </div>
                        </button>
                    </div>
                </div>

            </div>
            <section className="overflow-hidden bg-gray-2 py-20 bg-gray">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    {/* <!--== tab header start ==--> */}
                    <div className="flex flex-wrap items-center bg-white rounded-[10px] shadow-1 gap-5 xl:gap-12.5 py-4.5 px-4 sm:px-6">
                        {tabs.map((item, key) => (
                            <button key={key}
                                onClick={() => setActiveTab(item.id)}
                                className={`font-medium lg:text-lg ease-out duration-200 hover:text-blue-500 relative before:h-0.5 before:bg-blue-500 before:absolute before:left-0 before:bottom-0 before:ease-out before:duration-200 hover:before:w-full
                                     ${activeTab === item.id ? "text-blue before:w-full" : "text-dark before:w-0"}`
                                }
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ProductDetailPage;
