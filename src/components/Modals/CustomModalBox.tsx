'use client'
import { DialogContent } from "@/components/shadcn/dialog"

export default function CustomModalBox({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <DialogContent className={` lg:max-w-1/2 overflow-y-scroll max-h-screen [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-track]:my-5 [&::-webkit-scrollbar-thumb]:w-2 ${className}`}>
            {children}
        </DialogContent>
    )
}

