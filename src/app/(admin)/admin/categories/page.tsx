
import { DataTable } from "@/components/shadcn/data-table";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
const Page = async () => {
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;
    // console.log(accessToken)

    const res = await fetch(`${process.env.BACKEND_API}/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // 
        },
        cache: 'no-store', //  test

        next: { tags: ['list-categories'] }
    });
    const data = await res.json()
    console.log("true data ", data)

    return (
        <div>
            <DataTable data={data.data} type="categories" />
        </div>
    );
}

export default Page;