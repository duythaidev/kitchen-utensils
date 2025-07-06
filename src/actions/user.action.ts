'use server'

import { revalidateTag } from "next/cache";

export const handleUpdateProfileAction = async (userId: string, formData: FormData, accessToken: string) => {
    try {
        const res = await fetch(`${process.env.BACKEND_API}/users/${userId}`, {
            method: "PATCH",
            body: formData,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Update failed");
        }
        revalidateTag("profile")

        return await res.json();
    } catch (error) {
        console.error("handleUpdateProfileAction Error:", error);
        throw error;
    }
};


export async function updateProfile(id: number, data: any, accessToken: string) {
    const res = await fetch(`${process.env.BACKEND_API}/users/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Server Error');
    }
    return await res.json()
}

export async function addReview(productId: number, rating: number, comment: string, accessToken: string) {
    const res = await fetch(`${process.env.BACKEND_API}/reviews`, {
        method: "POST",
        body: JSON.stringify({ productId, rating, comment }),
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    return await res.json()
}

export async function addToCart(productId: number, quantity: number, accessToken: string) {
    console.log(productId, quantity, accessToken, 'productId, quantity, accessToken')
    try {
        const res = await fetch(`${process.env.BACKEND_API}/carts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ product_id: productId, quantity }),
        })
        // console.log(res, 'res')
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Server Error');
        }
        return await res.json()
    } catch (error) {
        console.error("addToCart Error:", error);
        throw error;
    }
}



