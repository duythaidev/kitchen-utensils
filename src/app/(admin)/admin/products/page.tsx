import { DataTable } from "@/components/ui/data-table";
import data from "./data.json";
const Page = async () => {
    const res = await fetch(`${process.env.BACKEND_URL}/products`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
    const data = await res.json()
    // console.log("data", data)
    return (
        <div>
            <DataTable data={data} type="products" />
        </div>
    );
}

export default Page;