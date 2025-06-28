import { Ban, Eye, Pencil } from "lucide-react";

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
import { Button } from "../../ui/button";
import { useState } from "react";

const BanUserModal = ({ user }: { user: any }) => {
    return (
        <Dialog >
            <DialogTrigger>
                {
                    user.is_active ?
                        <Button variant="outline" className=" text-red-500" >
                            <Ban className="w-4 h-4" />
                            Ban
                        </Button>
                        :
                        <Button variant="outline" className=" text-green-500" >
                            <Ban className="w-4 h-4" />
                            Unban
                        </Button>
                }
            </DialogTrigger>
            <DialogContent className={`lg:max-w-1/2 overflow-y-scroll max-h-screen [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-track]:my-5 [&::-webkit-scrollbar-thumb]:w-2 `}>
                <DialogHeader>
                    <DialogTitle>
                        {
                            user.is_active ?
                                "Ban User"
                                :
                                "Unban User"
                        }
                    </DialogTitle>
                    <DialogDescription>
                        {
                            user.is_active ?
                                "Do you want to ban this user?"
                                :
                                "Do you want to unban this user?"
                        }
                    </DialogDescription>
                </DialogHeader>
                <BanUserModalContent user={user}></BanUserModalContent>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">
                        {
                            user.is_active ?
                                "Ban"
                                :
                                "Unban"
                        }
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
const BanUserModalContent = ({ user }: { user: any }) => {
    const [userData, setUserData] = useState(user);

    return (

        <div className="grid gap-4">
   
            <div className="text-center grid gap-3">
                {userData.user_name} - {userData.email}
            </div>

        </div >

    )
}

export default BanUserModal;