'use server'
import { revalidateTag } from 'next/cache'
import { fetchWithAuth } from '@/lib/fetchWithAuth'

export const handleCreateCategoryAction = async (formData: FormData, accessToken: string) => {
  try {
    const { ok, data } = await fetchWithAuth({
      url: '/categories',
      method: 'POST',
      body: formData,
      accessToken,
      tag: 'list-categories',
      isFormData: true,
    })
    if (!ok) return { success: false, message: data.message || 'Server Error' }
    revalidateTag('list-categories')
    return { success: true, message: 'Category created successfully', data }
  } catch (error: any) {
    console.error('handleCreateCategoryAction Error:', error)
    return { success: false, message: error.message || 'Network error' }
  }
}

export const handleUpdateCategoryAction = async (id: number, formData: FormData, accessToken: string) => {
  try {
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
  } catch (error: any) {
    console.error('handleUpdateCategoryAction Error:', error)
    return { success: false, message: error.message || 'Network error' }
  }
}

export const handleDeleteCategoryAction = async (id: number, accessToken: string) => {
  try {
    const { ok, data } = await fetchWithAuth({
      url: `/categories/${id}`,
      method: 'DELETE',
      accessToken,
      tag: 'list-categories',
    })
    if (!ok) return { success: false, message: data.message || 'Delete failed' }
    revalidateTag('list-categories')
    return { success: true, message: 'Category deleted successfully', data }
  } catch (error: any) {
    console.error('handleDeleteCategoryAction Error:', error)
    return { success: false, message: error.message || 'Network error' }
  }
}

export const refreshCategoryList = async () => {
  revalidateTag('list-categories')
}
