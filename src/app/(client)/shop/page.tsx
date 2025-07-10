
import ProductList from '@/components/Pages/Shop/ProductList';
import PageHeader from '@/components/Custom/PageHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Shop - Kitchen Utensils',
    description: 'Browse our extensive collection of high-quality kitchen utensils, cookware, and accessories',
    robots: {
        index: true,
        follow: true,
    },
}; 
const Page = async ({ searchParams, }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {

    const search = await searchParams
    const { keyword, sort, priceSort, priceFrom, priceTo, categoryId, page, limit } = search

    
    const productRes = await fetch(`${process.env.BACKEND_API}/products?keyword=${keyword || ""}&sort=${sort || ""}&priceSort=${priceSort || ""}&priceFrom=${priceFrom || ""}&priceTo=${priceTo || ""}&categoryId=${categoryId || ""}&page=${page || 1}&limit=${limit || 6}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log("productRes", productRes)
    const products = await productRes.json();

    const categoryRes = await fetch(`${process.env.BACKEND_API}/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const categories = await categoryRes.json();

    console.log("products", products)
    console.log("categories", categories)

    // const category = categories.find((category: ICategory) => category.id == search.category)

    const breadcrumbs = [
        { name: 'Home', link: '/' },
        { name: 'Shop', link: '/shop' },
    ]
    return (
        <div className="">
            <PageHeader title='Explore All Products' breadcrumbs={breadcrumbs}></PageHeader>
            <ProductList categories={categories.data} products={products.data} pagination={products.pagination} ></ProductList>
        </div >
    );
};

export default Page;