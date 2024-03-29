import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster.jsx"
import NavBar from "@/components/NavBar";
import ReduxProvider from "./reduxProvider";
import Footer from "@/components/Footer";
// import styles from './RootLayout.module.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <Providers>
            <NavBar />
            {children}
            <Footer />
          </Providers>
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
