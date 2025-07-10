'use client'

import { Eye } from "lucide-react";
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/shadcn/dialog";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { Button } from "@/components/shadcn/button";
import Image from "next/image";
import CustomModalBox from "../CustomModalBox";
import { Card, CardContent, CardHeader } from "@/components/shadcn/card";
import { Checkbox } from "@/components/shadcn/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/shadcn/select";
import { IProduct, IProductImage } from "@/types";

const ViewProductModal = ({ product }: { product: IProduct }) => {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-blue-700">
                    <Eye className="w-4 h-4" />
                    View
                </Button>
            </DialogTrigger>
            <CustomModalBox>
                <DialogHeader>
                    <DialogTitle>Product Details</DialogTitle>
                    <DialogDescription>
                        View product information below.
                    </DialogDescription>
                </DialogHeader>
                <ViewProductModalContent product={product} />
            </CustomModalBox>
        </Dialog>
    );
};

const ViewProductModalContent = ({ product }: { product: IProduct }) => {
    return (
        <div className="grid gap-4">
            {/* Product Images */}
            <div className="flex flex-col gap-3 w-full justify-center items-center">
                <Label className="justify-center">Product Images</Label>
                <div className={`flex gap-3 flex-wrap w-full justify-center items-center ${product.images?.length && product.images?.length > 0 ? "mb-6" : ""}`}>
                    {product.images && product.images?.length > 0 ? product.images?.map((image: IProductImage) => (
                        <Card key={image.id} className="w-[200px] h-[200px]">
                            <CardHeader className="hover:scale-105 transition-all">
                                <img
                                    src={image.image_url}
                                    alt="Product Image"
                                    width={300}
                                    height={300}
                                />
                            </CardHeader>
                            <CardContent>
                                <div className="flex mt-2 justify-center items-center gap-2">
                                    <Checkbox
                                        checked={image.is_main}
                                        disabled
                                    />
                                    <Label>Main</Label>
                                </div>
                            </CardContent>
                        </Card>
                    )) : <div className="text-center text-muted-foreground">No images available</div>}
                </div>
            </div>

            {/* Product Info */}
            <div className="grid gap-3">
                <Label>Product Name</Label>
                <Input disabled value={product.product_name} readOnly />
            </div>
            <div className="grid gap-3">
                <Label>Price</Label>
                <Input disabled value={product.price} type="number" readOnly />
            </div>
            {product.discounted_price && product.discounted_price > 0 && (
                <div className="grid gap-3">
                    <Label>Discounted Price</Label>
                    <Input disabled value={product.discounted_price} type="number" readOnly />
                </div>
            )}
            <div className="grid gap-3">
                <Label>Stock</Label>
                <Input disabled value={product.stock} type="number" readOnly />
            </div>
            <div className="grid gap-3">
                <Label>Discounted Price</Label>
                <Input disabled value={product.discounted_price || undefined} type="number" readOnly />
            </div>
            <div className="grid gap-3">
                <Label>Category</Label>
                <Select value={product.category?.id?.toString() || "none"} disabled>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={product.category?.id?.toString() || "none"}>
                            {product.category?.category_name || "None"}
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-3">
                <Label >Description</Label>
                <Input disabled value={product.description || "" } readOnly />
            </div>
        </div>
    );
};

export default ViewProductModal;
