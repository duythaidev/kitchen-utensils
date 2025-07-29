import { DataTable } from "@/components/shadcn/data-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Metadata } from "next";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { redirect } from "next/navigation";
export const metadata: Metadata = {
    title: 'User Dashboard - Kitchen Utensils',
    description: 'View user dashboard',
};

const Page = async ({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/login?unauthorized=true')
    }
    const accessToken = session?.accessToken;
    const { keyword, page, limit } = await searchParams;

    const query = new URLSearchParams({
        keyword: keyword?.toString() || '',
        page: page?.toString() || '1',
        limit: limit?.toString() || '10',
    });

    const { data } = await fetchWithAuth({
        url: `/users?${query.toString()}`,
        method: 'GET',
        accessToken: accessToken as string,
        tag: 'list-users',
        cache: 'no-store',
    });

    console.log(data)


    return (
        <div>
            <DataTable data={data.data} type="users"
                pagination={{
                    page: +data.pagination.page,
                    limit: +data.pagination.limit,
                    total: +data.pagination.total,
                }} />
        </div>
    );
}

export default Page;