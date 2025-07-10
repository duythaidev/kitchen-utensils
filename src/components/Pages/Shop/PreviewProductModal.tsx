'use client'
import { IProduct } from "@/types";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/shadcn/input";
import { addToCart } from "@/actions/user.action";
import { useSession } from "next-auth/react";
import { toast } from "sonner";


const PreviewProductModal = ({ product, setOpen }: { product?: IProduct, setOpen: (open: boolean) => void }) => {
    const [quantity, setQuantity] = useState(1);
    const session = useSession();
    const handleAddToCart = async () => {

        const accessToken = session?.data?.user?.accessToken;

        if (!product?.id || !accessToken) {
            toast.error('You must be logged in to add to cart');
            return;
        }
        const res = await addToCart(product?.id, quantity, accessToken);
        if (res.success) {
            toast.success('Added to cart');
        } else {
            toast.error('Failed to add to cart');
        }
        setOpen(false);

    }

    return (
        <div >

            <div className="  w-full overflow-y-auto">
                <div className="flex min-h-full items-stretch justify-center text-center md:items-center">

                    <div className="flex w-full transform text-left text-base transition  md:max-w-2xl lg:max-w-4xl">
                        <div className="relative flex w-full items-center overflow-hidden bg-white ">

                            <div className="grid w-full grid-cols-1 items-start gap-x-6 p-1 gap-y-8 sm:grid-cols-12 lg:gap-x-8">

                                <img src={product?.images?.find(image => image.is_main)?.image_url || product?.images?.[0]?.image_url || "https://placehold.jp/250x500.png"} alt="Product image" className="aspect-2/3 w-full rounded-lg bg-gray-100 object-cover sm:col-span-4 lg:col-span-5" />

                                <div className="sm:col-span-8 lg:col-span-7">
                                    {
                                        product?.discounted_price && product?.discounted_price > 0 && (
                                            <span className="inline-block text-custom-xs font-medium text-white py-1 px-3 bg-green-600 mb-6.5">
                                                SALE {((product?.price - product?.discounted_price) / product?.price * 100).toFixed(0)}% OFF
                                            </span>
                                        )
                                    }

                                    <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{product?.product_name}</h2>

                                    <section aria-labelledby="information-heading" className="mt-2">
                                        <h3 id="information-heading" className="sr-only">Product information</h3>

                                        <p className="text-2xl text-gray-900">${product?.discounted_price || product?.price}</p>
                                        <p className="mt-4 text-base text-gray-500">
                                            {product?.description}
                                        </p>
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


                                        <div className="flex flex-wrap justify-between gap-5 mt-6 mb-7.5">
                                            <div>
                                                <h4 className="font-semibold text-lg text-dark mb-3.5">
                                                    Price
                                                </h4>

                                                <span className="flex items-center gap-2">
                                                    <span className="font-semibold text-dark text-xl xl:text-heading-4">
                                                        ${product?.discounted_price || product?.price}
                                                    </span>
                                                    {
                                                        product?.discounted_price && product?.discounted_price > 0 && (
                                                            <span className="font-medium text-dark-4 text-lg xl:text-2xl line-through">
                                                                ${product?.price}
                                                            </span>
                                                        )
                                                    }
                                                </span>
                                            </div>

                                            {
                                                product?.stock && product?.stock > 0 ? (
                                                    <div>
                                                        <h4 className="font-semibold text-lg text-dark mb-3.5">
                                                            Stock
                                                        </h4>

                                                        <div className="flex items-center gap-3">
                                                            <button onClick={() => quantity > 1 && setQuantity(prev => prev - 1)} aria-label="button for remove product"
                                                                className="flex items-center justify-center w-10 h-10 rounded-[5px] cursor-pointer hover:bg-gray-100 text-dark ease-out duration-200 hover:text-blue"
                                                            >
                                                                <Minus className="size-4" />
                                                            </button>

                                                            <Input
                                                                type="number"
                                                                min={1}
                                                                value={quantity}
                                                                max={product?.stock}
                                                                className="w-15 h-10 rounded-[5px] border border-gray-400 bg-white font-medium text-dark"
                                                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                                            />

                                                            <button onClick={() => quantity < product?.stock && setQuantity(prev => prev + 1)}
                                                                aria-label="button for add product"
                                                                className="flex  items-center justify-center w-10 h-10 rounded-[5px] cursor-pointer hover:bg-gray-100 text-dark ease-out duration-200 hover:text-blue"
                                                            >
                                                                <Plus className="size-4" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div>
                                                        <h4 className="font-semibold text-lg text-red-500 mb-3.5">
                                                            Out of stock
                                                        </h4>
                                                    </div>
                                                )
                                            }
                                        </div>

                                        <button onClick={handleAddToCart} disabled={(product?.stock && product?.stock > 0) ? false : true} className="disabled:cursor-not-allowed disabled:bg-gray-400 cursor-pointer mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
                                            <div className="flex items-center justify-center gap-2 mr-2">
                                                <ShoppingCart className="w-5 h-5" />
                                                <span>
                                                    {product?.stock && product?.stock > 0 ? "Add to bag" : "Out of stock"}
                                                </span>
                                            </div>
                                        </button>
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

export default PreviewProductModal;