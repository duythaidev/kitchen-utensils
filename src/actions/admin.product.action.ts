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
export const handleUpdateProductAction = async (productId: number, data: any, access_token: string) => {
    try {
        const res = await fetch(`${process.env.BACKEND_API}/products/${productId}`, {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
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
        console.error("handleUpdateProductAction Error:", error);
        throw error;
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
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Server Error');
        }

        revalidateTag("list-products");
        return await res.json();
    } catch (error) {
        console.error("handleUpdateProductImageAction Error:", error);
        throw error;
    }
}


export const handleDeleteProductAction = async (productId: number, token: string) => {
    try {
        const res = await fetch(`${process.env.BACKEND_API}/products/${productId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error("Failed to delete product");
        }

        return true;
    } catch (error) {
        console.error("Error deleting product:", error);
        return false;
    }
};
