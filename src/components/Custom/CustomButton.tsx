'use client'
import { Loader2 } from "lucide-react"
interface IProps {
    color: string ,
    onClick?: (e?: any) => void,
    className?: string
    children?: React.ReactNode
    isLoading?: boolean
}
const CustomButton = ({ className, color, onClick, children, isLoading }: IProps) => {
    return (
        <button onClick={onClick}  className={`relative items-center ${isLoading ? `cursor-wait bg-gray-500` : 'cursor-pointer'} inline-flex font-medium text-custom-sm text-white bg-${color}-600    py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-${color}-700 ${className}`} >
            {children}
            {isLoading && <Loader2 className="w-4 h-4 animate-spin absolute right-2" />}
        </button>
    );
}

export default CustomButton;