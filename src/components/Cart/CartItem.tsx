'use client';
import { IProduct } from "@/types/product";
import { CircleAlert, CircleX, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Input } from "../ui/input";



const CartItem = ({ product }: { product: IProduct }) => {
    const [quantity, setQuantity] = useState(1);
    return (
        <div className="flex items-center border-t border-gray-300 py-5 px-10">

            <div className="min-w-[387px]">
                <div className="flex items-center justify-between gap-5">
                    <div className="w-full flex items-center gap-5.5">
                        <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5">
                            <Image
                                src={'https://www.tefal.com.au/cdn/shop/files/BL477BlenderforcePianoWhite.png?v=1746168855&width=800'}
                                alt="product"
                                width={200}
                                height={200}
                            />
                        </div>

                        <div>
                            <h3 className="text-dark ease-out duration-200 hover:text-blue-500">
                                <a href="#"> {product.product_name} </a>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-w-[205px]">
                <p className="text-dark">${product.discounted_price}</p>
            </div>

            <div className="min-w-[265px]">
                {product.stock && product.stock <= 0 || product?.stock === undefined && (
                    <div className="flex items-center gap-1.5">
                        <CircleAlert className="w-5 h-5" color="red" />
                        <span className="text-red"> Out of Stock </span>
                    </div>
                )}
                {product.stock}
            </div>

            <div className="flex items-center gap-2 flex-1 justify-end">
                <div className="min-w-[150px] flex justify-end">
                    {/* {product.stock && product.stock > 0 && ( */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                            className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                        >
                            <Minus className="w-4 h-4" />
                        </button>
                        <Input
                            type="number"
                            min={1}
                            max={product.stock}
                            value={quantity}
                            onChange={(e) => {
                                const value = Math.min(product.stock!, Math.max(1, Number(e.target.value)))
                                setQuantity(value)
                            }}
                            className="w-16 h-10 text-center"
                        />
                        <button
                            onClick={() => setQuantity((prev) => (prev < product.stock! ? prev + 1 : prev))}
                            className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded hover:bg-gray-200"
                        >
                            <Plus className="w-4 h-4" />
                        </button>
                    </div>
                    {/* )} */}
                </div>

                <button
                    // onClick={() => handleRemoveFromWishlist()}
                    aria-label="button for remove product from wishlist"
                    className="flex items-center  justify-center rounded-md w-[40px] h-[40px] bg-gray-100 border border-gray-300 ease-out duration-200 hover:bg-red-200 hover:border-red-400 hover:text-red-600"
                >
                    <CircleX className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
