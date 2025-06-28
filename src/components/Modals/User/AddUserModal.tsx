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

const AddUserModal = () => {
    const [userData, setUserData] = useState({
        user_name: "",
        email: "",
        phone: "",
        address: "",
        role: "User",
        avatar_url: "",
    })
    const [avatar, setAvatar] = useState<File | null>(null)

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="default" >
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
                    <div className="grid gap-3 mx-auto items-center">
                        <Label className="text-center">Avatar</Label>

                        {avatar ? (
                            <Image
                                src={URL.createObjectURL(avatar)}
                                alt="New Avatar Preview"
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
                    <Button
                        type="submit"
                        onClick={() => {
                            console.log({
                                ...userData,
                                avatar: avatar ? URL.createObjectURL(avatar) : null,
                            })
                        }}
                    >
                        Add User
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddUserModal
