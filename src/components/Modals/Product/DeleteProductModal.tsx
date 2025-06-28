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

const DeleteProductModal = ({ product }: { product: any }) => {
    return (
        <Dialog >
            <DialogTrigger>
                <Button variant="outline" className=" text-red-500" >
                    <Ban className="w-4 h-4" />
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent className={`lg:max-w-1/2 overflow-y-scroll max-h-screen [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-track]:my-5 [&::-webkit-scrollbar-thumb]:w-2 `}>
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
            </DialogContent>
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