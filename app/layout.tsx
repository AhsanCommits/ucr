import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Separator } from '@/components/ui/separator';

import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'UCR.gg',
  description: 'Unified Carrier Registration (UCR)',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <Separator />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
