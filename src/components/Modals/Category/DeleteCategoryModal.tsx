'use client'

import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/shadcn/dialog"
import { Button } from "@/components/shadcn/button"
import { Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import CustomModalBox from "../CustomModalBox"
import CustomButton from "@/components/Custom/CustomButton"
import { handleDeleteCategoryAction } from "@/actions/admin.category.action"
import { ICategory } from "@/types"

const DeleteCategoryModal = ({ category }: { category: ICategory }) => {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
  }

  const handleDeleteCategory = async () => {
    setIsLoading(true);

    const result = await handleDeleteCategoryAction(category.id, session?.accessToken || "");

    if (result.success) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(result.message || "Category deleted successfully!");
      setOpen(false);
    } else {
      toast.error(result.message || "Failed to delete category.");
    }

    setIsLoading(false);
  };



  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer text-red-500">
          <Trash2 className="w-4 h-4" />
          Delete
        </Button>
      </DialogTrigger>

      <CustomModalBox>
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
          <DialogDescription>
            Do you want to delete this category?
          </DialogDescription>
        </DialogHeader>

        <DeleteCategoryModalContent category={category} />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <CustomButton
            color="blue"
            className={`px-4! py-2! text-sm w-[100px]! ${isLoading ? "cursor-wait" : "justify-center"}`}
            isLoading={isLoading}
            onClick={handleDeleteCategory}
          >
            Delete
          </CustomButton>
        </DialogFooter>
      </CustomModalBox>
    </Dialog>
  )
}

const DeleteCategoryModalContent = ({ category }: { category: any }) => {
  const [categoryData] = useState(category)

  return (
    <div className="grid gap-4">
      <div className="text-center grid gap-3 font-medium text-lg">
        {categoryData.category_name}
      </div>
    </div>
  )
}

export default DeleteCategoryModal
