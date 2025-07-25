"use client"
import ErrorPage from "@/components/ErrorPage"
import { useEffect } from "react"

export default function Error({
    error,
    reset
}: {
    error: Error & { digest?: string },
    reset: () => void
}) {

    useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <ErrorPage />
    );
}