import Footer from '@/components/Footer';
import './globals.css'
import Header from '@/components/Header';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import '@ant-design/v5-patch-for-react-19';
import NextAuthWrapper from '@/components/NextAuthWrapper';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <NextAuthWrapper>
          <AntdRegistry>
            {children}
          </AntdRegistry>
          <ToastContainer />

        </NextAuthWrapper>
      </body>
    </html>
  );
}
