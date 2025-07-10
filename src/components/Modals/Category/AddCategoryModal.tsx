'use client'

import { useState } from "react"
import { CirclePlus } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/shadcn/button"
import {
  Dialog, DialogTrigger, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogClose
} from "@/components/shadcn/dialog"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import CustomModalBox from "../CustomModalBox"
import CustomButton from "@/components/Custom/CustomButton"
import { handleCreateCategoryAction } from "@/actions/admin.category.action"
import { useSession } from "next-auth/react"
import Image from "next/image"

const AddCategoryModal = () => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const { data: session } = useSession()

  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      toast.warning("Category name is required.");
      return;
    }
  
    setIsLoading(true);
  
    const formData = new FormData();
    formData.append("category_name", categoryName);
    if (imageFile) formData.append("image", imageFile);
  
    const result = await handleCreateCategoryAction(formData, session?.accessToken || "");
  
    if (result.success) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(result.message || "Category added successfully!");
      setOpen(false);
      setCategoryName("");
      setImageFile(null);
    } else {
      toast.error(result.message || "Failed to create category.");
    }
  
    setIsLoading(false);
  };
  
  
  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    setCategoryName("")
    setImageFile(null)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" variant="default" >
          <CirclePlus className="w-4 h-4" />
          Add Category
        </Button>
      </DialogTrigger>

      <CustomModalBox>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>Enter category details</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">

          {/* Upload Image */}
          <div className="flex flex-col gap-3 mx-auto items-center">
            <Label className="text-center">Image</Label>
            <div className="w-[120px] h-[120px] bg-gray-200 rounded-md overflow-hidden">
              <img
                src={imageFile ? URL.createObjectURL(imageFile) : "https://placehold.jp/150x150.png"}
                alt="Category image"
                width={120}
                height={120}
                className="w-full h-full object-cover"
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById("category-image-input")?.click()}
              className="w-fit mx-auto"
            >
              {imageFile ? "Change Image" : "Select Image"}
            </Button>
            <input
              id="category-image-input"
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
          <div className="grid gap-2">
            <Label htmlFor="category-name">Category Name</Label>
            <Input
              id="category-name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Ex: Electronics"
            />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <CustomButton
            color="blue"
            className={`px-4! py-2! text-sm text-center w-[100px]! ${isLoading ? "cursor-wait" : ""}`}
            isLoading={isLoading}
            onClick={handleAddCategory}
          >
            Add
          </CustomButton>
        </DialogFooter>
      </CustomModalBox>
    </Dialog>
  )
}

export default AddCategoryModal
