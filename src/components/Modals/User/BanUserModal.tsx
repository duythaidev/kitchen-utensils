"use client"
import { Ban } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState, startTransition } from "react"
import { toast } from "sonner"
import { handleBanUserAction, refreshUserList } from "@/actions/admin.user.action"
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { fetchUserList } from "@/actions/client-api"

const BanUserModal = ({ user }: { user: any }) => {
    const { data: session } = useSession()
    const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = useState(false)

    const handleBan = async () => {
        setIsLoading(true)
        try {
            const res = await handleBanUserAction(user.id, user.is_active, session?.accessToken || "")
            if (res) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                toast.success(user.is_active ? "User banned!" : "User unbanned!")
                setOpen(false)
                // refreshUserList()
            }
        } catch (error) {
            toast.error("Failed to update user status")
        } finally {
            setIsLoading(false)
        }
    }
    const handleOpenChange = (open: boolean) => {
        setOpen(open)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="outline" className={user.is_active ? "text-red-500" : "text-green-500"}>
                    <Ban className="w-4 h-4" />
                    {user.is_active ? "Ban" : "Unban"}
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{user.is_active ? "Ban User" : "Unban User"}</DialogTitle>
                    <DialogDescription>
                        {user.is_active
                            ? "Do you want to ban this user?"
                            : "Do you want to unban this user?"}
                    </DialogDescription>
                </DialogHeader>
                <div className="text-center">{user.user_name} - {user.email}</div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="button" onClick={handleBan} disabled={isLoading}>
                        {isLoading
                            ? (user.is_active ? "Banning..." : "Unbanning...")
                            : (user.is_active ? "Ban" : "Unban")}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default BanUserModal;