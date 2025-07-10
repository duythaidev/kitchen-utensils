'use client'

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
import { handleUpdateProductAction, handleUpdateProductImageAction } from "@/actions/admin.product.action"
import { useSession } from "next-auth/react"
import { Card, CardContent, CardHeader } from "@/components/shadcn/card"
import { fetchCategories } from "@/actions/client-api"
import { ICategory, IProduct } from "@/types"
import { Pencil, Trash } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/shadcn/tooltip"

async function imageUrlToFile(imageUrl: string, filename: string, mimeType: string) {
    try {
        const response = await fetch(imageUrl)
        const blob = await response.blob()
        const file = new File([blob], filename, { type: mimeType || blob.type })
        return file
    } catch (error) {
        console.error("Error converting image URL to File object:", error)
        return null
    }
}


const EditProductModal = ({ product }: { product: IProduct }) => {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { data: session } = useSession()

    const [productData, setProductData] = useState({
        product_name: product.product_name,
        price: product.price,
        stock: product.stock,
        description: product.description || "",
        category_id: product.category?.id,
        discounted_price: product.discounted_price as (number | undefined | null),
    })

    const isMainImageIndex = product.images?.findIndex(img => img.is_main)

    // console.log("isMainImageIndex", isMainImageIndex)

    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    // console.log("selectedImage", selectedImage)
    // image url to file list
    const [imageFiles, setImageFiles] = useState<(File | null)[]>([])
    // file list to blob url list
    const [blobImages, setBlobImages] = useState<string[]>([])


    useEffect(() => {
        if (open) {
            const fetchAll = async () => {

                if (product.images) {
                    const parsedImages = await Promise.all(
                        product.images.map(async (image) => {
                            return await imageUrlToFile(image.image_url, `${image.image_url}-${uuidv4()}`, "image/png")
                        })
                    )
                    if (parsedImages) {
                        setImageFiles(parsedImages)
                        setBlobImages(parsedImages.map(file => file ? URL.createObjectURL(file) : ""))
                        parsedImages.forEach((image, index) => {
                            if (image && index === isMainImageIndex) {
                                setSelectedImage(image)
                            }
                        })
                    }
                }

                // Fetch category
                const fetchedCategories = await fetchCategories(session?.accessToken || "")
                if (fetchedCategories) {
                    setCategories(fetchedCategories)
                } else {
                    toast.error("Failed to fetch categories")
                }
            }

            // Reset
            setProductData({
                product_name: product.product_name,
                price: product.price,
                stock: product.stock,
                description: product.description || "",
                category_id: product.category?.id,
                discounted_price: product.discounted_price as (number | undefined | null),
            })
            setImageFiles([])
            setBlobImages([])
            setSelectedImage(null)
            fetchAll()
        }
    }, [open])


    // const [mainImageId, setMainImageId] = useState(
    //     product.images?.find(img => img.is_main)?.id || null
    // )
    const [categories, setCategories] = useState<ICategory[]>([])

    useEffect(() => {
        const getCategories = async () => {
            const categories = await fetchCategories(session?.accessToken || "")
            if (categories) {
                setCategories(categories)
            } else {
                toast.error("Failed to fetch categories")
            }
        }
        getCategories()
    }, [])

    const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
        const totalImages = (e?.target?.files?.length || 0) + (imageFiles?.length || 0)
        if (totalImages > 3) {
            toast.error("You can only have up to 3 images total")
            return
        }
        if (e?.target?.files?.length) {
            const filesArray = Array.from(e.target.files)
            setImageFiles([...(imageFiles || []), ...filesArray])
            const blobArray = filesArray.map(file => file ? URL.createObjectURL(file) : "")
            setBlobImages([...(blobImages || []), ...blobArray])
            // if (!mainImageId) {
            //     setSelectedImage(filesArray[0])
            // }
        }
    }
    // console.log("imageFiles", imageFiles)
    // console.log("blobImages", blobImages)

    const handleDeleteImage = (imageName: string | undefined) => {
        console.log("imageName", imageName)
        const newImages = imageFiles?.filter(image => image?.name !== imageName)
        console.log("newImages", newImages)
        setImageFiles(newImages)
        const blobArray = newImages.map(file => file ? URL.createObjectURL(file) : "")
        setBlobImages(blobArray)
        console.log("newBlobImages", blobArray)
        setSelectedImage(newImages[0] || null)
    }

    const handleUpdateProduct = async () => {
        setIsLoading(true);

        productData.product_name = productData.product_name.trim();
        productData.description = productData.description.trim();

        if (
            productData.product_name === "" ||
            productData.price === 0 ||
            productData.stock === 0
        ) {
            toast.error("Please fill in all required fields");
            setIsLoading(false);
            return;
        }

        const resProduct = await handleUpdateProductAction(product.id, productData, session?.accessToken || "");
        if (!resProduct.success) {
            toast.error(resProduct.message);
            setIsLoading(false);
            return;
        }

        if (imageFiles && imageFiles.length > 0) {
            const productImageFormData = new FormData();
            imageFiles.forEach(file => {
                if (file) {
                    productImageFormData.append("product-images", file);
                }
            });

            const isMainIndex = imageFiles.findIndex(image => image?.name === selectedImage?.name);
            if (isMainIndex === -1) {
                toast.error("Please select a main image");
                setIsLoading(false);
                return;
            }

            productImageFormData.append("isMain", isMainIndex.toString());
            productImageFormData.append("product_id", product.id.toString());

            const resImage = await handleUpdateProductImageAction(product.id, productImageFormData, session?.accessToken || "");
            if (!resImage.success) {
                toast.error(resImage.message || "Image update failed!");
                setIsLoading(false);
                return;
            }
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        toast.success(resProduct.message);
        setOpen(false);
        setIsLoading(false);
    };



    const handleOpenChange = (state: boolean) => {
        setOpen(state)
        if (!state) {
            setProductData({
                product_name: product.product_name,
                price: product.price,
                stock: product.stock,
                description: product.description || "",
                category_id: product.category?.id,
                discounted_price: product.discounted_price as (number | undefined | null),
            })
            setSelectedImage(null)
            setImageFiles([])
            setBlobImages([])
            // setMainImageId(product.images?.find(img => img.is_main)?.id || null)
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-orange-500">
                    <Pencil className="w-4 h-4" />
                    Edit
                </Button>
            </DialogTrigger>
            {open && (
                <CustomModalBox>
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>
                            Edit product details here.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-4">
                        {/* Image Section */}
                        <div className="flex flex-col gap-3 w-full justify-center items-center">
                            <Label className="justify-center">Product Images</Label>
                            <div className={`flex gap-3 flex-wrap w-full justify-center items-center ${(blobImages && blobImages?.length > 0) ? "mb-10" : ""}`}>
                                {/* Existing Images */}

                                {blobImages && blobImages?.map((blob, index) => (
                                    <div key={uuidv4()}>
                                        <Card className="w-[200px] h-[200px]">
                                            <CardHeader className="hover:scale-105 transition-all cursor-pointer"
                                                onClick={() => setSelectedImage(imageFiles?.[index] || null)}
                                            >
                                                <img
                                                    src={blob}
                                                    alt="Preview"
                                                    className="  object-cover"
                                                />
                                            </CardHeader>
                                            <CardContent>
                                                <div className={`flex mt-2 justify-between items-center gap-2 ${imageFiles && imageFiles?.length > 0 ? "mb-10" : ""}`}>
                                                    <div className="flex gap-2">
                                                        <Checkbox
                                                            checked={selectedImage?.name === imageFiles?.[index]?.name}
                                                            onCheckedChange={() => setSelectedImage(imageFiles?.[index] || null)}
                                                        />
                                                        <Label>Main</Label>
                                                    </div>
                                                    <div>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <Trash className="w-4 h-4 cursor-pointer hover:text-red-500"
                                                                    onClick={() => handleDeleteImage(imageFiles && imageFiles?.length > 0 ? imageFiles[index]?.name : "")}
                                                                />
                                                            </TooltipTrigger>
                                                            <TooltipContent>
                                                                Delete Image
                                                            </TooltipContent>
                                                        </Tooltip>
                                                    </div>
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
                                onClick={() => document.getElementById('edit-picture-input')?.click()}
                            >
                                Add More Images
                            </Button>
                            <input
                                id="edit-picture-input"
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
                                value={productData.price}
                                onChange={(e) => setProductData({ ...productData, price: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label>Discounted Price</Label>
                            <Input
                                type="number"
                                min={0}
                                value={productData.discounted_price || ""}
                                onChange={(e) =>
                                    setProductData({
                                        ...productData,
                                        discounted_price: parseInt(e.target.value) || null,
                                    })
                                }
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
                                defaultValue={productData.category_id?.toString()}
                                onValueChange={(val) => setProductData({ ...productData, category_id: val === "0" ? undefined : parseInt(val) })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                {categories.length > 0 && (
                                    <SelectContent>
                                        {categories.map((category) => (
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
                            onClick={handleUpdateProduct}
                        >
                            Save Changes
                        </CustomButton>
                    </DialogFooter>
                </CustomModalBox>
            )}
        </Dialog>
    )
}
export default EditProductModal