import Footer from '@/components/Footer';
import './globals.css'
import Header from '@/components/Header';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19';
import NextAuthWrapper from '@/components/NextAuthWrapper';

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <NextAuthWrapper>
      <html lang="en">
        <body
          className={``}
        >
          <AntdRegistry>
            <Header></Header>
            <div className='pt-[135px]'>
              {children}
            </div>
            <Footer></Footer>
          </AntdRegistry>
        </body>
      </html>
    </NextAuthWrapper>
  );
}
