'use client'
import { CirclePlus, Plus } from "lucide-react"
import {
    Dialog, DialogClose, DialogContent, DialogDescription,
    DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "../../ui/button"
import Image from "next/image"
import { useState } from "react"
import {
    Select, SelectValue, SelectTrigger, SelectContent, SelectItem
} from "../../ui/select"
import { handleCreateUserAction } from "@/actions/admin.action"
import { toast } from "react-toastify"
import { useSession } from "next-auth/react"
import CustomButton from "@/components/Custom/CustomButton"

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
        try {
            const formData = new FormData()
            formData.append("user_name", userData.user_name)
            formData.append("email", userData.email)
            formData.append("phone", userData.phone)
            formData.append("address", userData.address)
            formData.append("role", userData.role)
            formData.append("password", userData.password)
            if (avatar) {
                formData.append("avatar", avatar)
            }
            // console.log(formData)
            // console.log(session?.accessToken)
            const res = await handleCreateUserAction(formData, session?.accessToken || "");
            if (res) {
                console.log("res", res)
                toast.success("Create succeed!")
                setOpen(false)
                setIsLoading(false)
            }
        } catch (error) {
            toast.error("Create failed!")
            setIsLoading(false)

        }
    };

    return (
        <Dialog open={open} >
            <DialogTrigger>
                <Button variant="default" onClick={() => setOpen(true)}>
                    <CirclePlus className="w-4 h-4" />
                    Add User
                </Button>
            </DialogTrigger>
            <DialogContent className="lg:max-w-1/2 overflow-y-scroll max-h-screen [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-track]:my-5 [&::-webkit-scrollbar-thumb]:w-2">
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
                        <Label>Username</Label>
                        <Input
                            value={userData.user_name}
                            onChange={(e) =>
                                setUserData({ ...userData, user_name: e.target.value })
                            }
                        />
                    </div>

                    <div className="grid gap-3">
                        <Label>Email</Label>
                        <Input
                            value={userData.email}
                            onChange={(e) =>
                                setUserData({ ...userData, email: e.target.value })
                            }
                        />
                    </div>


                    <div className="grid gap-3">
                        <Label>Password</Label>
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
            </DialogContent>
        </Dialog>
    )
}

export default AddUserModal
