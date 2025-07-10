'use client'

import { Eye } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/shadcn/dialog"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import { Button } from "@/components/shadcn/button";
import Image from "next/image";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectGroup
} from "@/components/shadcn/select";
import CustomModalBox from "../CustomModalBox";
import { IUser } from "@/types";

const ViewUserModal = ({ user }: { user: IUser }) => {
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
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>View user details here.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Avatar */}
          <div className="grid gap-3 mx-auto">
            {user.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt="Current Avatar"
                width={100}
                height={100}
                className="rounded-full mx-auto"
              />
            ) : (
              <div className="w-[100px] h-[100px] bg-gray-200 rounded-full mx-auto" />
            )}
          </div>

          {/* Username */}
          <div className="grid gap-3">
            <Label>Username</Label>
            <Input disabled value={user.user_name || ""} />
          </div>

          {/* Email */}
          <div className="grid gap-3">
            <Label>Email</Label>
            <Input disabled value={user.email || ""} />
          </div>

          {/* Phone */}
          <div className="grid gap-3">
            <Label>Phone</Label>
            <Input disabled value={user.phone || ""} />
          </div>

          {/* Address */}
          <div className="grid gap-3">
            <Label>Address</Label>
            <Input disabled value={user.address || ""} />
          </div>

          {/* Role */}
          <div className="grid gap-3">
            <Label>Role</Label>
            <Select disabled value={user.role || "none"}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Role</SelectLabel>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CustomModalBox>
    </Dialog>
  );
}

export default ViewUserModal;
