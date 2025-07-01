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
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../../ui/button";
import Image from "next/image";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue, SelectLabel, SelectGroup } from "@/components/ui/select";

const ViewUserModal = ({ user }: { user: any }) => {
    return (
        <Dialog >
            <DialogTrigger>
                <Button variant="outline" className=" text-blue-700" >
                    <Eye className="w-4 h-4" />
                    View
                </Button>
            </DialogTrigger>
            <DialogContent className={`lg:max-w-1/2 overflow-y-scroll max-h-screen [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-track]:my-5 [&::-webkit-scrollbar-thumb]:w-2 `}>
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                    <DialogDescription>
                        View user details here.
                    </DialogDescription>
                </DialogHeader>
                <UserModalContent user={user}></UserModalContent>
            </DialogContent>
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
                <Select disabled value={user.role || "None"}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup >
                            <SelectLabel>Role</SelectLabel>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="User">User</SelectItem>
                            <SelectItem value="None">None</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

        </div>

    )
}

export default ViewUserModal;