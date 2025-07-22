'use client'

import { CirclePlus } from "lucide-react"
import {
    Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/shadcn/dialog"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import { Button } from "@/components/shadcn/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "@/components/shadcn/select"
import { Checkbox } from "@/components/shadcn/checkbox"
import { toast } from "sonner"
import { v4 as uuidv4 } from 'uuid'
import CustomModalBox from "../CustomModalBox"
import CustomButton from "@/components/Custom/CustomButton"
import { handleCreateProductAction, handleCreateProductImageAction } from "@/actions/admin.product.action"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader } from "@/components/shadcn/card"
import { ICategory, IProduct } from "@/types"

const AddProductModal = ({ categories }: { categories: ICategory[] }) => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { data: session } = useSession()

    const [productData, setProductData] = useState({
        product_name: "",
        price: null as number | null,
        stock: 0,
        description: "",
        category_id: null as number | null,
    })
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [productImages, setProductImages] = useState<File[]>([])
    const [blobImages, setBlobImages] = useState<string[]>([])


    const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e?.target?.files && e?.target?.files.length > 3) {
            toast.error("You can only upload up to 3 images")
            return
        }
        if (e?.target?.files?.length) {
            const filesArray = Array.from(e.target.files)
            const blobArray = filesArray.map(file => URL.createObjectURL(file))
            setBlobImages(blobArray)
            setProductImages(filesArray)
            setSelectedImage(filesArray[0])
        }
    }

    const handleAddProduct = async () => {
        setIsLoading(true)

        productData.product_name = productData.product_name.trim()
        productData.description = productData.description.trim()


        if (productData.product_name.length === 0) {
            toast.error("Product name is required")
            setIsLoading(false)
            return
        }

        if (productData.price === null || productData.price <= 0) {
            toast.error("Price must be filled and larger than 0")
            setIsLoading(false)
            return
        }
        if (productData.stock < 0) {
            toast.error("Stock cannot be negative")
            setIsLoading(false)
            return
        }

        const resProduct = await handleCreateProductAction(productData, session?.accessToken || "")
        if (!resProduct.success) {
            toast.error(resProduct.message)
            setIsLoading(false)
            return
        }

        const productId = resProduct.data.id

        if (productImages.length > 0) {
            const productImageFormData = new FormData()
            productImages.forEach(file => {
                productImageFormData.append("product-images", file)
            })

            const isMainIndex = productImages.findIndex(image => image.name === selectedImage?.name)
            if (isMainIndex === -1) {
                toast.error("Please select a main image")
                setIsLoading(false)
                return
            }

            productImageFormData.append("isMain", isMainIndex.toString())
            productImageFormData.append("product_id", productId)

            const resImage = await handleCreateProductImageAction(productImageFormData, session?.accessToken || "")
            if (!resImage.success) {
                toast.error(resImage.message || "Product image creation failed!")
                setIsLoading(false)
                return
            }
        }

        await new Promise(resolve => setTimeout(resolve, 1000))
        toast.success(resProduct.message)
        setOpen(false)
        setIsLoading(false)
    }


    const handleOpenChange = (state: boolean) => {
        setOpen(state)
        if (!state) return
        setProductData({ product_name: "", price: 0, stock: 0, description: "", category_id: null })
        setSelectedImage(null)
        setProductImages([])
        setBlobImages([])
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="default" >
                    <CirclePlus className="w-4 h-4" />
                    Add Product
                </Button>
            </DialogTrigger>
            <CustomModalBox>
                <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                    <DialogDescription>
                        Add new product details here.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    {/* Image Section */}
                    <div className="flex flex-col gap-3 w-full justify-center items-center ">
                        <Label className="justify-center">Product Images</Label>
                        <div className={`flex gap-3 flex-wrap w-full justify-center items-center ${blobImages.length > 0 ? "mb-6" : ""}`}>
                            {blobImages.map((blob, index) => (
                                <div key={uuidv4()}>

                                    <Card className="w-[200px] h-[200px] overflow-hidden">
                                        <CardHeader className="hover:scale-105 transition-all cursor-pointer"
                                            onClick={() => setSelectedImage(productImages[index])}
                                        >
                                            <img
                                                fetchPriority="low"
                                                loading="lazy"
                                                decoding="async"
                                                src={blob}
                                                alt="Preview"
                                                width={300}
                                                height={300}
                                            />
                                        </CardHeader>
                                        <CardContent>
                                            <div className="flex mt-2 justify-center items-center gap-2">
                                                <Checkbox
                                                    checked={selectedImage?.name === productImages[index]?.name}
                                                    onCheckedChange={() => setSelectedImage(productImages[index])}
                                                />
                                                <Label>Main</Label>
                                            </div>
                                        </CardContent>
                                    </Card>

                                </div>
                            ))}
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            className="w-[200px] mx-auto"
                            onClick={() => document.getElementById('picture-input')?.click()}
                        >
                            {productImages.length ? "Change Images" : "Add Images"}
                        </Button>
                        <input
                            id="picture-input"
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleAddImages}
                        />
                    </div>

                    {/* Product Fields */}
                    <div className="grid gap-3">
                        <Label><span className="text-red-500">*</span>Product Name</Label>
                        <Input
                            value={productData.product_name}
                            onChange={(e) => setProductData({ ...productData, product_name: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label><span className="text-red-500">*</span>Price</Label>
                        <Input
                            type="number"
                            min={0}
                            value={productData.price || undefined}
                            onChange={(e) => setProductData({ ...productData, price: parseInt(e.target.value) })}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label><span className="text-red-500">*</span>Stock</Label>
                        <Input
                            type="number"
                            min={0}
                            value={productData.stock}
                            onChange={(e) => setProductData({ ...productData, stock: parseInt(e.target.value) })}
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label>Category</Label>
                        <Select

                            onValueChange={(val) => setProductData({ ...productData, category_id: val === "0" ? null : parseInt(val) })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            {categories.length > 0 && (
                                <SelectContent>
                                    {categories?.map((category) => (
                                        <SelectItem key={category.id} value={category.id.toString()}>
                                            {category.category_name}
                                        </SelectItem>
                                    ))}
                                    <SelectItem value="0">None</SelectItem>
                                </SelectContent>
                            )}
                        </Select>
                    </div>

                    <div className="grid gap-3">
                        <Label>Description</Label>
                        <Input
                            value={productData.description}
                            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <CustomButton
                        color="blue"
                        className={`px-4! py-2! text-sm w-[150px]! ${isLoading ? "cursor-wait" : ""}`}
                        isLoading={isLoading}
                        onClick={handleAddProduct}
                    >
                        Add Product
                    </CustomButton>
                </DialogFooter>
            </CustomModalBox>
        </Dialog>
    )
}

export default AddProductModal
