import type {Metadata} from 'next';
import {Geist} from 'next/font/google'; // Using Geist Sans as per original scaffold
import './globals.css';
import { Toaster } from "@/components/ui/toaster"; // Added Toaster

const geistSans = Geist({ // Changed from Geist_Mono and default Geist to just Geist Sans
  variable: '--font-geist-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'] // Added typical weights
});


export const metadata: Metadata = {
  title: 'FormFlow', // Updated app name
  description: 'Modern sign-up form with AI-powered features.', // Updated description
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} font-sans antialiased`}> {/* Use font-sans which maps to --font-geist-sans */}
        {children}
        <Toaster /> {/* Added Toaster component */}
      </body>
    </html>
  );
}
