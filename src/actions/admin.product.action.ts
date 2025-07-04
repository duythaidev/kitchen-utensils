'use server'
import { revalidateTag } from 'next/cache'


export const handleCreateProductAction = async (data: FormData, access_token: string) => {
    try {
        const res = await fetch(`${process.env.BACKEND_API}/products`, {
            method: "POST",
            body: data,
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
        console.error("handleCreateProductAction Error:", error);
        throw error;
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
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Server Error');
        }

        revalidateTag("list-products");
        return await res.json();
    } catch (error) {
        console.error("handleCreateProductImageAction Error:", error);
        throw error;
    }
}
