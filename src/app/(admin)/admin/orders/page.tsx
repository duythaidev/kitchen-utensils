import { DataTable } from "@/components/shadcn/data-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
const Page = async ({ searchParams, }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;
    // console.log(accessToken)

    const res = await fetch(`${process.env.BACKEND_API}/orders`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // 
        },
        cache: 'no-store', //  test

        next: { tags: ['list-orders'] }
    });
    const data = await res.json()
    // console.log("true data ", data)

    return (
        <div>
            <DataTable data={data.data} type="orders"
                pagination={{
                    page: +data.pagination.page,
                    limit: +data.pagination.limit,
                    total: +data.pagination.total,
                }} />
        </div>
    );
}

export default Page;