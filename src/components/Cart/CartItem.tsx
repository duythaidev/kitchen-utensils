'use client';
import { IProduct } from "@/types/product";
import { CircleAlert, CircleX } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const CartItem = ({ item }: { item: IProduct }) => {
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
                                <a href="#"> {item.name} </a>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="min-w-[205px]">
                <p className="text-dark">${item.discountedPrice}</p>
            </div>

            <div className="min-w-[265px]">
                <div className="flex items-center gap-1.5">
                    <CircleAlert className="w-5 h-5" color="red" />
                    <span className="text-red"> Out of Stock </span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <div className="min-w-[150px] flex justify-end">
                    <div>
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
