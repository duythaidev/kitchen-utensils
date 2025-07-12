import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    const categoriesRes = await fetch(`${process.env.BACKEND_API}/categories?limit=10`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: 'no-store', //  test

        next: { tags: ['list-categories'] }
    });
    const data = await categoriesRes.json()
    return (
        <>
            <Header categories={data.data}></Header>
            <div className='pt-[50px] md:pt-[135px] '>
                {children}
            </div>
            <Footer></Footer>
        </>
    );
}
