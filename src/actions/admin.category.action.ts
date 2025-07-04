'use server'
import { revalidateTag } from 'next/cache'


export const handleCreateCategoryAction = async (categoryName: string, access_token: string) => {
    try {
        const res = await fetch(`${process.env.BACKEND_API}/categories`, {
            method: "POST",
            body: JSON.stringify({ category_name: categoryName }),
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Server Error');
        }

        revalidateTag("list-products");
        return await res.json();
    } catch (error) {
        console.error("handleCreateCategoryAction Error:", error);
        throw error;
    }
}
export const handleUpdateCategoryAction = async (id: string, formData: FormData, access_token: string) => {
    const res = await fetch(`${process.env.BACKEND_API}/categories/${id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        body: formData,
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