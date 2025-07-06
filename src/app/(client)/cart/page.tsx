import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CartList from "@/components/Cart/CartList";
import PageHeader from "@/components/Custom/PageHeader";
import { getServerSession } from "next-auth";
const page = async () => {

    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;
    const resprofile = await fetch(`${process.env.BACKEND_API}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // 
        },
    })
    const profile = await resprofile.json()
    console.log("profile", profile)
    const res = await fetch(`${process.env.BACKEND_API}/carts/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // 
        },
        cache: 'no-store', //  test

        next: { tags: ['list-cartitems'] }
    });
    
    const data = await res.json()

    // console.log("true data ", data)

    return (
        <>
            <PageHeader title='Your Cart' breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Cart', link: '/cart' }]}></PageHeader>
            <CartList cartItems={data} profile={profile} />
        </>
    );
}

export default page;