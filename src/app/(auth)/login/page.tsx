import Login from "@/components/Auth/Login";
import PageHeader from "@/components/Custom/PageHeader";

const Page = () => {

    return (
        <>
            <PageHeader title='Login' breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Login', link: '/login' }]}></PageHeader>
            <Login></Login>
        </>
    );
}

export default Page;