'use server'
import { revalidateTag } from 'next/cache'
import { fetchWithAuth } from '@/lib/fetchWithAuth'

export const handleCreateProductAction = async (data: any, accessToken: string) => {
  const { ok, data: result } = await fetchWithAuth({
    url: '/products',
    method: 'POST',
    body: data,
    accessToken,
    tag: 'list-products',
  })

  if (!ok) return { success: false, message: result.message || 'Create failed' }
  revalidateTag('list-products')
  return { success: true, message: 'Product created', data: result }
}

export const handleCreateProductImageAction = async (formData: FormData, accessToken: string) => {
  const { ok, data: result } = await fetchWithAuth({
    url: '/product-images',
    method: 'POST',
    body: formData,
    accessToken,
    tag: 'list-products',
    isFormData: true,
  })

  if (!ok) return { success: false, message: result.message || 'Upload failed' }
  revalidateTag('list-products')
  return { success: true, message: 'Image added', data: result }
}

export const handleUpdateProductAction = async (productId: number, data: any, accessToken: string) => {
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
}

export const handleUpdateProductImageAction = async (productId: number, formData: FormData, accessToken: string) => {
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
}

export const handleDeleteProductAction = async (productId: number, accessToken: string) => {
  const { ok, data: result } = await fetchWithAuth({
    url: `/products/${productId}`,
    method: 'DELETE',
    accessToken,
    tag: 'list-products',
  })

  if (!ok) return { success: false, message: result.message || 'Delete failed' }
  revalidateTag('list-products')
  return { success: true, message: 'Product deleted', data: result }
}
