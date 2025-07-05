
import Register from "@/components/Auth/Register";
import PageHeader from "@/components/Custom/PageHeader";

const Page = () => {
    return (
        <>
            <PageHeader title='Create an Account' breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Register', link: '/register' }]}></PageHeader>
            <Register></Register>
        </>
    );
}

export default Page;