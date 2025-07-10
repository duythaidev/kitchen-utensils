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
        return { success: false, message: errorData.message || "Failed to fetch categories list" };
    }

    const data = await res.json();

    return { success: true, message: "Categories fetched successfully", data };
};
