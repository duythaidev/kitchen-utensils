'use client'

import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/shadcn/dialog"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import { Button } from "@/components/shadcn/button"
import { Eye } from "lucide-react"
import Image from "next/image"
import CustomModalBox from "../CustomModalBox"
import { ICategory } from "@/types"

const ViewCategoryModal = ({ category }: { category: ICategory }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-blue-600">
          <Eye className="w-4 h-4" />
          View
        </Button>
      </DialogTrigger>

      <CustomModalBox>
        <DialogHeader>
          <DialogTitle>Category Details</DialogTitle>
          <DialogDescription>
            View category information here.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Category Image */}
          <div className="flex flex-col gap-3 mx-auto items-center">
            <Label className="text-center justify-center">Image</Label>

            {category.image_url ? (
              <Image
                src={category.image_url}
                alt="Category Image"
                width={120}
                height={120}
                className="rounded-md"
              />
            ) : (
              <div className="w-[120px] h-[120px] bg-gray-200 rounded-md" />
            )}
          </div>

          {/* Category Name */}
          <div className="grid gap-3">
            <Label>Category Name</Label>
            <Input
              value={category.category_name || ""}
              disabled
              placeholder="Category name"
            />
          </div>
        </div>
      </CustomModalBox>
    </Dialog>
  )
}

export default ViewCategoryModal
