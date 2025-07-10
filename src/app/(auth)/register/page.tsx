import Register from "@/components/Pages/Auth/Register";
import PageHeader from "@/components/Custom/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Register - Kitchen Utensils',
    description: 'Sign in to your Kitchen Utensils account to access your dashboard, orders, and preferences',
    robots: {
        index: true,
        follow: true,
    },
};

const Page = () => {
    return (
        <>
            <PageHeader title='Create an Account' breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Register', link: '/register' }]}></PageHeader>
            <Register></Register>
        </>
    );
}

export default Page;