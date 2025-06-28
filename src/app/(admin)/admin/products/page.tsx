import { DataTable } from "@/components/ui/data-table";
import data from "./data.json";
const Page = () => {
    return (
        <div>
            <DataTable data={data} />
        </div>
    );
}

export default Page;