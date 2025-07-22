'use client'

import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/shadcn/dialog"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import { Button } from "@/components/shadcn/button"
import { useState } from "react"
import { Pencil } from "lucide-react"
import CustomButton from "@/components/Custom/CustomButton"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import CustomModalBox from "../CustomModalBox"
import { handleUpdateCategoryAction } from "@/actions/admin.category.action"
import Image from "next/image"
import { ICategory } from "@/types"

const EditCategoryModal = ({ category }: { category: ICategory }) => {
  const [open, setOpen] = useState(false)
  const { data: session } = useSession()
  const [categoryData, setCategoryData] = useState(category)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    setCategoryData(category)
    setImageFile(null)
  }

  const handleUpdateCategory = async () => {
    if (!categoryData.category_name.trim()) {
      toast.warning("Category name is required.");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("category_name", categoryData.category_name);
    if (imageFile) formData.append("image", imageFile);

    const result = await handleUpdateCategoryAction(category.id, formData, session?.accessToken || "");

    if (result.success) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(result.message || "Category updated successfully!");
      setOpen(false);
    } else {
      toast.error(result.message || "Failed to update category.");
    }

    setIsLoading(false);
  };


  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer text-orange-500">
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
          {/* Category Image */}
          <div className="flex flex-col gap-3 mx-auto items-center">
            <Label className="text-center justify-center">Image</Label>

            {imageFile ? (
              <img
                fetchPriority="low"
                loading="lazy"
                decoding="async"
                src={URL.createObjectURL(imageFile)}
                alt="New Category Preview"
                width={120}
                height={120}
                className="rounded-md"
              />
            ) : categoryData.image_url ? (
              <img
                fetchPriority="low"
                loading="lazy"
                decoding="async"
                src={categoryData.image_url}
                alt="Current Category"
                width={120}
                height={120}
                className="rounded-md"
              />
            ) : (
              <div className="w-[120px] h-[120px] bg-gray-200 rounded-md" />
            )}

            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('edit-category-image-input')?.click()}
              className="w-fit mx-auto"
            >
              {categoryData.image_url ? "Change Image" : "Add Image"}
            </Button>
            <input
              id="edit-category-image-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImageFile(e.target.files[0])
                }
              }}
            />
          </div>

          {/* Category Name */}
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
