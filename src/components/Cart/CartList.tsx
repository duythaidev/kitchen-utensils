'use client'
import CartItem from "./CartItem";
import CustomButton from "../Custom/CustomButton";
import { IProduct } from "@/types/product";
import { useMemo } from "react";
import { toast } from "sonner";
const CartList = ({ cartItems }: { cartItems: IProduct[] }) => {
    const totalPrice = useMemo(() => cartItems.reduce((sum, item) => {
        return sum + (item.discounted_price || item.price) * (item.stock || 1);
    }, 0), [cartItems]);

    function handleCheckout(): void {
        console.log("Checkout");
        cartItems.forEach((item) => {
            console.log(item)
            if (item.stock <= 0) {
                toast.error("Product is out of stock");
                return;
            }
        });
    }

    return (
        <section className="overflow-hidden py-20 bg-gray-100">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">

                <div className="bg-white rounded-[10px] shadow-1">
                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[1170px]">
                            {/* <!-- table header --> */}
                            <div className="flex items-center py-5.5 px-10 w-full">
                                <div className="min-w-[387px]">
                                    <p className="text-dark">Product</p>
                                </div>

                                <div className="min-w-[205px]">
                                    <p className="text-dark">Unit Price</p>
                                </div>

                                <div className="min-w-[265px]">
                                    <p className="text-dark">Stock Status</p>
                                </div>

                                <div className="flex-1">
                                    <p className="text-dark text-right">Action</p>
                                </div>
                            </div>

                            {/* table row*/}
                            {cartItems.map((product: IProduct, key: number) => (
                                <CartItem product={product} key={key} />
                            ))}

                            {/* total price + button */}
                            <div className="flex items-center justify-between py-5.5 px-10 border-t border-gray-200">
                                <p className="text-lg font-semibold text-gray-800">
                                    Total: ${totalPrice.toFixed(2)}
                                </p>
                                <CustomButton className="ml-auto" onClick={() => handleCheckout()} color="blue" >
                                    Checkout
                                </CustomButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartList;
