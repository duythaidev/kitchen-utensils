'use client'

import { CirclePlus, Eye, Pencil, Plus } from "lucide-react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../../ui/button";
import Image from "next/image";
import { useState } from "react";
import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from "../../ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { v4 as uuidv4 } from 'uuid';

const AddProductModal = () => {
    return (
        <Dialog >
            <DialogTrigger>
                <Button variant="default" >
                    <CirclePlus className="w-4 h-4" />
                    Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className={`lg:max-w-[1000px] overflow-y-scroll max-h-screen [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-track]:my-5 [&::-webkit-scrollbar-thumb]:w-2 `}>
                <DialogHeader>
                    <DialogTitle>Edit Product Details</DialogTitle>
                    <DialogDescription>
                        Edit product details here.
                    </DialogDescription>
                </DialogHeader>
                <AddProductModalContent></AddProductModalContent>
                {/* <PreviewProductModal product={product}></PreviewProductModal> */}

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
const AddProductModalContent = () => {
    const [productData, setProductData] = useState({
        product_name: "",
        price: "",
        description: "",
        category: "",
    });
    const [selected_image, setSelected_image] = useState<any>(null);
    const [product_images, setProduct_images] = useState<any>(null);
    const [blob_images, setBlob_images] = useState<any>(null);
    console.log("product_images", product_images)
    const handleAddImages = (e: any) => {
        if (e?.target?.files && e?.target?.files?.length > 3) {
            toast.error("You can only upload up to 3 images")
        }
        if (e?.target?.files && e?.target?.files?.length > 0) {
            const filesArray = Array.from(e.target.files); // Parse filelist sang array
            const blobArray = filesArray.map((file: any) => URL.createObjectURL(file)); // Tạo blob cho từng file
            setBlob_images(blobArray);
            setProduct_images(filesArray);
            setSelected_image(filesArray[0]); 
        }
    };

    return (

        <div className="grid gap-4">
            <div className="grid gap-3 mx-auto items-center">
                <Label className="text-center justify-center">Product Images</Label>
                {/* <input type="file" name="filefield" multiple
                    onChange={(e) => {
                        handleAddImages(e)
                    }}
                /> */}

                {/* Nếu có avatar mới được chọn thì preview ảnh mới */}
                <div className="flex gap-3 flex-wrap ">
                    {product_images &&
                        blob_images?.map((blob: any, index: number) => (
                            <div key={uuidv4()}>
                                <Image
                                    onClick={() => setSelected_image(product_images[index])}
                                    src={blob}
                                    loading="lazy"
                                    alt="New Avatar Preview"
                                    className="hover:scale-105 transition-all duration-300 cursor-pointer active:scale-95"
                                    width={100}
                                    height={100}
                                />
                                <div className="flex mt-2 justify-center items-center gap-2">
                                    <Checkbox name="main_image" checked={(selected_image?.name === product_images[index]?.name) || selected_image === null && index === 0} id="main_image" />
                                    <Label htmlFor="main_image">Main</Label>
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* Nút đổi ảnh hoặc chọn ảnh */}
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('picture-input')?.click()}
                    className="w-fit mx-auto"
                >
                    {product_images ? "Change Image" : "Add Image"}
                    <input
                        id="picture-input"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                            handleAddImages(e)
                        }}
                    />
                </Button>
            </div>

            <div className="grid gap-3">
                <Label>Product Name</Label>
                <Input defaultValue="Product Name" value={productData.product_name}
                    onChange={(e) => setProductData({ ...productData, product_name: e.target.value })}
                />
            </div>

            <div className="grid gap-3">
                <Label>Category</Label>

                <Select defaultValue={productData.category}
                    onValueChange={(value) => setProductData({ ...productData, category: value })}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Phone">Phone</SelectItem>
                        <SelectItem value="Laptop">Laptop</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-3">
                <Label>Price</Label>
                <Input defaultValue="Price" value={productData.price} type="number" min={0}
                    onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                />
            </div>
            <div className="grid gap-3">
                <Label>Description</Label>
                <Input defaultValue="Description" value={productData.description}
                    onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                />
            </div>

        </div >

    )
}

export default AddProductModal;