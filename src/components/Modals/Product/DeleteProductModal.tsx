'use client'

import {
    Dialog,
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import CustomButton from "@/components/Custom/CustomButton";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import CustomModalBox from "../CustomModalBox";
import { handleDeleteProductAction } from "@/actions/admin.product.action";
import { IProduct } from "@/types/product";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const DeleteProductModal = ({ product }: { product: IProduct }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();

    const handleOpenChange = (open: boolean) => {
        setOpen(open);
    };

    const handleDeleteProduct = async () => {
        setIsLoading(true);
        try {
            const success = await handleDeleteProductAction(product.id, session?.accessToken || "");
            if (success) {
                toast.success("Product deleted successfully!");
                setOpen(false);
            } else {
                toast.error("Failed to delete product.");
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                    Delete
                </Button>
            </DialogTrigger>

            <CustomModalBox>
                <DialogHeader>
                    <DialogTitle>Delete Product</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete this product? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                    <div className="text-center grid gap-3">
                        <div className="font-medium text-lg">{product.product_name}</div>

                        {product.images?.[0]?.image_url && (
                            <div className="flex justify-center">
                                <Card className="w-[200px] h-[200px]">
                                    <CardHeader>
                                        <img
                                            src={product.images[0].image_url}
                                            alt={product.product_name}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </CardHeader>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <CustomButton
                        color="blue"
                        className={`px-4! py-2! text-sm w-[100px]! ${isLoading ? "cursor-wait" : "justify-center"}`}
                        isLoading={isLoading}
                        onClick={handleDeleteProduct}
                    >
                        Delete
                    </CustomButton>
                </DialogFooter>
            </CustomModalBox>
        </Dialog>
    );
};

export default DeleteProductModal;
