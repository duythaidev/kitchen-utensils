'use server'
import { revalidateTag } from 'next/cache'

export const handleCreateUserAction = async (data: any) => {
    console.log("data", data)
    const res = await fetch(`${process.env.BACKEND_URL}/users`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    // revalidateTag("list-users")
    return await res.json()
}
