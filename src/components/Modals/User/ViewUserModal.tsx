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
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue, SelectLabel, SelectGroup } from "@/components/shadcn/select";
import CustomModalBox from "../CustomModalBox";

const ViewUserModal = ({ user }: { user: any }) => {
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="outline" className=" text-blue-700" >
                    <Eye className="w-4 h-4" />
                    View
                </Button>
            </DialogTrigger>
            <CustomModalBox>
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                    <DialogDescription>
                        View user details here.
                    </DialogDescription>
                </DialogHeader>
                <UserModalContent user={user}></UserModalContent>
            </CustomModalBox>
        </Dialog>
    );
}
const UserModalContent = ({ user }: { user: any }) => {
    console.log(user)
    return (

        <div className="grid gap-4">
            <div className="grid gap-3 mx-auto">
                {
                    user.avatar_url ? (
                        <Image
                            src={user.avatar_url}
                            alt="Current Avatar"
                            width={100}
                            height={100}
                            className="rounded-full mx-auto"
                        />
                    ) : (
                        <div className="w-[100px] h-[100px] bg-gray-200 rounded-full mx-auto" />
                    )
                }

            </div>
            <div className="grid gap-3">
                <Label>Username</Label>
                <Input disabled defaultValue="User Name" value={user.user_name} />
            </div>

            <div className="grid gap-3">
                <Label>Email</Label>
                <Input disabled defaultValue="User Email" value={user.email} />
            </div>
            <div className="grid gap-3">
                <Label>Phone</Label>
                <Input disabled defaultValue="User Phone" value={user.phone} />
            </div>
            <div className="grid gap-3">
                <Label>Address</Label>
                <Input disabled defaultValue="User Address" value={user.address} />
            </div>
            <div className="grid gap-3">
                <Label>Role</Label>
                <Select disabled value={user.role || "none"}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup >
                            <SelectLabel>Role</SelectLabel>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

        </div>

    )
}

export default ViewUserModal;