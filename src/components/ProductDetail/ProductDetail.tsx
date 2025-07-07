'use client'

import { IProduct, IReview } from "@/types/product"
import { LoaderCircle, Minus, Plus, ShoppingCart, Star, StarHalf, UserRoundIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { addReview, addToCart } from "@/actions/user.action"
import CustomButton from "../Custom/CustomButton"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
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


const ProductDetailPage = ({ product, reviews }: { product: IProduct, reviews?: IReview[] }) => {
    const [quantity, setQuantity] = useState(1)
    const [activeTab, setActiveTab] = useState(tabs[0].id)
    const [selectedImage, setSelectedImage] = useState(product?.images?.find((image) => image.is_main) || product?.images?.[0])
    const [rating, setRating] = useState(5)
    const [isLoading, setIsLoading] = useState(false)
    const session = useSession()

    const [comment, setComment] = useState("")

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
    const handleAddReview = async () => {
        setIsLoading(true)

        if (!session.data?.user?.accessToken) {
            toast.error("Please login to add review")
            setIsLoading(false)
            return
        }
        if (comment.length < 10 || comment.length > 250) {
            toast.error("Comment must be between 10 and 250 characters")
            setIsLoading(false)
            return
        }
        if (rating < 1 || rating > 5) {
            toast.error("You must rate the product")
            setIsLoading(false)
            return
        }

        const res = await addReview(product.id, rating, comment, session.data?.user?.accessToken)
        if (res.success) {
            toast.success("Review added")
        } else {
            toast.error(res.message)
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
                            <div className="relative">
                                <div className="flex gap-2">
                                    {Array.from({ length: 5 }, (_, index) => (
                                        <Star key={index} fill="gray" strokeWidth={0} color="gray" />
                                    ))}
                                </div>
                                <div className="absolute top-0 flex gap-2 ">
                                    <Star fill="#FBB040" strokeWidth={2} color="#FBB040" />
                                    <Star fill="#FBB040" strokeWidth={2} color="#FBB040" />
                                    <StarHalf fill="#FBB040" strokeWidth={2} color="#FBB040" />
                                </div>
                            </div>
                            <svg className="w-5 h-5 text-gray-200" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M10.868 2.884c..." />
                            </svg>
                            <a href="#" className="ml-3 text-sm text-indigo-600 hover:underline">
                                117 reviews
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
                            <div
                                className={`flex-col sm:flex-row gap-7.5 xl:gap-12.5 mt-12.5 ${activeTab === "tabOne" ? "flex" : "hidden"
                                    }`}
                            >
                                <div className="max-w-[570px] w-full">
                                    <h2 className="font-medium text-2xl text-dark mb-9">
                                        03 Review for this product
                                    </h2>

                                    <div className="flex flex-col gap-6">
                                        {/* <!-- review item --> */}
                                        <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                                            <div className="flex items-center justify-between">
                                                <a href="#" className="flex items-center gap-4">
                                                    <div className="rounded-full overflow-hidden">
                                                        <Avatar>
                                                            <AvatarImage src={session.data?.user?.avatar_url || ""} />
                                                            <AvatarFallback>
                                                                <UserRoundIcon className="w-4 h-4" />
                                                            </AvatarFallback>
                                                        </Avatar>
                                                    </div>

                                                    <div>
                                                        <h3 className="font-medium text-dark">
                                                            {session.data?.user?.user_name}
                                                        </h3>

                                                    </div>
                                                </a>

                                                <div className="flex items-center gap-1">
                                                    <span className="cursor-pointer text-[#FBB040]">
                                                        <svg
                                                            className="fill-current"
                                                            width="15"
                                                            height="16"
                                                            viewBox="0 0 15 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </span>

                                                    <span className="cursor-pointer text-[#FBB040]">
                                                        <svg
                                                            className="fill-current"
                                                            width="15"
                                                            height="16"
                                                            viewBox="0 0 15 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </span>

                                                    <span className="cursor-pointer text-[#FBB040]">
                                                        <svg
                                                            className="fill-current"
                                                            width="15"
                                                            height="16"
                                                            viewBox="0 0 15 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </span>

                                                    <span className="cursor-pointer text-[#FBB040]">
                                                        <svg
                                                            className="fill-current"
                                                            width="15"
                                                            height="16"
                                                            viewBox="0 0 15 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </span>

                                                    <span className="cursor-pointer text-[#FBB040]">
                                                        <svg
                                                            className="fill-current"
                                                            width="15"
                                                            height="16"
                                                            viewBox="0 0 15 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-dark mt-6">
                                                “Lorem ipsum dolor sit amet, adipiscing elit. Donec
                                                malesuada justo vitaeaugue suscipit beautiful
                                                vehicula’’
                                            </p>
                                        </div>

                                        {/* <!-- review item --> */}
                                        <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                                            <div className="flex items-center justify-between">
                                                <a href="#" className="flex items-center gap-4">
                                                    <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
                                                        <Image
                                                            src="/images/users/user-01.jpg"
                                                            alt="author"
                                                            className="w-12.5 h-12.5 rounded-full overflow-hidden"
                                                            width={50}
                                                            height={50}
                                                        />
                                                    </div>

                                                    <div>
                                                        <h3 className="font-medium text-dark">
                                                            Davis Dorwart
                                                        </h3>
                                                        <p className="text-custom-sm">
                                                            Serial Entrepreneur
                                                        </p>
                                                    </div>
                                                </a>

                                                <div className="flex items-center gap-1">
                                                    <span className="cursor-pointer text-[#FBB040]">
                                                        <svg
                                                            className="fill-current"
                                                            width="15"
                                                            height="16"
                                                            viewBox="0 0 15 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </span>

                                                    <span className="cursor-pointer text-[#FBB040]">
                                                        <svg
                                                            className="fill-current"
                                                            width="15"
                                                            height="16"
                                                            viewBox="0 0 15 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </span>

                                                    <span className="cursor-pointer text-[#FBB040]">
                                                        <svg
                                                            className="fill-current"
                                                            width="15"
                                                            height="16"
                                                            viewBox="0 0 15 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </span>

                                                    <span className="cursor-pointer text-[#FBB040]">
                                                        <svg
                                                            className="fill-current"
                                                            width="15"
                                                            height="16"
                                                            viewBox="0 0 15 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </span>

                                                    <span className="cursor-pointer text-[#FBB040]">
                                                        <svg
                                                            className="fill-current"
                                                            width="15"
                                                            height="16"
                                                            viewBox="0 0 15 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-dark mt-6">
                                                “Lorem ipsum dolor sit amet, adipiscing elit. Donec
                                                malesuada justo vitaeaugue suscipit beautiful
                                                vehicula’’
                                            </p>
                                        </div>

                                        {/* <!-- review item --> */}
                                        <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                                            <div className="flex items-center justify-between">
                                                <a href="#" className="flex items-center gap-4">
                                                    <div className="w-12.5 h-12.5 rounded-full overflow-hidden">
                                                        <Image
                                                            src="https://placehold.jp/250x500.png"
                                                            alt="author"
                                                            className="w-12.5 h-12.5 rounded-full overflow-hidden"
                                                            width={50}
                                                            height={50}
                                                        />
                                                    </div>

                                                    <div>
                                                        <h3 className="font-medium text-dark">
                                                            Davis Dorwart
                                                        </h3>
                                                        <p className="text-custom-sm">
                                                            Serial Entrepreneur
                                                        </p>
                                                    </div>
                                                </a>

                                                <div className="flex items-center gap-1">
                                                    <span className="cursor-pointer text-[#FBB040]">
                                                        <svg
                                                            className="fill-current"
                                                            width="15"
                                                            height="16"
                                                            viewBox="0 0 15 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </span>

                                                    <span className="cursor-pointer text-[#FBB040]">
                                                        <svg
                                                            className="fill-current"
                                                            width="15"
                                                            height="16"
                                                            viewBox="0 0 15 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </span>

                                                    <span className="cursor-pointer text-[#FBB040]">
                                                        <svg
                                                            className="fill-current"
                                                            width="15"
                                                            height="16"
                                                            viewBox="0 0 15 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </span>

                                                    <span className="cursor-pointer text-[#FBB040]">
                                                        <svg
                                                            className="fill-current"
                                                            width="15"
                                                            height="16"
                                                            viewBox="0 0 15 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </span>

                                                    <span className="cursor-pointer text-[#FBB040]">
                                                        <svg
                                                            className="fill-current"
                                                            width="15"
                                                            height="16"
                                                            viewBox="0 0 15 16"
                                                            fill="none"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path
                                                                d="M14.6604 5.90785L9.97461 5.18335L7.85178 0.732874C7.69645 0.422375 7.28224 0.422375 7.12691 0.732874L5.00407 5.20923L0.344191 5.90785C0.0076444 5.9596 -0.121797 6.39947 0.137085 6.63235L3.52844 10.1255L2.72591 15.0158C2.67413 15.3522 3.01068 15.6368 3.32134 15.4298L7.54112 13.1269L11.735 15.4298C12.0198 15.5851 12.3822 15.3263 12.3046 15.0158L11.502 10.1255L14.8934 6.63235C15.1005 6.39947 14.9969 5.9596 14.6604 5.90785Z"
                                                                fill=""
                                                            />
                                                        </svg>
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-dark mt-6">
                                                “Lorem ipsum dolor sit amet, adipiscing elit. Donec
                                                malesuada justo vitaeaugue suscipit beautiful
                                                vehicula’’
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="max-w-[550px] w-full">
                                    <h2 className="font-medium text-2xl text-dark mb-3.5">
                                        Add a Review
                                    </h2>

                                    <p className="mb-6">
                                        Your email address will not be published. Required fields are marked *
                                    </p>

                                    <div className="flex items-center gap-3 mb-7.5">
                                        <span>Your Rating*</span>
                                        <StarRating rating={rating} onChange={setRating} />
                                    </div>

                                    <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                                        <div className="mb-5">
                                            <label htmlFor="comments" className="block mb-2.5">
                                                Comments
                                            </label>

                                            <textarea
                                                name="comments"
                                                id="comments"
                                                rows={5}
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                                maxLength={250}
                                                placeholder="Your comments"
                                                className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                                            ></textarea>

                                            <span className="flex items-center justify-end mt-2.5">
                                                <span className="text-custom-sm text-dark-4">

                                                    {comment.length < 10 ?
                                                        <span className="text-red-500">
                                                            {comment.length}
                                                        </span>
                                                        :
                                                        <span>
                                                            {comment.length}
                                                        </span>
                                                    }

                                                    /250
                                                </span>
                                            </span>
                                        </div>

                                        <div className="flex flex-col lg:flex-row lg:justify-end lg:items-end gap-5 sm:gap-7.5">

                                            <CustomButton
                                                color="blue"
                                                onClick={handleAddReview}
                                                isLoading={isLoading}
                                            >
                                                Submit Reviews
                                            </CustomButton>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

const StarRating = ({ rating, onChange, }: { rating: number, onChange: (value: number) => void }) => {
    const [hover, setHover] = useState<number | null>(null)

    const handleMouseMove = (index: number, e: React.MouseEvent) => {
        // index of star
        // left = position x in window, width = width of the element
        //  e.clientX = position cursor in window
        const { left, width } = e.currentTarget.getBoundingClientRect()
        // console.log(left, width, e.clientX)
        const x = e.clientX - left
        const percent = x / width
        const value = index + (percent < 0.5 ? 0.5 : 1)
        setHover(value)
    }

    const handleClick = (index: number, e: React.MouseEvent) => {
        const { left, width } = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - left
        const percent = x / width
        const value = index + (percent < 0.5 ? 0.5 : 1)
        onChange(value)
    }

    const displayRating = hover ?? rating

    return (
        <div className="relative flex gap-1">
            {Array.from({ length: 5 }, (_, index) => {
                return (
                    <Star key={index} fill="gray" color="gray" strokeWidth={2} />
                )
            })}
            <div className="flex gap-1 absolute">

                {Array.from({ length: 5 }, (_, index) => {
                    const full = index + 1 <= displayRating
                    const half = !full && index + 0.5 <= displayRating

                    return (
                        <div
                            key={index}
                            // when hover send 
                            onMouseMove={(e) => handleMouseMove(index, e)}
                            onMouseLeave={() => setHover(null)}
                            onClick={(e) => handleClick(index, e)}
                            className="cursor-pointer top-0 left-0"
                        >
                            {full ? (
                                <Star fill="#FBB040" color="#FBB040" strokeWidth={2} />
                            ) : half ? (
                                <StarHalf fill="#FBB040" color="#FBB040" strokeWidth={2} />
                            ) : (
                                <Star fill="gray" color="gray" strokeWidth={2} />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ProductDetailPage
