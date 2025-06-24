import CartList from "@/components/Cart/CartList";
import PageHeader from "@/components/Custom/PageHeader";

const page = () => {
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
    return (
        <>
            <PageHeader title='Your Cart' breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Cart', link: '/cart' }]}></PageHeader>
            <CartList cartItems={cartItems} />
        </>
    );
}

export default page;