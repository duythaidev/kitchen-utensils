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
            return { success: false, message: errorData.message || "Update failed" };
        }

        revalidateTag("profile");
        const data = await res.json();
        return { success: true, message: "Profile updated", data };
    } catch (error: any) {
        console.error("handleUpdateProfileAction Error:", error);
        return { success: false, message: error.message || "Network error" };
    }
};


export async function addReview(productId: number, rating: number, comment: string, accessToken: string) {
    try {
        const res = await fetch(`${process.env.BACKEND_API}/reviews`, {
            method: "POST",
            body: JSON.stringify({ productId, rating, comment }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { success: false, message: errorData.message || 'Server error' };
        }

        revalidateTag("list-reviews");
        const data = await res.json();
        return { success: true, message: "Review added", data };
    } catch (error: any) {
        console.error("addReview Error:", error);
        return { success: false, message: error.message || "Network error" };
    }
}

export async function addToCart(productId: number, quantity: number, accessToken: string) {
    try {
        const res = await fetch(`${process.env.BACKEND_API}/carts`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ product_id: productId, quantity }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { success: false, message: errorData.message || 'Server error' };
        }

        const data = await res.json();
        return { success: true, message: "Added to cart", data };
    } catch (error: any) {
        console.error("addToCart Error:", error);
        return { success: false, message: error.message || "Network error" };
    }
}

export async function checkout(address: string, accessToken: string) {
    try {
        const res = await fetch(`${process.env.BACKEND_API}/carts/checkout`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ address }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { success: false, message: errorData.message || 'Checkout failed' };
        }

        revalidateTag("list-cartitems");
        const data = await res.json();
        return { success: true, message: "Checkout successful", data };
    } catch (error: any) {
        console.error("checkout Error:", error);
        return { success: false, message: error.message || "Network error" };
    }
}

export async function removeProductFromCart(productId: number, accessToken: string) {
    try {
        const res = await fetch(`${process.env.BACKEND_API}/carts`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ product_id: productId }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { success: false, message: errorData.message || 'Remove failed' };
        }

        revalidateTag("list-cartitems");
        const data = await res.json();
        return { success: true, message: "Removed from cart", data };
    } catch (error: any) {
        console.error("removeProductFromCart Error:", error);
        return { success: false, message: error.message || "Network error" };
    }
}

export async function updateCartQuantity(productId: number, quantity: number, accessToken: string) {
    try {
        const res = await fetch(`${process.env.BACKEND_API}/carts`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify({ product_id: productId, quantity }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { success: false, message: errorData.message || 'Update failed' };
        }

        revalidateTag("list-cartitems");
        const data = await res.json();
        return { success: true, message: "Quantity updated", data };
    } catch (error: any) {
        console.error("updateCartQuantity Error:", error);
        return { success: false, message: error.message || "Network error" };
    }
}
