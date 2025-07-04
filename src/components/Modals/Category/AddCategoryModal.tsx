'use client'

import { useState } from "react"
import { CirclePlus, Plus } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog, DialogTrigger, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CustomModalBox from "../CustomModalBox"
import CustomButton from "@/components/Custom/CustomButton"
import { handleCreateCategoryAction } from "@/actions/admin.category.action"
import { useSession } from "next-auth/react"

const AddCategoryModal = () => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const { data: session } = useSession()


  const handleAddCategory = async () => {
    if (!categoryName.trim()) {
      toast.warning("Category name is required.")
      return
    }

    setIsLoading(true)
    try {
      const success = await handleCreateCategoryAction(categoryName, session?.accessToken || "")
      if (success) {
        toast.success("Category added successfully!")
        setOpen(false)
        setCategoryName("")
      } else {
        toast.error("Failed to create category.")
      }
    } catch (err) {
      toast.error("Something went wrong.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    setOpen(open)
    setCategoryName("")
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="default" >
          <CirclePlus className="w-4 h-4" />
          Add Category
        </Button>
      </DialogTrigger>

      <CustomModalBox>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>Enter category name</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
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
            className={`px-4! py-2! text-sm ${isLoading ? "cursor-wait" : ""}`}
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
