'use server'
import { revalidateTag } from 'next/cache'

export async function changeStatus(orderId: number, status: string, accessToken: string) {
    try {
        const res = await fetch(`${process.env.BACKEND_API}/orders/${orderId}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!res.ok) {
            const errorData = await res.json();
            return { success: false, message: errorData.message || 'Server error' };
        }

        revalidateTag("list-orders");
        const data = await res.json();
        return { success: true, message: "Order status updated", data };
    } catch (error: any) {
        console.error("changeStatus Error:", error);
        return { success: false, message: error.message || "Network error" };
    }
}
