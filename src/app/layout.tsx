import './globals.css'
import NextAuthWrapper from '@/components/NextAuthWrapper';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'sonner';

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body
        className={``}
      >
        <NextAuthWrapper>
          <NextTopLoader showSpinner={false} height={2} />
          {children}
          <Toaster />
        </NextAuthWrapper>
      </body>
    </html>
  );
}
