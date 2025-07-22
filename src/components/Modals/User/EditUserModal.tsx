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
} from "@/components/shadcn/dialog"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import { Button } from "@/components/shadcn/button"
import Image from "next/image"
import { useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/shadcn/select"
import { Pencil } from "lucide-react"
import CustomButton from "@/components/Custom/CustomButton"
import { toast } from "sonner"
import { handleUpdateUserAction, refreshUserList } from "@/actions/admin.user.action"
import { useSession } from "next-auth/react"
import CustomModalBox from "../CustomModalBox"
import { IUser } from "@/types"

const EditUserModal = ({ user }: { user: IUser }) => {
    const [open, setOpen] = useState(false)
    const { data: session } = useSession()
    const [userData, setUserData] = useState(user)
    const [avatar, setAvatar] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    //   console.log(userData)
    const handleOpenChange = (open: boolean) => {
        setOpen(open)
        setUserData(user)
        setAvatar(null)
    }

    const handleUpdateUser = async () => {
        setIsLoading(true);
        if (
            userData.user_name === "" ||
            userData.email === "" ||
            userData.role === ""
        ) {
            toast.error("Please fill in all required fields");
            setIsLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append("user_name", userData?.user_name || "");
        formData.append("email", userData?.email || "");
        formData.append("phone", userData?.phone || "");
        formData.append("address", userData?.address || "");
        formData.append("role", userData?.role || "");
        if (avatar) formData.append("avatar", avatar);

        const result = await handleUpdateUserAction(user.id, formData, session?.accessToken || "");

        if (result.success) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            toast.success(result.message || "Update succeed!");
            setOpen(false);
        } else {
            toast.error(result.message || "Update failed!");
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
                    <DialogTitle>Edit User Information</DialogTitle>
                    <DialogDescription>Edit user information here.</DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                    <div className="grid gap-3 mx-auto items-center">
                        <Label className="text-center justify-center">Avatar</Label>

                        {avatar ? (
                            <img
                                fetchPriority="low"
                                loading="lazy"
                                decoding="async"
                                src={URL.createObjectURL(avatar)}
                                alt="New Avatar Preview"
                                width={100}
                                height={100}
                                className="rounded-full mx-auto"
                            />
                        ) : userData.avatar_url ? (
                            <img
                                fetchPriority="low"
                                loading="lazy"
                                decoding="async"
                                src={userData.avatar_url}
                                alt="Current Avatar"
                                width={100}
                                height={100}
                                className="rounded-full mx-auto"
                            />
                        ) : (
                            <div className="w-[100px] h-[100px] bg-gray-200 rounded-full mx-auto" />
                        )}

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => document.getElementById('edit-picture-input')?.click()}
                            className="w-fit mx-auto"
                        >
                            {userData.avatar_url ? "Change Avatar" : "Add Avatar"}
                        </Button>
                        <input
                            id="edit-picture-input"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                    setAvatar(e.target.files[0])
                                }
                            }}
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label>Username <span className="text-red-500">*</span></Label>
                        <Input
                            value={userData.user_name || ""}
                            placeholder="Enter username"

                            onChange={(e) => setUserData({ ...userData, user_name: e.target.value })}
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label>Email <span className="text-red-500">*</span></Label>
                        <Input
                            value={userData.email || ""}
                            placeholder="Enter email"
                            disabled={true}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label>Phone</Label>
                        <Input
                            value={userData.phone || ""}
                            placeholder="Enter phone"
                            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label>Address</Label>
                        <Input
                            value={userData.address || ""}
                            placeholder="Enter address"
                            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label>Role</Label>
                        <Select
                            defaultValue={userData.role || ""}

                            onValueChange={(value) => setUserData({ ...userData, role: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                            </SelectContent>
                        </Select>
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
                        onClick={handleUpdateUser}
                    >
                        Save
                    </CustomButton>
                </DialogFooter>
            </CustomModalBox>
        </Dialog>
    )
}

export default EditUserModal
