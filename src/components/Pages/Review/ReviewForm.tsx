import { addReview } from "@/actions/user.action";
import CustomButton from "@/components/Custom/CustomButton";
import StarRatingSelect from "@/components/Custom/StarRatingSelect";
import { IReview } from "@/types";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

const ReviewForm = ({ product_id }: { product_id: number }) => {

    const [rating, setRating] = useState(5)
    const [isLoading, setIsLoading] = useState(false)
    const session = useSession()
    const [comment, setComment] = useState("")

    const handleAddReview = async () => {
        setIsLoading(true)

        if (!session.data?.user?.accessToken) {
            toast.error("Please login to add review")
            setIsLoading(false)
            return
        }
        if (comment.length < 10 || comment.length > 250) {
            toast.error("Comment must be between 10 and 250 characters")
            setIsLoading(false)
            return
        }
        if (rating < 1 || rating > 5) {
            toast.error("You must rate the product")
            setIsLoading(false)
            return
        }

        const res = await addReview(product_id, rating, comment, session.data?.user?.accessToken)
        if (res.success) {
            toast.success("Review added")
        } else {
            toast.error(res.message)
        }
        setIsLoading(false)
    }
    return (
        <div className="max-w-[550px] w-full" >
            <h2 className="font-medium text-2xl text-dark mb-3.5">
                Add a Review
            </h2>

            <p className="mb-6">
                Your email address will not be published. Required fields are marked *
            </p>

            <div className="flex items-center gap-3 mb-7.5">
                <span>Your Rating*</span>
                <StarRatingSelect rating={rating} onChange={setRating} />
            </div>

            <div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                <div className="mb-5">
                    <label htmlFor="comments" className="block mb-2.5">
                        Comments
                    </label>

                    <textarea
                        name="comments"
                        id="comments"
                        rows={5}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        maxLength={250}
                        placeholder="Your comments"
                        className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    ></textarea>

                    <span className="flex items-center justify-end mt-2.5">
                        <span className="text-custom-sm text-dark-4">

                            {comment.length < 10 ?
                                <span className="text-red-500">
                                    {comment.length}
                                </span>
                                :
                                <span>
                                    {comment.length}
                                </span>
                            }

                            /250
                        </span>
                    </span>
                </div>

                <div className="flex flex-col lg:flex-row lg:justify-end lg:items-end gap-5 sm:gap-7.5">
                    <CustomButton
                        color="blue"
                        onClick={handleAddReview}
                        isLoading={isLoading}
                    >
                        Submit Reviews
                    </CustomButton>
                </div>

            </div>
        </div >

    )
}

export default ReviewForm