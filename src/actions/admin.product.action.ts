'use server'
import { revalidateTag } from 'next/cache'

export const handleCreateProductAction = async (data: any, access_token: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API}/products`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!res.ok) {
      const errorData = await res.json()
      return { success: false, message: errorData.message || 'Server Error' }
    }

    const result = await res.json()
    revalidateTag("list-products")
    return { success: true, message: "Product created", data: result }
  } catch (error: any) {
    console.error("handleCreateProductAction Error:", error)
    return { success: false, message: error.message || "Network error" }
  }
}

export const handleCreateProductImageAction = async (data: FormData, access_token: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API}/product-images`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!res.ok) {
      const errorData = await res.json()
      return { success: false, message: errorData.message || 'Server Error' }
    }

    const result = await res.json()
    revalidateTag("list-products")
    return { success: true, message: "Image added", data: result }
  } catch (error: any) {
    console.error("handleCreateProductImageAction Error:", error)
    return { success: false, message: error.message || "Network error" }
  }
}

export const handleUpdateProductAction = async (productId: number, data: any, access_token: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API}/products/${productId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!res.ok) {
      const errorData = await res.json()
      return { success: false, message: errorData.message || 'Update failed' }
    }

    const result = await res.json()
    revalidateTag("list-products")
    return { success: true, message: "Product updated", data: result }
  } catch (error: any) {
    console.error("handleUpdateProductAction Error:", error)
    return { success: false, message: error.message || "Network error" }
  }
}

export const handleUpdateProductImageAction = async (productId: number, data: FormData, access_token: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API}/product-images/${productId}`, {
      method: "PATCH",
      body: data,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!res.ok) {
      const errorData = await res.json()
      return { success: false, message: errorData.message || 'Update failed' }
    }

    const result = await res.json()
    revalidateTag("list-products")
    return { success: true, message: "Image updated", data: result }
  } catch (error: any) {
    console.error("handleUpdateProductImageAction Error:", error)
    return { success: false, message: error.message || "Network error" }
  }
}

export const handleDeleteProductAction = async (productId: number, token: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API}/products/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!res.ok) {
      const errorData = await res.json()
      return { success: false, message: errorData.message || 'Delete failed' }
    }

    const result = await res.json()
    revalidateTag("list-products")
    return { success: true, message: "Product deleted", data: result }
  } catch (error: any) {
    console.error("handleDeleteProductAction Error:", error)
    return { success: false, message: error.message || "Network error" }
  }
}
