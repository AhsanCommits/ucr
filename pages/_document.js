import { Html, Head, Main, NextScript } from 'next/document';
import { Separator } from '@/components/ui/separator';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Navbar />
        <Separator />
        <Main />
        <Footer />
        <NextScript />
      </body>
    </Html>
  );
}
