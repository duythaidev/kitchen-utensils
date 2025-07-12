import Login from "@/components/Pages/Auth/Login";
import PageHeader from "@/components/Custom/PageHeader";
import { Metadata } from "next";
import ForgotPassword from "@/components/Pages/Auth/ForgotPassword";

export const metadata: Metadata = {
    title: 'Forgot Password - Kitchen Utensils',
    description: 'Recover your Kitchen Utensils account by resetting your password',
    robots: {
        index: true,
        follow: true,
    },
}; 

const Page = () => {

    return (
        <>
            <PageHeader title='Forgot Password' breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Forgot Password', link: '/forgot-password' }]}></PageHeader>
            <ForgotPassword></ForgotPassword>
        </>
    );
}

export default Page;