import { IReview } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "../shadcn/avatar";
import { UserRoundIcon, CircleX } from "lucide-react";
import { Button } from "../shadcn/button";
import StarRating from "./StarRating";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../shadcn/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../shadcn/tooltip";
import { toast } from "sonner";
import { deleteReview } from "@/actions/user.action";

const ReviewList = ({ reviews, product_id }: { reviews?: IReview[], product_id: number }) => {
    const [open, setOpen] = useState(false)
    const session = useSession()

    const handleDeleteReview = async () => {

        if (!session.data?.user?.accessToken) {
            toast.error("Please login to add review")
            return
        }
        const res = await deleteReview(product_id, session.data?.user?.accessToken)
        if (res.success) {
            toast.success("Review deleted")
        } else {
            toast.error(res.message)
        }
    }
    return (
        <div className="max-w-[570px] w-full">
            <h2 className="font-medium text-2xl text-dark mb-9">
                {reviews?.length} Review for this product
            </h2>

            <div className="flex flex-col gap-6">
                {/* <!-- review item --> */}
                {
                    reviews && reviews?.map((review) => (
                        <div key={review.id} className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full overflow-hidden">
                                        <Avatar>
                                            <AvatarImage src={review.user.avatar_url || ""} />
                                            <AvatarFallback>
                                                <UserRoundIcon className="w-4 h-4" />
                                            </AvatarFallback>
                                        </Avatar>
                                    </div>

                                    <div>
                                        <h3 className="font-medium text-dark">
                                            {review.user.user_name}
                                        </h3>

                                    </div>
                                </div>

                                <div className="flex items-center gap-1">
                                    <StarRating rating={Number(4.5)} />
                                </div>
                            </div>

                            <p className="text-dark mt-6">
                                {review.comment}
                            </p>

                            {/* Delete Review */}
                            {
                                review.user.email === session.data?.user?.email && (
                                    <div className="flex justify-end">
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <PopoverTrigger asChild>
                                                        <TooltipTrigger asChild>
                                                            <button
                                                                onClick={() => setOpen(true)}
                                                                aria-label="button for remove product from wishlist"
                                                                className="flex cursor-pointer items-center  justify-center rounded-md w-[40px] h-[40px] bg-gray-100 border border-gray-300 ease-out duration-200 hover:bg-red-200 hover:border-red-400 hover:text-red-600"
                                                            >
                                                                <CircleX className="w-5 h-5" />
                                                            </button>
                                                        </TooltipTrigger>
                                                    </PopoverTrigger>
                                                    <TooltipContent>
                                                        Delete Review
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                            <PopoverContent className="w-[120px]">
                                                <p className="text-sm mb-2">
                                                    Are you sure?
                                                </p>
                                                <div className="flex items-center justify-center gap-1">
                                                    <Button
                                                        onClick={handleDeleteReview}
                                                        aria-label="button for remove product from wishlist"
                                                        className="cursor-pointer"
                                                        variant="destructive"
                                                        size={"sm"}
                                                    >
                                                        Yes
                                                    </Button>
                                                    <Button onClick={() => setOpen(false)}
                                                        aria-label="button for remove product from wishlist"
                                                        variant="outline"
                                                        className="cursor-pointer"
                                                        size={"sm"}
                                                    >
                                                        No
                                                    </Button>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default ReviewList;