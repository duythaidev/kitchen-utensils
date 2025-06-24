'use client';
import { IProduct } from "@/types/product";
import { Flex, Space, InputNumber, Form } from "antd";
import { CircleAlert, CircleX } from "lucide-react";
import Image from "next/image";

const CartItem = ({ item }: { item: IProduct }) => {
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

            <Flex align="center" gap={16}>
                <div className="min-w-[150px] flex justify-end">
                    <Form>
                        <Form.Item initialValue={1} className="mb-0!" label="Quantity" name="quantity">
                            <InputNumber
                                size="large"
                                min={1}
                                max={99}
                                // disabled={true} // vì đang out of stock
                                className="w-[100px]"
                            />
                        </Form.Item>
                    </Form>
                </div>

                <button
                    // onClick={() => handleRemoveFromWishlist()}
                    aria-label="button for remove product from wishlist"
                    className="flex items-center  justify-center rounded-md w-[40px] h-[40px] bg-gray-100 border border-gray-300 ease-out duration-200 hover:bg-red-200 hover:border-red-400 hover:text-red-600"
                >
                    <CircleX className="w-6 h-6" />
                </button>
            </Flex>
        </div>
    );
};

export default CartItem;
