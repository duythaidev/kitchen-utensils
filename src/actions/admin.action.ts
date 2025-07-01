'use server'
import { revalidatePath, revalidateTag } from 'next/cache'

export const handleCreateUserAction = async (data: FormData, access_token: string) => {
    console.log("data", data)
    const res = await fetch(`${process.env.BACKEND_API}/users`, {
        method: "POST",
        body: data,
        headers: {
            "Authorization": `Bearer ${access_token}`,
        },
    })
    revalidateTag("list-users")
    return await res.json()
}

export const refreshData = async () => {
    revalidateTag("list-users")
}
