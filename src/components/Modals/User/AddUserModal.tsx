'use client'
import { CirclePlus, Plus } from "lucide-react"
import {
    Dialog, DialogClose, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/shadcn/dialog"
import { Input } from "@/components/shadcn/input"
import { Label } from "@/components/shadcn/label"
import { Button } from "@/components/shadcn/button"
import Image from "next/image"
import { useState } from "react"
import {
    Select, SelectValue, SelectTrigger, SelectContent, SelectItem
} from "@/components/shadcn/select"
import { handleCreateUserAction, refreshUserList } from "@/actions/admin.user.action"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import CustomButton from "@/components/Custom/CustomButton"
import CustomModalBox from "../CustomModalBox"

const AddUserModal = () => {
    const [open, setOpen] = useState(false)
    const { data: session } = useSession()
    const [userData, setUserData] = useState({
        user_name: "",
        email: "",
        phone: "",
        address: "",
        role: "User",
        avatar_url: "",
        password: "",
    })
    const [avatar, setAvatar] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const handleAddUser = async () => {
        setIsLoading(true)
      
        if (
            userData.user_name === "" ||
            userData.email === "" ||
            userData.password === "" ||
            userData.role === ""
          ) {
            toast.error("Please fill in all required fields")
            setIsLoading(false)
            return
          }

        const formData = new FormData()
        formData.append("user_name", userData.user_name)
        formData.append("email", userData.email)
        formData.append("phone", userData.phone)
        formData.append("address", userData.address)
        formData.append("role", userData.role)
        formData.append("password", userData.password)
        if (avatar) formData.append("avatar", avatar)
      
        const result = await handleCreateUserAction(formData, session?.accessToken || "")
      
        if (result.success) {
          await new Promise(resolve => setTimeout(resolve, 1000))
          toast.success(result.message || "Create succeed!")
          setOpen(false)
        } else {
          toast.error(result.message || "Create failed!")
        }
      
        setIsLoading(false)
      }
      
    const handleOpenChange = (open: boolean) => {
        setOpen(open)
        setUserData({
            user_name: "",
            email: "",
            phone: "",
            address: "",
            role: "User",
            avatar_url: "",
            password: "",
        })
        setAvatar(null)
        // setIsLoading(false)
    }
    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="default" >
                    <CirclePlus className="w-4 h-4" />
                    Add User
                </Button>
            </DialogTrigger>
            <CustomModalBox>
                <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                        Enter new user details here.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                    <div className="flex flex-col gap-3 mx-auto items-center ">
                        <Label className="text-center">Avatar</Label>

                        <div className="w-[120px] h-[120px] bg-gray-200 rounded-md overflow-hidden">
                            <Image
                                src={avatar ? URL.createObjectURL(avatar) : "https://placehold.jp/150x150.png"}
                                alt="Avatar image"
                                width={120}
                                height={120}
                                className="w-full object-cover"
                            />
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() =>
                                document.getElementById("picture-input")?.click()
                            }
                            className="w-fit mx-auto"
                        >
                            {avatar ? "Change Avatar" : "Select Avatar"}
                        </Button>
                        <input
                            id="picture-input"
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
                            value={userData.user_name}
                            onChange={(e) =>
                                setUserData({ ...userData, user_name: e.target.value })
                            }
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label>Email <span className="text-red-500">*</span></Label>
                        <Input
                            value={userData.email}
                            onChange={(e) =>
                                setUserData({ ...userData, email: e.target.value })
                            }
                        />
                    </div>


                    <div className="grid gap-3">
                        <Label>Password <span className="text-red-500">*</span></Label>
                        <Input
                            value={userData.password}
                            onChange={(e) =>
                                setUserData({ ...userData, password: e.target.value })
                            }
                        />
                    </div>



                    <div className="grid gap-3">
                        <Label>Phone</Label>
                        <Input
                            value={userData.phone}
                            onChange={(e) =>
                                setUserData({ ...userData, phone: e.target.value })
                            }
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label>Address</Label>
                        <Input
                            value={userData.address}
                            onChange={(e) =>
                                setUserData({ ...userData, address: e.target.value })
                            }
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label>Role</Label>
                        <Select
                            defaultValue={userData.role}
                            onValueChange={(value) =>
                                setUserData({ ...userData, role: value })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Admin">Admin</SelectItem>
                                <SelectItem value="User">User</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>

                    <CustomButton color="blue" className={`px-4! py-2! w-[100px]  text-sm ${isLoading ? "cursor-wait" : "justify-center"}`} isLoading={isLoading} onClick={handleAddUser} >
                        Add User
                    </CustomButton>
                </DialogFooter>
            </CustomModalBox>
        </Dialog>
    )
}

export default AddUserModal
