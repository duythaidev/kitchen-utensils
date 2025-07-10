'use client'
import ErrorPage from "@/components/ErrorPage"

 // Error boundaries must be Client Components
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <ErrorPage />
      </body>
    </html>
  )
}