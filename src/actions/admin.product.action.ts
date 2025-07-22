'use server'
import { revalidateTag } from 'next/cache'
import { fetchWithAuth } from '@/lib/fetchWithAuth'

export const handleCreateProductAction = async (data: any, accessToken: string) => {
  try {
    const { ok, data: result } = await fetchWithAuth({
      url: '/products',
      method: 'POST',
      body: data,
      accessToken,
      tag: 'list-products',
    })
    if (!ok) return { success: false, message: result.message || 'Server Error' }
    revalidateTag('list-products')
    return { success: true, message: 'Product created', data: result }
  } catch (error: any) {
    console.log('handleCreateProductAction Error:', error)
    return { success: false, message: error.message || 'Network error' }
  }
}

export const handleCreateProductImageAction = async (formData: FormData, accessToken: string) => {
  try {
    const { ok, data: result } = await fetchWithAuth({
      url: '/product-images',
      method: 'POST',
      body: formData,
      accessToken,
      tag: 'list-products',
      isFormData: true,
    })
    if (!ok) return { success: false, message: result.message || 'Server Error' }
    revalidateTag('list-products')
    return { success: true, message: 'Image added', data: result }
  } catch (error: any) {
    console.log('handleCreateProductImageAction Error:', error)
    return { success: false, message: error.message || 'Network error' }
  }
}

export const handleUpdateProductAction = async (productId: number, data: any, accessToken: string) => {
  try {
    const { ok, data: result } = await fetchWithAuth({
      url: `/products/${productId}`,
      method: 'PATCH',
      body: data,
      accessToken,
      tag: 'list-products',
    })
    if (!ok) return { success: false, message: result.message || 'Update failed' }
    revalidateTag('list-products')
    return { success: true, message: 'Product updated', data: result }
  } catch (error: any) {
    console.log('handleUpdateProductAction Error:', error)
    return { success: false, message: error.message || 'Network error' }
  }
}

export const handleUpdateProductImageAction = async (productId: number, formData: FormData, accessToken: string) => {
  try {
    const { ok, data: result } = await fetchWithAuth({
      url: `/product-images/${productId}`,
      method: 'PATCH',
      body: formData,
      accessToken,
      tag: 'list-products',
      isFormData: true,
    })
    if (!ok) return { success: false, message: result.message || 'Update failed' }
    revalidateTag('list-products')
    return { success: true, message: 'Image updated', data: result }
  } catch (error: any) {
    console.log('handleUpdateProductImageAction Error:', error)
    return { success: false, message: error.message || 'Network error' }
  }
}

export const handleDeleteProductAction = async (productId: number, accessToken: string) => {
  try {
    const { ok, data: result } = await fetchWithAuth({
      url: `/products/${productId}`,
      method: 'DELETE',
      accessToken,
      tag: 'list-products',
    })
    if (!ok) return { success: false, message: result.message || 'Delete failed' }
    revalidateTag('list-products')
    return { success: true, message: 'Product deleted', data: result }
  } catch (error: any) {
    console.log('handleDeleteProductAction Error:', error)
    return { success: false, message: error.message || 'Network error' }
  }
}
