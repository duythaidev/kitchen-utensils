'use server'
import { revalidateTag } from "next/cache"
import { fetchWithAuth } from "@/lib/fetchWithAuth"

// Tạo user
export const handleCreateUserAction = async (formData: FormData, accessToken: string) => {
  const { ok, data } = await fetchWithAuth({
    url: "/users",
    method: "POST",
    body: formData,
    accessToken,
    tag: "list-users",
    isFormData: true,
  })

  if (!ok) return { success: false, message: data.message || "Create failed" }
  revalidateTag("list-users")
  return { success: true, message: "User created", data }
}

// Ban / Unban user
export const handleBanUserAction = async (userId: number, isActive: boolean, accessToken: string) => {
  const { ok, data } = await fetchWithAuth({
    url: `/users/${isActive ? "ban" : "unban"}/${userId}`,
    method: "POST",
    accessToken,
    tag: "list-users",
  })

  if (!ok) return { success: false, message: data.message || "Action failed" }
  revalidateTag("list-users")
  return { success: true, message: isActive ? "User banned" : "User unbanned", data }
}

// Cập nhật user
export const handleUpdateUserAction = async (id: number, formData: FormData, accessToken: string) => {
  const { ok, data } = await fetchWithAuth({
    url: `/users/${id}`,
    method: "PATCH",
    body: formData,
    accessToken,
    tag: "list-users",
    isFormData: true,
  })

  if (!ok) return { success: false, message: data.message || "Update failed" }
  revalidateTag("list-users")
  return { success: true, message: "User updated", data }
}

// Force revalidate
export const refreshUserList = async () => {
  revalidateTag("list-users")
}
