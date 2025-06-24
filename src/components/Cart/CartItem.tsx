import { CircleAlert, CircleX } from "lucide-react";
import Image from "next/image";

const CartItem = ({ item }: { item: any }) => {
    return (
        <div className="flex items-center border-t border-gray-300 py-5 px-10">
            <div className="min-w-[83px]">
                <button
                    // onClick={() => handleRemoveFromWishlist()}
                    aria-label="button for remove product from wishlist"
                    className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-200 border border-gray-300 ease-out duration-200 hover:bg-red-200 hover:border-red-400 hover:text-red-600"
                >
                   <CircleX className="w-5 h-5"></CircleX>
                </button>
            </div>

            <div className="min-w-[387px]">
                <div className="flex items-center justify-between gap-5">
                    <div className="w-full flex items-center gap-5.5">
                        <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5">
                            <Image src={'https://www.tefal.com.au/cdn/shop/files/BL477BlenderforcePianoWhite.png?v=1746168855&width=800'} alt="product" width={200} height={200} />
                        </div>

                        <div>
                            <h3 className="text-dark ease-out duration-200 hover:text-blue">
                                <a href="#"> {item.title} </a>
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
                    <CircleAlert className="w-5 h-5"  color="red"/>
                    <span className="text-red"> Out of Stock </span>
                </div>
            </div>

            <div className="min-w-[150px] flex justify-end">
                <button
                    // onClick={() => handleAddToCart()}
                    className="inline-flex text-dark hover:text-white bg-gray-100 border border-gray-300 py-2.5 px-6 rounded-md ease-out duration-200 hover:bg-blue-700"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
export default CartItem;