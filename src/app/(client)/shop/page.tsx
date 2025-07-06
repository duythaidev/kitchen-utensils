
import ProductList from '@/components/Shop/ProductList';
import PageHeader from '@/components/Custom/PageHeader';
import { getServerSession } from 'next-auth';

const Page = async ({ searchParams, }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const search = await searchParams
    console.log("search", search.keyword)
    console.log(`${process.env.BACKEND_API}/products?${search}`)
    const productRes = await fetch(`${process.env.BACKEND_API}/products?keyword=${search.keyword}&page=${search.page}&limit=${search.limit}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const products = await productRes.json();
    
    const categoryRes = await fetch(`${process.env.BACKEND_API}/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const categories = await categoryRes.json();
    
    // console.log("products", products)
    // console.log("categories", categories)
    return (
        <div className="">
            <PageHeader title='Explore All Products' breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Products', link: '/products' }, { name: 'Electronics', link: '/products/electronics' }]}></PageHeader>
            <ProductList categories={categories} products={products}></ProductList>
        </div >
    );
};

export default Page;