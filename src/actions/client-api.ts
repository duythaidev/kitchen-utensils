export const fetchCategories = async (accessToken: string) => {
    const res = await fetch(`${process.env.BACKEND_API}/categories`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch categories list");
    }

    return await res.json(); // hoặc set lại vào state nếu bạn dùng useState
};
