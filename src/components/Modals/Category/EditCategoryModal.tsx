'use client'

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../../ui/button"
import { useState } from "react"
import { Pencil } from "lucide-react"
import CustomButton from "@/components/Custom/CustomButton"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import CustomModalBox from "../CustomModalBox"
import { handleUpdateCategoryAction } from "@/actions/admin.category.action"

const EditCategoryModal = ({ category }: { category: any }) => {
    const [open, setOpen] = useState(false)
    const { data: session } = useSession()
    const [categoryData, setCategoryData] = useState(category)
    const [isLoading, setIsLoading] = useState(false)

    const handleOpenChange = (open: boolean) => {
        setOpen(open)
        setCategoryData(category)
    }

    const handleUpdateCategory = async () => {
        if (!categoryData.category_name.trim()) {
            toast.warning("Category name is required.")
            return
        }

        setIsLoading(true)
        try {
            const success = await handleUpdateCategoryAction(
                category.id,
                categoryData.category_name,
                session?.accessToken || ""
            )
            if (success) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                toast.success("Category updated successfully!")
                setOpen(false)
            } else {
                toast.error("Failed to update category.")
            }
        } catch (err) {
            toast.error("Something went wrong.")
        } finally {
            setIsLoading(false)
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

            <CustomModalBox>
                <DialogHeader>
                    <DialogTitle>Edit Category</DialogTitle>
                    <DialogDescription>Edit category information here.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label>Category Name</Label>
                        <Input
                            value={categoryData.category_name || ""}
                            placeholder="Enter category name"
                            onChange={(e) => setCategoryData({ ...categoryData, category_name: e.target.value })}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <CustomButton
                        color="blue"
                        className={`px-4! py-2! w-[100px] text-sm ${isLoading ? "cursor-wait" : "justify-center"}`}
                        isLoading={isLoading}
                        onClick={handleUpdateCategory}
                    >
                        Save
                    </CustomButton>
                </DialogFooter>
            </CustomModalBox>
        </Dialog>
    )
}

export default EditCategoryModal 