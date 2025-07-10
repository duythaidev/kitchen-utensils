'use server'
import { revalidateTag } from 'next/cache'


export const handleCreateCategoryAction = async (formData: FormData, access_token: string) => {
    try {   
        const res = await fetch(`${process.env.BACKEND_API}/categories`, {
            method: "POST",
            body: formData,
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Server Error');
        }

        revalidateTag("list-categories");
        return await res.json();
    } catch (error) {
        console.error("handleCreateCategoryAction Error:", error);
        throw error;
    }
}
export const handleUpdateCategoryAction = async (id: string, formData: FormData, access_token: string) => {
    const res = await fetch(`${process.env.BACKEND_API}/categories/${id}`, {
        method: "PATCH",
        body: formData,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })

    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Update failed")
    }

    revalidateTag("list-categories");
    return await res.json();
}
export const handleDeleteCategoryAction = async (id: string, access_token: string) => {
    const res = await fetch(`${process.env.BACKEND_API}/categories/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
    })
    if (!res.ok) {
        const err = await res.json()
        throw new Error(err.message || "Update failed")
    }

    // revalidateTag("list-users"); // update list users
    revalidateTag("list-categories");
    return await res.json();
}
export const refreshCategoryList = async () => {
    revalidateTag("list-categories")
}