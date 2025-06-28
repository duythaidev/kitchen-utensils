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
    const [product_images, setProduct_images] = useState<any>(null);
    console.log(product_images)
    return (

        <div className="grid gap-4">
            <div className="grid gap-3 mx-auto items-center">
                <Label className="text-center">Avatar</Label>
                <input type="file" name="filefield" multiple
                    onChange={(e) => {
                        if (e.target.files && e.target.files) {
                            setProduct_images(e.target.files);
                        }
                    }}
                />

                {/* Nếu có avatar mới được chọn thì preview ảnh mới */}
                {product_images &&
                    product_images.map((image: any) => (
                        <Image
                            src={URL.createObjectURL(image)}
                            alt="New Avatar Preview"
                            width={100}
                            height={100}
                            className="rounded-full mx-auto"
                        />
                    ))
                    }

                {/* Nút đổi ảnh hoặc chọn ảnh */}
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('picture-input')?.click()}
                    className="w-fit mx-auto"
                >
                    {product_images ? "Đổi ảnh" : "Chọn ảnh"}
                </Button>
                <input
                    id="picture-input"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setProduct_images(e.target.files[0]);
                        }
                    }}
                />
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

        </div >

    )
}

export default AddProductModal;