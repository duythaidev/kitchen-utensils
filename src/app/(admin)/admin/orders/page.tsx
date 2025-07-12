import { DataTable } from "@/components/shadcn/data-table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { Metadata } from "next";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export const metadata: Metadata = {
    title: 'Orders Dashboard - Kitchen Utensils',
    description: 'View orders dashboard',
};

const Page = async ({ searchParams, }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {


  const session = await getServerSession(authOptions);
  const accessToken = session?.accessToken;

  const { data } = await fetchWithAuth({
    url: `/orders`,
    method: 'GET',
    accessToken: accessToken as string,
    tag: 'list-orders',
    cache: 'no-store',
  });

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