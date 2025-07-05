import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import ProgressBarProvider from '@/components/ProgressBarProvider';

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <>
            {/* <ProgressBarProvider> */}
            <Header></Header>
            <div className='pt-[50px] md:pt-[135px] '>
                {children}
            </div>
            <Footer></Footer>
            {/* </ProgressBarProvider> */}
        </>
    );
}
