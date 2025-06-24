'use client'
interface IProps {
    color: string,
    onClick?: () => void,
    className?: string
    children?: React.ReactNode
}
const CustomButton = ({ className, color, onClick, children }: IProps) => {
    return (
        <button onClick={onClick} className={`cursor-pointer inline-flex font-medium text-custom-sm text-white bg-${color}-600 py-2.5 px-8.5 rounded-md ease-out duration-200 hover:bg-${color}-700 ${className}`} >
            {children}
        </button>
    );
}

export default CustomButton;