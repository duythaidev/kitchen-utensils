import { authOptions } from "@/lib/authOptions";
import CartList from "@/components/Pages/Cart/CartList";
import PageHeader from "@/components/Custom/PageHeader";
import { getServerSession } from "next-auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { fetchWithAuth } from "@/lib/fetchWithAuth";
import { string } from "zod";

export const metadata: Metadata = {
    title: 'Shopping Cart - Kitchen Utensils',
    description: 'Review and manage your selected kitchen utensils before checkout',
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
  // Lấy profile
  const { ok: okProfile, data: profileData } = await fetchWithAuth({
    url: '/users/me',
    method: 'GET',
    accessToken: accessToken as string,
  });


  // Lấy cart
  const { ok: okCart, data: cartData } = await fetchWithAuth({
    url: '/carts/me',
    method: 'GET',
    accessToken: accessToken as string  ,
    tag: 'list-cartitems',
    cache: 'no-store',
  });



    return (
        <>
            <PageHeader title='Your Cart' breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Cart', link: '/cart' }]}></PageHeader>
            <CartList cartItems={cartData} profile={profileData} />
        </>
    );
}

export default page;