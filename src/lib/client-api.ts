// lib/api.ts (client-side)
export const fetchUserList = async (accessToken: string) => {
    const res = await fetch(`${process.env.BACKEND_API}/users`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch user list");
    }

    return await res.json(); // hoặc set lại vào state nếu bạn dùng useState
};
