
import ProductList from '@/components/Shop/ProductList';
import PageHeader from '@/components/Custom/PageHeader';

const Page: React.FC = () => {
    return (
        <div className="">
            <PageHeader title='Explore All Products' breadcrumbs={[{ name: 'Home', link: '/' }, { name: 'Products', link: '/products' }, { name: 'Electronics', link: '/products/electronics' }]}></PageHeader>
            <ProductList></ProductList>
        </div >
    );
};

export default Page;