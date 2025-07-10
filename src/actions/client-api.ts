export const fetchCategories = async () => {
    const res = await fetch(`${process.env.BACKEND_API}/categories`, {
        method: "GET",
        cache: "no-store",
    });

    if (!res.ok) {
        const errorData = await res.json();
        return { success: false, message: errorData.message || "Failed to fetch categories list" };
    }

    const data = await res.json();

    return { success: true, message: "Categories fetched successfully", data };
};
