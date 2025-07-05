
import ProductList from '@/components/Shop/ProductList';
import PageHeader from '@/components/Custom/PageHeader';
import { getServerSession } from 'next-auth';

const Page = async ({ searchParams, }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {



    const search  = await searchParams
    console.log("search", search)
    
    const res = await fetch(`${process.env.BACKEND_API}/products?${search}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    console.log("data", data)
    return (
        <div className="">
            <PageHeader title='Explore All Products' breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Products', link: '/products' }, { name: 'Electronics', link: '/products/electronics' }]}></PageHeader>
            <ProductList products={data}></ProductList>
        </div >
    );
};

export default Page;