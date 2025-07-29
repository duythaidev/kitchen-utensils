'use server'
import { revalidateTag } from 'next/cache'
import { fetchWithAuth } from '@/lib/fetchWithAuth'

export const handleCreateCategoryAction = async (formData: FormData, accessToken: string) => {
  const { ok, data } = await fetchWithAuth({
    url: '/categories',
    method: 'POST',
    body: formData,
    accessToken,
    tag: 'list-categories',
    isFormData: true,
  })

  if (!ok) return { success: false, message: data.message || 'Create failed' }
  revalidateTag('list-categories')
  return { success: true, message: 'Category created successfully', data }
}

export const handleUpdateCategoryAction = async (id: number, formData: FormData, accessToken: string) => {
  const { ok, data } = await fetchWithAuth({
    url: `/categories/${id}`,
    method: 'PATCH',
    body: formData,
    accessToken,
    tag: 'list-categories',
    isFormData: true,
  })

  if (!ok) return { success: false, message: data.message || 'Update failed' }
  revalidateTag('list-categories')
  return { success: true, message: 'Category updated successfully', data }
}

export const handleDeleteCategoryAction = async (id: number, accessToken: string) => {
  const { ok, data } = await fetchWithAuth({
    url: `/categories/${id}`,
    method: 'DELETE',
    accessToken,
    tag: 'list-categories',
  })

  if (!ok) return { success: false, message: data.message || 'Delete failed' }
  revalidateTag('list-categories')
  return { success: true, message: 'Category deleted successfully', data }
}

export const refreshCategoryList = async () => {
  revalidateTag('list-categories')
}
