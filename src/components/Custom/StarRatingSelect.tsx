import { Star, StarHalf } from "lucide-react"
import { useState } from "react"

const StarRatingSelect = ({ rating, onChange, }: { rating: number, onChange: (value: number) => void }) => {
    const [hover, setHover] = useState<number | null>(null)

    const handleMouseMove = (index: number, e: React.MouseEvent) => {
        // index of star
        // left = position x in window, width = width of the element
        //  e.clientX = position cursor in window
        const { left, width } = e.currentTarget.getBoundingClientRect()
        // console.log(left, width, e.clientX)
        const x = e.clientX - left
        const percent = x / width
        const value = index + (percent < 0.5 ? 0.5 : 1)
        setHover(value)
    }

    const handleClick = (index: number, e: React.MouseEvent) => {
        const { left, width } = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - left
        const percent = x / width
        const value = index + (percent < 0.5 ? 0.5 : 1)
        onChange(value)
    }

    const displayRating = hover ?? rating

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
                            // when hover send 
                            onMouseMove={(e) => handleMouseMove(index, e)}
                            onMouseLeave={() => setHover(null)}
                            onClick={(e) => handleClick(index, e)}
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
export default StarRatingSelect