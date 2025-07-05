import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import CartList from "@/components/Cart/CartList";
import PageHeader from "@/components/Custom/PageHeader";
import { getServerSession } from "next-auth";
const page = async () => {
    const cartItems = [
        {
            id: 1,
            name: "Product 1",
            image: "https://via.placeholder.com/150",
            price: 39.99,
            quantity: 1,
            discountedPrice: 29.99,
        },
        {
            id: 2,
            name: "Product 2",
            image: "https://via.placeholder.com/150",
            price: 49.99,
            quantity: 1,
            discountedPrice: 39.99,
        },
        // Add more items as needed
    ];

    const session = await getServerSession(authOptions);
    const accessToken = session?.accessToken;

    const res = await fetch(`${process.env.BACKEND_API}/carts`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // 
        },
        cache: 'no-store', //  test

        // next: { tags: ['list-cartitems'] }
    });
    const data = await res.json()
    // console.log("true data ", data)

    return (
        <>
            <PageHeader title='Your Cart' breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Cart', link: '/cart' }]}></PageHeader>
            <CartList cartItems={cartItems} />
        </>
    );
}

export default page;