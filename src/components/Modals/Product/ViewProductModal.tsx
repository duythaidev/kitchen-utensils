import { Eye } from "lucide-react";

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
import PreviewProductModal from "@/components/Shop/PreviewProductModal";
import { SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";

const ViewProductModal = ({ product }: { product: any }) => {
    return (
        <Dialog >
            <DialogTrigger>
                <Button variant="outline" className=" text-blue-700" >
                    <Eye className="w-4 h-4" />
                    View
                </Button>
            </DialogTrigger>
            <DialogContent className={`lg:max-w-[1000px] overflow-y-scroll max-h-screen [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-track]:my-5 [&::-webkit-scrollbar-thumb]:w-2 `}>
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                    <DialogDescription>
                        View user details here.
                    </DialogDescription>
                </DialogHeader>
                <ViewProductModalContent product={product}></ViewProductModalContent>
            </DialogContent>
        </Dialog>
    );
}
const ViewProductModalContent = ({ product }: { product: any }) => {
    const product_images = product.product_images_url;
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

        </div>

        <div className="grid gap-3">
            <Label>Product Name</Label>
            <Input defaultValue="Product Name" value={product.product_name}></Input>
        </div>

        <div className="grid gap-3">
            <Label>Category</Label>

            <Select defaultValue={product.category}
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
            <Input defaultValue="Price" value={product.price} type="number" min={0}></Input>
        </div>
        <div className="grid gap-3">
            <Label>Description</Label>
            <Input defaultValue="Description" value={product.description}></Input>
        </div>

    </div >

    )
}

export default ViewProductModal;