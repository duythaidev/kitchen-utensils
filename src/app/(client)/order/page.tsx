import { authOptions } from "@/lib/authOptions";
import PageHeader from "@/components/Custom/PageHeader";
import OrderList from "@/components/Pages/Order/OrderList";
import { getServerSession } from "next-auth";

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Orders - Kitchen Utensils',
    description: 'View and track your kitchen utensils orders',
    robots: {
        index: false,
        follow: true,
    },
}; 

const page = async () => {

    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;
    const res = await fetch(`${process.env.BACKEND_API}/orders/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // 
        },
    })

    const data = await res.json()
    console.log("true data ", data)

    return (
        <>
            <PageHeader title='Your Cart' breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Cart', link: '/cart' }]}></PageHeader>
            <OrderList orders={data} />
        </>
    );
}

export default page;