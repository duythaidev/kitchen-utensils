import { DataTable } from "@/components/shadcn/data-table";
import products from "./data.json";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Test from "@/components/Test";
import AddUserModal from "@/components/Modals/User/AddUserModal";
const Page = async () => {
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;
    // console.log(accessToken)

    const res = await fetch(`${process.env.BACKEND_API}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // 
        },
        cache: 'no-store', //  test

        next: { tags: ['list-users'] }
    });
    const data = await res.json()
    console.log("true data ", data)

    return (
        <div>
            <DataTable data={data} type="products" />
        </div>
    );
}

export default Page;