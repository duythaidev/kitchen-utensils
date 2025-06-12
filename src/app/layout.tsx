import Footer from '@/components/Footer';
import './globals.css'
import Header from '@/components/Header';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <AntdRegistry>
          <Header></Header>
          {children}
          <Footer></Footer>
        </AntdRegistry>
      </body>
    </html>
  );
}
