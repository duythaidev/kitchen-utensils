'use client'

import { IProduct, IReview } from "@/types"
import { LoaderCircle, Minus, Plus, ShoppingCart } from "lucide-react"
import { useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { addToCart } from "@/actions/user.action"
import { Input } from "@/components/shadcn/input"
import StarRating from "@/components/Custom/StarRating"
import ReviewForm from "../Review/ReviewForm"
import ReviewList from "@/components/Custom/ReviewList"
const tabs = [
    {
        id: "tabOne",
        title: "Reviews",
    },
    {
        id: "tabTwo",
        title: "Description",
    },
]

//     {
//         "id": 2,
//         "user_id": 6,
//         "user": {
//             "id": 6,
//             "email": "trolleverythig@gmail.com",
//             "password": "",
//             "user_name": "Jj Greatas",
//             "is_active": true,
//             "address": "ajsdhgad",
//             "phone": "",
//             "role": "user",
//             "auth_provider": "google",
//             "avatar_url": "https://i.ibb.co/z34TP8h/36f16d4a365e.jpg",
//             "created_at": "2025-07-05T21:21:01.338Z",
//             "updated_at": "2025-07-05T21:59:27.000Z"
//         },
//         "product_id": 1,
//         "product": {
//             "id": 1,
//             "product_name": "asdasda",
//             "price": 1001,
//             "stock": 100,
//             "discounted_price": 6,
//             "description": "asjdasdhjad",
//             "category_id": 3,
//             "created_at": "2025-07-04T02:23:54.596Z",
//             "updated_at": "2025-07-05T06:47:22.000Z"
//         },
//         "rating": "5.0",
//         "comment": "asdjashdasd",
//         "created_at": "2025-07-07T01:34:08.918Z",
//         "updated_at": "2025-07-07T01:34:08.918Z"
//     }
// ]

const ProductDetailPage = ({ product, reviews }: { product: IProduct, reviews?: IReview[] }) => {
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState(tabs[0].id)
    const [selectedImage, setSelectedImage] = useState(product?.images?.find((image) => image.is_main) || product?.images?.[0])
    const [isLoading, setIsLoading] = useState(false)
    const session = useSession()
    const reviewRef = useRef<HTMLDivElement>(null)


    const handleAddToCart = async () => {
        setIsLoading(true)
        if (!session.data?.user?.accessToken) {
            toast.error("Please login to add to cart")
            setIsLoading(false)
            return
        }
        const res = await addToCart(product.id, quantity, session.data?.user?.accessToken)
        if (res) {
            toast.success("Added to cart")
        } else {
            toast.error("Failed to add to cart")
        }

        setIsLoading(false)
    }

    return (
        <>
            <div className="w-full px-4 py-10 md:px-8 lg:px-20 bg-white">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto">
                    {/* Image */}
                    <div className="w-3/4 mx-auto">
                        {/* Main image or selected image */}
                        <img
                            src={selectedImage?.image_url}
                            alt={product?.product_name}
                            className="w-full rounded-lg object-cover aspect-[2/3]"
                        />
                        {/* Image list */}
                        <div className=" w-full flex justify-center mt-3">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2">
                                    {
                                        product?.images?.map((image) => (
                                            <div key={image.id} onClick={() => setSelectedImage(image)} className={`w-20 h-20 bg-white border cursor-pointer hover:border-primary transition-all duration-300 rounded-md overflow-hidden ${selectedImage?.id === image.id ? "border-primary" : ""}`}>
                                                <img src={image.image_url} alt={product?.product_name} className="w-full h-full object-cover" />
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Info Section */}
                    <div>
                        {product.discounted_price && product.discounted_price > 0 && (
                            <span className="inline-block text-sm font-medium text-white bg-green-600 py-1 px-3 rounded mb-4">
                                SALE {((product.price - product.discounted_price) / product.price * 100).toFixed(0)}% OFF
                            </span>
                        )}

                        <h1 className="text-3xl font-bold text-gray-900">{product.product_name}</h1>

                        <div className="mt-4">
                            <p className="text-2xl font-semibold text-gray-900">${product.discounted_price || product.price}</p>
                            <p className="mt-2 text-gray-600">{product.description}</p>
                        </div>

                        {/* Reviews */}
                        <div className="mt-6 flex items-center">
                            <StarRating rating={Number(4.5)} />

                            <a onClick={() => reviewRef.current?.scrollIntoView({ behavior: "smooth" })}
                                className="ml-3 text-sm text-indigo-600 hover:underline">
                                {reviews?.length} reviews
                            </a>
                        </div>

                        {/* Price & Quantity */}
                        <div className="flex flex-wrap justify-between gap-6 mt-10">
                            <div>
                                <h4 className="font-semibold text-lg mb-2">Price</h4>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-semibold text-gray-900">${product.discounted_price || product.price}</span>
                                    {product.discounted_price && (
                                        <span className="line-through text-gray-400">${product.price}</span>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-lg mb-2">Quantity</h4>
                                {product.stock && product.stock > 0 ? (
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
                                ) : (
                                    <p className="text-red-500">Out of stock</p>
                                )}
                            </div>
                        </div>



                        {/* Add to Cart */}
                        <button
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                            className="disabled:cursor-not-allowed disabled:bg-gray-400 cursor-pointer mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
                        >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {product.stock && product.stock > 0 ? "Add to bag" : "Out of stock"}
                            {isLoading && <LoaderCircle className="w-4 h-4 ml-2 animate-spin" />}
                        </button>
                    </div>
                </div>
            </div>
            <section className="overflow-hidden bg-gray-2 py-20 bg-gray">
                <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
                    <div className="flex flex-wrap items-center bg-white rounded-[10px] shadow-1 gap-5 xl:gap-12.5 py-4.5 px-4 sm:px-6">
                        {tabs.map((item, key) => (
                            <button key={key}
                                onClick={() => setActiveTab(item.id)}
                                className={`font-medium lg:text-lg ease-out duration-200 hover:text-primary relative before:h-0.5 before:bg-primary before:absolute before:left-0 before:bottom-0 before:ease-out before:duration-200 hover:before:w-full
                                     ${activeTab === item.id ? "text-blue before:w-full" : "text-dark before:w-0"}`
                                }
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>
                    {activeTab === "tabTwo" && (
                        <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6 mt-10 block">
                            {/* <h2 className="text-2xl font-bold text-gray-900">Description</h2> */}
                            <h2 className="font-medium text-2xl text-primary mb-7">Specifications:</h2>
                            <p className="text-gray-500">
                                {product.description || "No description available!"}
                            </p>
                        </div>
                    )}
                    {activeTab === "tabOne" && (
                        <div>
                            <div ref={reviewRef} className={`flex-col sm:flex-row gap-7.5 xl:gap-12.5 mt-12.5 ${activeTab === "tabOne" ? "flex" : "hidden"}`} >
                                <ReviewList reviews={reviews} product_id={product.id}></ReviewList>

                                {/* Add a Review */}
                                <ReviewForm product_id={product.id} ></ReviewForm>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default ProductDetailPage
