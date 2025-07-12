import { authOptions } from "@/lib/authOptions";
import PageHeader from "@/components/Custom/PageHeader";
import OrderList from "@/components/Pages/Order/OrderList";
import { getServerSession } from "next-auth";

import { Metadata } from 'next';
import { redirect } from "next/navigation";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

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
    if (!session || !session.user) {
        redirect('/login?unauthorized=true');
    }
    const accessToken = session?.accessToken;
    const { ok, data } = await fetchWithAuth({
        url: `/orders/me`,
        method: "GET",
        accessToken: accessToken as string,
        tag: "orders",
    });

    return (
        <>
            <PageHeader title='Your Cart' breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Cart', link: '/cart' }]}></PageHeader>
            <OrderList orders={data} />
        </>
    );
}

export default page;