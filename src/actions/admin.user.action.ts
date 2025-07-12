'use server'
import { revalidateTag } from 'next/cache'

export const handleCreateUserAction = async (data: FormData, access_token: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API}/users`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!res.ok) {
      const errorData = await res.json()
      return { success: false, message: errorData.message || 'Create failed' }
    }

    const result = await res.json()
    revalidateTag("list-users")
    return { success: true, message: "User created", data: result }
  } catch (error: any) {
    console.error("handleCreateUserAction Error:", error)
    return { success: false, message: error.message || "Network error" }
  }
}

export const handleBanUserAction = async (userId: number, isActive: boolean, access_token: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API}/users/${isActive ? "ban" : "unban"}/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!res.ok) {
      const errorData = await res.json()
      return { success: false, message: errorData.message || 'Action failed' }
    }

    const result = await res.json()
    revalidateTag("list-users")
    return { success: true, message: isActive ? "User banned" : "User unbanned", data: result }
  } catch (error: any) {
    console.error("handleBanUserAction Error:", error)
    return { success: false, message: error.message || "Network error" }
  }
}

export const  handleUpdateUserAction = async (id: number, formData: FormData, access_token: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API}/users/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: formData,
    })

    if (!res.ok) {
      const errorData = await res.json()
      return { success: false, message: errorData.message || "Update failed" }
    }

    const result = await res.json()
    revalidateTag("list-users")
    return { success: true, message: "User updated", data: result }
  } catch (error: any) {
    console.error("handleUpdateUserAction Error:", error)
    return { success: false, message: error.message || "Network error" }
  }
}

export const refreshUserList = async () => {
  revalidateTag("list-users")
}
