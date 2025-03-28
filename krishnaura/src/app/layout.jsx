import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster.jsx"
import NavBar from "@/components/NavBar";
import ReduxProvider from "./reduxProvider";
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Krishn Aura",
  description: "Lord Krishna attires and jwellery",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en" className="bg-[#f5ede0]">
        <body className={inter.className}>
          <ReduxProvider>
            <Providers>
              <NavBar />
              {children}
            </Providers>
          </ReduxProvider>
          <Toaster />
        </body>
      </html>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

    </>
  );
}
