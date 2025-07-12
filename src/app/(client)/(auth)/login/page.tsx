import Login from "@/components/Pages/Auth/Login";
import PageHeader from "@/components/Custom/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Login - Kitchen Utensils',
    description: 'Sign in to your Kitchen Utensils account to access your dashboard, orders, and preferences',
    robots: {
        index: true,
        follow: true,
    },
}; 

const Page = () => {

    return (
        <>
            <PageHeader title='Login' breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Login', link: '/login' }]}></PageHeader>
            <Login></Login>
        </>
    );
}

export default Page;