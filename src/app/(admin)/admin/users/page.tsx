import { DataTable } from "@/components/ui/data-table";
import users from "./data.json";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
const Page = async () => {
    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;
    // console.log(accessToken)
    
    const res = await fetch(`${process.env.BACKEND_API}/users`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // 
        },
        cache: 'no-store', //  test

        next: { tags: ['list-users'] }
    });
    const data = await res.json()
    console.log("list-users", data)

    return (
        <div>
            <DataTable data={[...data]} type="users" />
        </div>
    );
}

export default Page;