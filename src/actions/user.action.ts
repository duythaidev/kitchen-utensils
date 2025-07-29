'use server'
import { revalidateTag } from "next/cache"
import { fetchWithAuth } from "@/lib/fetchWithAuth"

export const handleUpdateProfileAction = async (userId: string, formData: FormData, accessToken: string) => {
  const { ok, data } = await fetchWithAuth({
    url: `/users/${userId}`,
    method: "PATCH",
    body: formData,
    accessToken,
    tag: "profile",
    isFormData: true,
  })

  if (!ok) return { success: false, message: data.message || "Update failed" }
  revalidateTag("profile")
  return { success: true, message: "Profile updated", data }
}

export const handleUpdatePasswordAction = async (userData: any, accessToken: string) => {
  const { ok, data } = await fetchWithAuth({
    url: "/users/change-password",
    method: "PATCH",
    body: userData,
    accessToken,
    tag: "profile",
  })

  if (!ok) return { success: false, message: data.message || "Update failed" }
  revalidateTag("profile")
  return { success: true, message: "Password updated successfully", data }
}

export const addReview = async (productId: number, rating: number, comment: string, accessToken: string) => {
  const { ok, data } = await fetchWithAuth({
    url: "/reviews",
    method: "POST",
    body: { product_id: productId, rating, comment },
    accessToken,
    tag: "list-reviews",
  })

  if (!ok) return { success: false, message: data.message || "Submit failed" }
  revalidateTag("list-reviews")
  return { success: true, message: "Review added", data }
}

export const deleteReview = async (productId: number, accessToken: string) => {
  const { ok, data } = await fetchWithAuth({
    url: "/reviews",
    method: "DELETE",
    body: { product_id: productId },
    accessToken,
    tag: "list-reviews",
  })

  if (!ok) return { success: false, message: data.message || "Delete failed" }
  revalidateTag("list-reviews")
  return { success: true, message: "Review removed", data }
}

export const addToCart = async (productId: number, quantity: number, accessToken: string) => {
  const { ok, data } = await fetchWithAuth({
    url: "/carts",
    method: "POST",
    body: { product_id: productId, quantity },
    accessToken,
  })

  if (!ok) return { success: false, message: data.message || "Add failed" }
  return { success: true, message: "Added to cart", data }
}

export const checkout = async (address: string, accessToken: string) => {
  const { ok, data } = await fetchWithAuth({
    url: "/carts/checkout",
    method: "POST",
    body: { address },
    accessToken,
    tag: "list-cartitems",
  })

  if (!ok) return { success: false, message: data.message || "Checkout failed" }
  revalidateTag("list-cartitems")
  return { success: true, message: "Checkout successful", data }
}

export const removeProductFromCart = async (productId: number, accessToken: string) => {
  const { ok, data } = await fetchWithAuth({
    url: "/carts",
    method: "DELETE",
    body: { product_id: productId },
    accessToken,
    tag: "list-cartitems",
  })

  if (!ok) return { success: false, message: data.message || "Remove failed" }
  revalidateTag("list-cartitems")
  return { success: true, message: "Removed from cart", data }
}

export const updateCartQuantity = async (productId: number, quantity: number, accessToken: string) => {
  const { ok, data } = await fetchWithAuth({
    url: "/carts",
    method: "PUT",
    body: { product_id: productId, quantity },
    accessToken,
    tag: "list-cartitems",
  })

  if (!ok) return { success: false, message: data.message || "Update failed" }
  revalidateTag("list-cartitems")
  return { success: true, message: "Quantity updated", data }
}
