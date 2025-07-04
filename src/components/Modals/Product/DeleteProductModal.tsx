import { Ban, Eye, Pencil } from "lucide-react";

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
import { Button } from "../../ui/button";
import { useState } from "react";
import CustomModalBox from "../CustomModalBox";
const DeleteProductModal = ({ product }: { product: any }) => {
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline" className=" text-red-500" >
                    <Ban className="w-4 h-4" />
                    Delete
                </Button>
            </DialogTrigger>
            <CustomModalBox>
                <DialogHeader>
                    <DialogTitle>
                        {
                            "Delete Product"
                        }
                    </DialogTitle>
                    <DialogDescription>
                        {
                            "Do you want to delete this product?"
                        }
                    </DialogDescription>
                </DialogHeader>
                <DeleteProductModalContent product={product}></DeleteProductModalContent>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">
                        {
                            "Delete"
                        }
                    </Button>
                </DialogFooter>
            </CustomModalBox>
        </Dialog>
    );
}
const DeleteProductModalContent = ({ product }: { product: any }) => {
    const [productData, setProductData] = useState(product);

    return (

        <div className="grid gap-4">

            <div className="text-center grid gap-3">
                {productData.product_name}
            </div>

        </div >

    )
}

export default DeleteProductModal;