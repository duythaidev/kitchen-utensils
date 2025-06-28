'use client'
import { ShoppingCart } from "lucide-react";
import { useState } from "react";


const ModalContent = () => {
    const [quantity, setQuantity] = useState(0);
    const handleAddToCart = () => {
        console.log('Add to cart');
    }
    return (
        <div >

            <div className="  w-full overflow-y-auto">
                <div className="flex min-h-full items-stretch justify-center text-center md:items-center">

                    <div className="flex w-full transform text-left text-base transition  md:max-w-2xl lg:max-w-4xl">
                        <div className="relative flex w-full items-center overflow-hidden bg-white ">

                            <div className="grid w-full grid-cols-1 items-start gap-x-6 p-1 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
                                <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-quick-preview-02-detail.jpg" alt="Two each of gray, white, and black shirts arranged on table." className="aspect-2/3 w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5" />
                                <div className="sm:col-span-8 lg:col-span-7">
                                    <span className="inline-block text-custom-xs font-medium text-white py-1 px-3 bg-green-600 mb-6.5">
                                        SALE 20% OFF
                                    </span>

                                    <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">Basic Tee 6-Pack</h2>

                                    <section aria-labelledby="information-heading" className="mt-2">
                                        <h3 id="information-heading" className="sr-only">Product information</h3>

                                        <p className="text-2xl text-gray-900">$192</p>
                                        <p className="mt-4 text-base text-gray-500">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut eum in minus voluptatum. Nemo corrupti, necessitatibus sequi veritatis optio, ab soluta iste alias quia, commodi vero aliquam aspernatur est asperiores.
                                            This 6-pack of basic tees is made from 100% cotton and comes in a variety of colors. Each shirt is designed for comfort and durability, making them perfect for everyday wear.</p>
                                        <div className="mt-6">
                                            <h4 className="sr-only">Reviews</h4>
                                            <div className="flex items-center">
                                                <div className="flex items-center">
                                                    <svg className="size-5 shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                                                    </svg>
                                                    <svg className="size-5 shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                                                    </svg>
                                                    <svg className="size-5 shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                                                    </svg>
                                                    <svg className="size-5 shrink-0 text-gray-900" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                                                    </svg>
                                                    <svg className="size-5 shrink-0 text-gray-200" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                                        <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z" clipRule="evenodd" />
                                                    </svg>
                                                </div>
                                                <p className="sr-only">3.9 out of 5 stars</p>
                                                <a href="#" className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">117 reviews</a>
                                            </div>
                                        </div>
                                    </section>

                                    <section aria-labelledby="options-heading" className="mt-10">
                                        <h3 id="options-heading" className="sr-only">Product options</h3>

                                        <form>
                              
                                            <div className="flex flex-wrap justify-between gap-5 mt-6 mb-7.5">
                                                <div>
                                                    <h4 className="font-semibold text-lg text-dark mb-3.5">
                                                        Price
                                                    </h4>

                                                    <span className="flex items-center gap-2">
                                                        <span className="font-semibold text-dark text-xl xl:text-heading-4">
                                                            $192
                                                        </span>
                                                        <span className="font-medium text-dark-4 text-lg xl:text-2xl line-through">
                                                            $240
                                                        </span>
                                                    </span>
                                                </div>

                                                <div>
                                                    <h4 className="font-semibold text-lg text-dark mb-3.5">
                                                        Quantity
                                                    </h4>

                                                    <div className="flex items-center gap-3">
                                                        <button
                                                            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                                                            aria-label="button for remove product"
                                                            className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-blue"
                                                            disabled={quantity < 0 && true}
                                                        >
                                                            <svg
                                                                className="fill-current"
                                                                width="16"
                                                                height="2"
                                                                viewBox="0 0 16 2"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M-8.548e-08 0.977778C-3.82707e-08 0.437766 0.437766 3.82707e-08 0.977778 8.548e-08L15.0222 1.31328e-06C15.5622 1.36049e-06 16 0.437767 16 0.977779C16 1.51779 15.5622 1.95556 15.0222 1.95556L0.977778 1.95556C0.437766 1.95556 -1.32689e-07 1.51779 -8.548e-08 0.977778Z"
                                                                    fill=""
                                                                />
                                                            </svg>
                                                        </button>

                                                        <span
                                                            className="flex items-center justify-center w-20 h-10 rounded-[5px] border border-gray-4 bg-white font-medium text-dark"
                                                            x-text="quantity"
                                                        >
                                                            {quantity}
                                                        </span>

                                                        <button
                                                            onClick={() => setQuantity(quantity + 1)}
                                                            aria-label="button for add product"
                                                            className="flex items-center justify-center w-10 h-10 rounded-[5px] bg-gray-2 text-dark ease-out duration-200 hover:text-blue"
                                                        >
                                                            <svg
                                                                className="fill-current"
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 16 16"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M8.08889 0C8.6289 2.36047e-08 9.06667 0.437766 9.06667 0.977778L9.06667 15.0222C9.06667 15.5622 8.6289 16 8.08889 16C7.54888 16 7.11111 15.5622 7.11111 15.0222L7.11111 0.977778C7.11111 0.437766 7.54888 -2.36047e-08 8.08889 0Z"
                                                                    fill=""
                                                                />
                                                                <path
                                                                    fillRule="evenodd"
                                                                    clipRule="evenodd"
                                                                    d="M0 7.91111C4.72093e-08 7.3711 0.437766 6.93333 0.977778 6.93333L15.0222 6.93333C15.5622 6.93333 16 7.3711 16 7.91111C16 8.45112 15.5622 8.88889 15.0222 8.88889L0.977778 8.88889C0.437766 8.88889 -4.72093e-08 8.45112 0 7.91111Z"
                                                                    fill=""
                                                                />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <button type="submit" className=" mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
                                                <div className="flex items-center justify-center mr-2">
                                                    <ShoppingCart className="size-4" />
                                                    Add to bag
                                                </div>
                                            </button>
                                        </form>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default ModalContent;