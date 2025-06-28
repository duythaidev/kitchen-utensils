import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            <Header></Header>
            <div className='pt-[135px]'>
                {children}
            </div>
            <Footer></Footer>
        </>
    );
}
