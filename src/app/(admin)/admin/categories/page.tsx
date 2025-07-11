
import { DataTable } from "@/components/shadcn/data-table";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Categories Dashboard - Kitchen Utensils',
    description: 'View categories dashboard',
};

const Page = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;
    const { keyword, page, limit } = await searchParams;

    const res = await fetch(`${process.env.BACKEND_API}/categories?keyword=${keyword || ""}&page=${page || 1}&limit=${limit || 10}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // 
        },
        cache: 'no-store', //  test

        next: { tags: ['list-categories'] }
    });
    const data = await res.json()

    return (
        <div>
            <DataTable data={data.data} type="categories"
                pagination={{
                    page: +data.pagination.page,
                    limit: +data.pagination.limit,
                    total: +data.pagination.total,
                }}
            />
        </div>
    );
}

export default Page;