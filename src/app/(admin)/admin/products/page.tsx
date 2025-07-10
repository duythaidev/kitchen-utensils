import { DataTable } from "@/components/shadcn/data-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
const Page = async ({ searchParams, }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;
    const { keyword, page, limit } = await searchParams;

    const res = await fetch(`${process.env.BACKEND_API}/products?keyword=${keyword || ""}&page=${page || 1}&limit=${limit || 10}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // 
        },
        cache: 'no-store', //  test

        next: { tags: ['list-products'] }
    });
    const data = await res.json()

    return (
        <div>
            <DataTable data={data.data} type="products"
                pagination={{
                    page: +data.pagination.page,
                    limit: +data.pagination.limit,
                    total: +data.pagination.total,
                }} />
        </div>
    );
}

export default Page;