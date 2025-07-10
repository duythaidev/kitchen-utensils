import { Star, StarHalf } from "lucide-react"

const StarRating = ({ rating, }: { rating: number }) => {
    const displayRating = rating

    return (
        <div className="relative flex gap-1">
            {Array.from({ length: 5 }, (_, index) => {
                return (
                    <Star key={index} fill="gray" color="gray" strokeWidth={2} />
                )
            })}
            <div className="flex gap-1 absolute">

                {Array.from({ length: 5 }, (_, index) => {
                    const full = index + 1 <= displayRating
                    const half = !full && index + 0.5 <= displayRating

                    return (
                        <div
                            key={index}
                            className="cursor-pointer top-0 left-0"
                        >
                            {full ? (
                                <Star fill="#FBB040" color="#FBB040" strokeWidth={2} />
                            ) : half ? (
                                <StarHalf fill="#FBB040" color="#FBB040" strokeWidth={2} />
                            ) : (
                                <Star fill="gray" color="gray" strokeWidth={2} />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default StarRating