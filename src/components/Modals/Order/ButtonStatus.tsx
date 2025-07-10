import { changeStatus } from "@/actions/admin.order.action";
import { Button } from "@/components/shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover";
import { IOrder } from "@/types";
import { CircleCheck, CircleX } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

const ButtonStatus = ({ order, status }: { order: IOrder, status: "processing" | "delivered" | "cancelled", }) => {
    const session = useSession()
    const handlechangeStatus = async () => {
        if (!session?.data?.user?.accessToken) {
            toast.error("Please login to change status")
            setOpen(false)
            return
        }
        const res = await changeStatus(order.id, status, session?.data?.user?.accessToken || "")
        if (res.success) {
            toast.success("Order status updated")
        } else {
            toast.error("Order status cannot be updated")
        }
        setOpen(false)
    }
    const [open, setOpen] = useState(false);
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className={`text-primary cursor-pointer
                    ${status === "processing" ? "text-primary"
                        : status === "delivered" ? "text-green-600"
                            : status === "cancelled" ? "text-red-500"
                                : ""}`}
                >
                    <CircleCheck className="w-4 h-4" /> {status.charAt(0).toUpperCase() + status.slice(1)}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[120px]">
                <p className="text-sm mb-2">
                    Are you sure?
                </p>
                <div className="flex items-center justify-end gap-1">
                    <Button onClick={handlechangeStatus}
                        className="cursor-pointer"
                        variant="default"
                        size={"sm"}
                    >
                        Yes
                    </Button>
                    <Button onClick={() => setOpen(false)}
                        variant="outline"
                        className="cursor-pointer"
                        size={"sm"}
                    >
                        No
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}
export default ButtonStatus