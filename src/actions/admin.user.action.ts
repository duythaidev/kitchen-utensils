'use server'
import { revalidateTag } from 'next/cache'

export const handleCreateUserAction = async (data: FormData, access_token: string) => {
    try {
        const res = await fetch(`${process.env.BACKEND_API}/users`, {
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

        // wait 1 second for better user experience
        revalidateTag("list-users");
            return await res.json();
    } catch (error) {
        console.error("handleCreateUserAction Error:", error);
        throw error;
    }
};

export const handleBanUserAction = async (userId: string, isActive: boolean, access_token: string) => {
    try {
        // console.log("userId", userId)   
        // console.log("isActive", isActive)
        const res = await fetch(`${process.env.BACKEND_API}/users/${isActive ? "ban" : "unban"}/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
            // body: JSON.stringify({
            //     is_active: !isActive, // toggle 
            // }),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || 'Server Error');
        }

        revalidateTag("list-users");
            return await res.json();
    } catch (error) {
        console.error("handleBanUserAction Error:", error);
        throw error;
    }
};

export const handleUpdateUserAction = async (id: string, formData: FormData, access_token: string) => {
    const res = await fetch(`${process.env.BACKEND_API}/users/${id}`, {
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
    revalidateTag("list-users");
    return await res.json();
}

export const refreshUserList = async () => {
    revalidateTag("list-users")
}