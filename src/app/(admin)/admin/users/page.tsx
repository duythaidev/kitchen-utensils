import { DataTable } from "@/components/ui/data-table";
import data from "./data.json";
import { UsersTable } from "@/components/ui/users-table";
const Page = () => {
    return (
        <div>
            <UsersTable data={data} />
        </div>
    );
}

export default Page;