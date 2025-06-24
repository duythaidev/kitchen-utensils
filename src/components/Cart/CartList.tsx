'use client'
import CartItem from "./CartItem";
import CustomButton from "../Custom/CustomButton";
import { IProduct } from "@/types/product";

const CartList = ({ cartItems }: { cartItems: IProduct[] }) => {
    const totalPrice = cartItems.reduce((sum, item) => {
        return sum + (item.discountedPrice || item.price) * (item.quantity || 1);
    }, 0);

    return (
        <section className="overflow-hidden py-20 bg-gray-100">
            <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
                    <h2 className="font-medium text-dark text-2xl">Your Cart</h2>
                </div>

                <div className="bg-white rounded-[10px] shadow-1">
                    <div className="w-full overflow-x-auto">
                        <div className="min-w-[1170px]">
                            {/* <!-- table header --> */}
                            <div className="flex items-center py-5.5 px-10">
                                <div className="min-w-[387px]">
                                    <p className="text-dark">Product</p>
                                </div>

                                <div className="min-w-[205px]">
                                    <p className="text-dark">Unit Price</p>
                                </div>

                                <div className="min-w-[265px]">
                                    <p className="text-dark">Stock Status</p>
                                </div>

                                <div className="min-w-[150px]">
                                    <p className="text-dark text-right">Action</p>
                                </div>
                            </div>

                            {/* <!-- cart items --> */}
                            {cartItems.map((product: IProduct, key: number) => (
                                <CartItem item={product} key={key} />
                            ))}

                            {/* <!-- total price + button --> */}
                            <div className="flex items-center justify-between py-5.5 px-10 border-t border-gray-200">
                                <p className="text-lg font-semibold text-gray-800">
                                    Total: ${totalPrice.toFixed(2)}
                                </p>
                                <CustomButton className="ml-auto" onClick={() => { }} color="blue" >
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
