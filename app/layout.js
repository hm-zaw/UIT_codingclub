import { Montserrat } from "next/font/google";
import "./globals.css";
import Head from "./head";
import Logout from "@/components/Logout";
import Image from "next/image";
import Button from "@/components/Button";

const montserrat = Montserrat({ subsets: ["latin"], weight: ['400']})

export const metadata = {
  title: "UIT Coding Club",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="flex items-center justify-between gap-4 p-4 sm:p-8">
      <div className="flex items-center gap-3"> 
        <Image src={'/uit_logo.png'} width={70} height={70} alt={'uit_logo'}/>
        <h1 className={`text-lg sm:text-xl md:text-2xl text-gradient-dark-bg-4`}>UIT Coding Club</h1>
      </div>
      <Button text={"Login"} dark />
    </header>
  )
  const footer = (
    <footer className="p-4 sm:p-8">
      <p className={`text-center mx-auto text-white`}> Created by HMZ</p>
    </footer>
  )

  return (
    <html lang="en">
      <Head />
      <body className={`${montserrat.className} antialiased text-slate-800 w-full max-w-[1500px] mx-auto my-auto text-sm sm:text-base min-h-screen flex flex-col justify-center`}>
        {header}
        {children} 
        {footer}
      </body>
    </html>
  );
}
