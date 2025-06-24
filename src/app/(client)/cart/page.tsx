import Image from "next/image";
import CartItem from "@/components/Cart/CartItem";


const page = () => {
    const wishlistItems = [
        {
            id: 1,
            title: "Product 1",
            imgs: { thumbnails: ["https://via.placeholder.com/150"] },
            discountedPrice: 29.99,
        },
        {
            id: 2,
            title: "Product 2",
            imgs: { thumbnails: ["https://via.placeholder.com/150"] },
            discountedPrice: 49.99,
        },
        // Add more items as needed
    ];
    return (
            <section className="overflow-hidden py-20 bg-gray-100">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="flex flex-wrap items-center justify-between gap-5 mb-7.5">
                        <h2 className="font-medium text-dark text-2xl">Your Wishlist</h2>
                        <button className="text-blue">Clear Wishlist Cart</button>
                    </div>
            
                    <div className="bg-white rounded-[10px] shadow-1">
                        <div className="w-full overflow-x-auto">
                            <div className="min-w-[1170px]">
                                {/* <!-- table header --> */}
                                <div className="flex items-center py-5.5 px-10">
                                    <div className="min-w-[83px]"></div>
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
            
                                {/* <!-- wish item --> */}
                                {wishlistItems.map((item, key) => (
                                    <CartItem item={item} key={key} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    );
}

export default page;