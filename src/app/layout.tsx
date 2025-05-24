import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import MobileViewport from '@/components/layout/MobileViewport';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600'] // Weights specified in PRD
});

export const metadata: Metadata = {
  title: 'PopX',
  description: 'Welcome to PopX.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={`font-inter antialiased bg-popx-bg`}>
        <MobileViewport>
          {children}
        </MobileViewport>
        <Toaster />
      </body>
    </html>
  );
}
