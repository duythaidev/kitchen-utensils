'use server'
import { revalidateTag } from 'next/cache'

export const handleCreateCategoryAction = async (formData: FormData, access_token: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API}/categories`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, message: errorData.message || 'Server Error' };
    }

    const data = await res.json();
    revalidateTag('list-categories');
    return { success: true, message: 'Category created successfully', data };
  } catch (error: any) {
    console.error('handleCreateCategoryAction Error:', error);
    return { success: false, message: error.message || 'Network error' };
  }
};

export const handleUpdateCategoryAction = async (id: number, formData: FormData, access_token: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API}/categories/${id}`, {
      method: 'PATCH',
      body: formData,
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, message: errorData.message || 'Update failed' };
    }

    const data = await res.json();
    revalidateTag('list-categories');
    return { success: true, message: 'Category updated successfully', data };
  } catch (error: any) {
    console.error('handleUpdateCategoryAction Error:', error);
    return { success: false, message: error.message || 'Network error' };
  }
};

export const handleDeleteCategoryAction = async (id: number, access_token: string) => {
  try {
    const res = await fetch(`${process.env.BACKEND_API}/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, message: errorData.message || 'Delete failed' };
    }

    const data = await res.json();
    revalidateTag('list-categories');
    return { success: true, message: 'Category deleted successfully', data };
  } catch (error: any) {
    console.error('handleDeleteCategoryAction Error:', error);
    return { success: false, message: error.message || 'Network error' };
  }
};

export const refreshCategoryList = async () => {
  revalidateTag('list-categories');
};
